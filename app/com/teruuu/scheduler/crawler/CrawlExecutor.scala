package com.teruuu.scheduler.crawler

import akka.actor.{Actor, ActorLogging, Props}

class CrawlExecutor extends Actor with ActorLogging{
  import CrawlExecutor._

  val receiveActor = context.actorOf(CrawlRunner.props, "taskRunner")

  def receive = {
    case Initialize =>
      log.info("starting MessagingActor")
    case "crawling" =>
      receiveActor !  SendMessage("start crawl")
  }
}

object CrawlExecutor {
  val props = Props[CrawlExecutor]
  case object Initialize
  case class SendMessage(text: String)
}