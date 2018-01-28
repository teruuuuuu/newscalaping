package com.teruuu.scheduler.crawler

import java.time.LocalDateTime

import akka.actor.{Actor, ActorLogging, Props}
import com.teruuu.logic.crawler.CrawlInterface

class CrawlRunner extends Actor with ActorLogging{
  def receive = {
    case CrawlExecutor.CrawlTopMessage(txt: String) =>
      CrawlInterface.run //クロール開始
    case CrawlExecutor.CrawlTextMessage(d: LocalDateTime) =>
      println("crawl link text start" + d.toString)
      CrawlInterface.crawlText(d)

  }
}

object CrawlRunner {
  val props = Props[CrawlRunner]
}