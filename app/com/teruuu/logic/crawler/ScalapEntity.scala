package com.teruuu.logic.crawler

import java.sql.Timestamp
import java.time.LocalDateTime

import com.teruuu.config.ApplicationConfig
import com.teruuu.infla.db.ScalapTop
import com.teruuu.util.Slack
import scalikejdbc.GlobalSettings

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

class ScalapEntity(scalapTop: ScalapTop) {
  // プロセス起動時初期化処理
  def runInit = {
    val link = CrawlService.linkInfo(scalapTop)
    val newLinks = link._1
    val deletedLinks = link._2
    CrawlService.topLinkInsertDelete(scalapTop.id, newLinks, deletedLinks)
  }

  // 監視対象の追加
  def addTop: Long = {
    val links = CrawlService.linkInfo(scalapTop)
    CrawlService.addTops(scalapTop, links._1)
  }

  def deleteTop = {
    CrawlService.deleteTops(scalapTop)
  }

  // クロール
  def trace = {
    val link = CrawlService.linkInfo(scalapTop)
    val newLinks = link._1
    val deletedLinks = link._2
    CrawlService.topLinkInsertDelete(scalapTop.id, newLinks, deletedLinks)

    GlobalSettings.loggingConnections
    // クロール後通知
    if(newLinks.length >= 1){
      Slack.call(ApplicationConfig.slack_token, ApplicationConfig.slack_channel, newLinks.map(link => link.url).mkString("\n"))
    }
  }
}
