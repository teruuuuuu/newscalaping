package com.teruuu.logic.crawler

import java.io.IOException
import java.sql.Timestamp
import java.time.LocalDateTime

import com.teruuu.config.{ApplicationConfig, DbConfig}
import com.teruuu.infla.db.{ScalapTop, TopLink}
import com.teruuu.util.Slack
import org.jsoup.{Connection, Jsoup}
import scalikejdbc.{DB, DBSession, GlobalSettings}

import scala.collection.JavaConversions._


// ドメインオブジェクト
object ScalapEntity {
  def apply(id: Int, url: String, title: String, description: String, create_date: Timestamp) = {
    new ScalapEntity(
      ScalapTop(id, url, Option(title), Option(description), create_date))
  }
  def apply(url: String, title: String, description: String) = {
    new ScalapEntity(
      ScalapTop(0, url, Option(title), Option(description), Timestamp.valueOf(LocalDateTime.now())))
  }
  def apply(scalapTop: ScalapTop) = new ScalapEntity(scalapTop)
}

class ScalapEntity(scalapTop: ScalapTop)  extends DbConfig {
  def data = scalapTop
  // TOPページとTopページのリンク情報を取得しDBに保存する
  def crawlTop = {
    getJsoupDoc(scalapTop.url) match {
      case Right(x) => {
        // topページのID取得
        val topId = scalapTop.id match {
          case 0 => DB localTx { implicit session => CrawlService.addTops(scalapTop).toInt }
          case x => x
        }

        val savedLinks = DB readOnly { implicit session =>
          CrawlService.findLinkByTopId(topId)
        }
        val (newLinks, deleteLinks) = currentLinkInfo(savedLinks)
        DB localTx { implicit session =>
          val monthAgo = Timestamp.valueOf(LocalDateTime.now.minusMonths(1))
          newLinks.foreach(link => CrawlService.insertTopLink(link))
          deleteLinks.filter(_.add_date.getTime <= monthAgo.getTime).foreach{ link =>
            deleteTopLink(link)
          }
        }

        // クロール後通知
        if(newLinks.length >= 1)
          Slack.call(ApplicationConfig.slack_token, ApplicationConfig.slack_channel, newLinks.map(link => link.url).mkString("\n"))
      }
      case Left(x) => println("crawl stop invalid top url :" + scalapTop.url)
    }
  }

  def crawlLinkText(d: LocalDateTime) = {
    val unSearchLinks = DB readOnly {implicit session =>
      CrawlService.searchUnReachedLinkByTimeByTopId(scalapTop.id, d)
    }

    unSearchLinks match {
      case (head :: tail) =>
        getJsoupDoc(head.url) match {
          case Right((doc, text, statusMessage)) => DB localTx { implicit session =>
            CrawlService.addLinkText(head.id, text, 0, statusMessage)}
          case Left(errorMessage) => DB localTx { implicit session =>
            CrawlService.addLinkText(head.id, "", 1, errorMessage)}
        }
      case _ =>
    }
  }

  def delete = {
    DB localTx {implicit session =>
      CrawlService.findLinkByTopId(scalapTop.id).foreach(deleteTopLink)
      CrawlService.deleteTops(scalapTop)
    }
  }

  private def deleteTopLink(link: TopLink)(implicit session: DBSession) = {
    CrawlService.deleteLinkTextByLinkId(link.id)
    CrawlService.deleteTopLink(link.id)
  }


  // 現在のリンクの情報を取得する
  private def currentLinkInfo(savedLinks: List[TopLink]):(List[TopLink], List[TopLink]) = {
    val savedUrls = savedLinks.map(_.url)
    val now = Timestamp.valueOf(LocalDateTime.now())

    getJsoupDoc(scalapTop.url) match {
      case Right((doc, text, statusMessage)) =>
        val links = doc.get.select("a[href]")

        val currentLinks = links.toIterable.map { link =>
          TopLink(0, scalapTop.id, link.attr("abs:href").trim, Option(link.text.trim), now)
        }

        val newLinks = currentLinks.foldLeft(List.empty[TopLink]) { (acc, v) =>
          v match {
            case v if savedUrls.contains(v.url) || acc.map(_.url).contains(v.url) => acc
            case v => acc :+ v
          }
        }

        val deletedLinks = savedLinks.filter(savedLink =>
          currentLinks.find { currentLink => currentLink.url.equals(savedLink.url) } match {
            case Some(x) => false
            case None => true
          }
        )
        (newLinks, deletedLinks)
      case Left(x) =>
        (List(), List())
    }

  }

  private def getJsoupDoc(url: String):Either[String, (Connection, String, String)] = {
    try {
      val doc = Jsoup.connect(url).ignoreHttpErrors(true)
      Right(doc, doc.get.text, doc.response.statusMessage())
    } catch {
      case e => Left(e.getMessage)
      case _ => Left("エラー発生")
    }
  }
}
