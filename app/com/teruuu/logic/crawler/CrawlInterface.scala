package com.teruuu.logic.crawler

import com.teruuu.infla.db.ScalapTop

// ドメインオブジェクトを利用して結果を返すインターフェース
object CrawlInterface {
  def main(args: Array[String]): Unit ={
    run
  }

  def run = CrawlService.allTops.map(new ScalapEntity(_)).foreach(_.trace)

  def init = {
    CrawlService.allTops.map(new ScalapEntity(_)).foreach(_.runInit)
  }

  def addTop(url: String, title: String, description: String): Long = {
    val scalap = ScalapEntity(url, title, description)
    scalap.addTop
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
}
