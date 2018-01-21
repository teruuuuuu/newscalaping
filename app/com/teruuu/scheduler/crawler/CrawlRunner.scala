package com.teruuu.scheduler.crawler

import akka.actor.{Actor, ActorLogging, Props}
import com.teruuu.logic.crawler.CrawlInterface

class CrawlRunner extends Actor with ActorLogging{
  def receive = {
    case CrawlExecutor.SendMessage(txt: String) =>
      CrawlInterface.run //クロール開始
  }
}

object CrawlRunner {
  val props = Props[CrawlRunner]
}