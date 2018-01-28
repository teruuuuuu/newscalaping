package com.teruuu.logic.crawler

import java.time.{LocalDate, LocalDateTime}

import com.teruuu.infla.db.{ScalapTop, TopLink}

// ドメインオブジェクトを利用して結果を返すインターフェース
object CrawlInterface {
  def main(args: Array[String]): Unit ={
    init
    // run
  }

  def run = CrawlService.allTops.map(new ScalapEntity(_)).foreach(_.trace)

  def init = {
    CrawlService.allTops.map(new ScalapEntity(_)).foreach(_.runInit)
  }

  def addTop(url: String, title: String, description: String): Long = {
    ScalapEntity(url, title, description).addTop
  }

  def deleteTop(id: Int) = {
    ScalapEntity(CrawlService.allTops.find(_.id.equals(id)).get).deleteTop
  }

  def showTopInfo(): List[ScalapTop] = {
    CrawlService.allTops
  }

  def selectTopById(id: Int): Option[ScalapTop] = {
    CrawlService.selectTopById(id)
  }

  def topLinks(): List[TopLink] = {
    CrawlService.links
  }
  def crawlText(d: LocalDateTime) = {
    val links = CrawlService.searchLink(d)
    CrawlService.addLinkText(Option(links.head))

  }
}
