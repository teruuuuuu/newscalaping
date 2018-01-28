package com.teruuu.scheduler.crawler

import java.time.LocalDateTime

import akka.actor.{Actor, ActorLogging, Props}

class CrawlExecutor extends Actor with ActorLogging{
  import CrawlExecutor._

  val receiveActor = context.actorOf(CrawlRunner.props, "taskRunner")

  def receive = {
    case Initialize =>
      log.info("starting MessagingActor")
    case "crawlTopLink" =>
      receiveActor !  CrawlTopMessage("start crawl")
    case "crawlLinkText" =>
      receiveActor !  CrawlTextMessage(d)
  }
}

object CrawlExecutor {
  // 開始日時
  val d:LocalDateTime = LocalDateTime.now
  val props = Props[CrawlExecutor]
  case object Initialize
  case class CrawlTopMessage(text: String)
  case class CrawlTextMessage(d: LocalDateTime)
}