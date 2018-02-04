package com.teruuu.logic.crawler

import java.sql.Timestamp
import java.time.LocalDateTime

import com.teruuu.infla.db.{LinkText, ScalapTop, TopLink}
import scalikejdbc.{DB, DBSession}

// トランザクションの管理や外部サービスの呼び出し
object CrawlService {

  /////////// Topページ関連サービス
  def allTops(implicit session: DBSession):List[ScalapTop] = ScalapTop.all

  def selectTopById(id: Int)(implicit session:DBSession):Option[ScalapTop] = ScalapTop.selectById(id)

  def addTops(scalapTop: ScalapTop)(implicit session:DBSession): Long =
    ScalapTop.insertScalapTop(scalapTop.url, scalapTop.title.get, scalapTop.description.get, scalapTop.create_date).toInt

  def deleteTops(scalapTop: ScalapTop)(implicit session:DBSession) = ScalapTop.deleteById(scalapTop.id)

  /////////// Top Link関連サービス
  def topLinks(implicit session: DBSession): List[TopLink] = TopLink.topLinks
  def findLinkByTopId(top_id: Int)(implicit session: DBSession) = TopLink.selectByTopId(top_id)

  // テキスト情報を取得していないリンクを取得する
  def searchUnReachedLinkByTime(d: LocalDateTime)(implicit session: DBSession) = TopLink.selectNotTextSearch(d)
  def searchUnReachedLinkByTimeByTopId(topId: Int, d: LocalDateTime)(implicit session: DBSession) = TopLink.selectNotTextSearchById(topId, d)

  def insertTopLink(link: TopLink)(implicit session: DBSession) =
    TopLink.insertTopLink(link.top_id, link.url, link.text.getOrElse(""), Timestamp.valueOf(LocalDateTime.now()))

  def deleteTopLink(topLinkId: Int)(implicit session: DBSession) =
    TopLink.deleteById(topLinkId)

  /////////// LinkText関連サービス
  def addLinkText(linkId: Int, text: String, result: Int, result_status: String)(implicit session:DBSession) =
    LinkText.insertLinkText(linkId, text, result, result_status, Timestamp.valueOf(LocalDateTime.now()))

  def deleteLinkTextByLinkId(linkId: Int)(implicit session:DBSession) = {
    LinkText.deleteByLinkId(linkId)
  }

  def showLinkTexts(implicit session:DBSession): List[LinkText] = LinkText.selectAll

}
