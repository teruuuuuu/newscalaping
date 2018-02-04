package com.teruuu.scheduler.crawler

import java.time.LocalDateTime

import akka.actor.{Actor, ActorLogging, Props}
import com.teruuu.logic.crawler.{CrawlService, ScalapEntity}
import scalikejdbc.DB

class CrawlRunner extends Actor with ActorLogging{
  def receive = {

    case CrawlExecutor.CrawlTopMessage(txt: String) =>
      // //クロール開始
      println("crawl top start" + LocalDateTime.now.toString)
      tops.foreach(ScalapEntity(_).crawlTop)
    case CrawlExecutor.CrawlTextMessage(d: LocalDateTime) =>
      println("crawl link text start" + LocalDateTime.now.toString)
      tops.foreach(ScalapEntity(_).crawlLinkText(d))
  }

  def tops =  DB readOnly {implicit session =>
    CrawlService.allTops
  }
}

object CrawlRunner {
  val props = Props[CrawlRunner]
}