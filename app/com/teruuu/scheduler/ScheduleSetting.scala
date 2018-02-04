package com.teruuu.scheduler

import akka.actor.ActorSystem
import com.teruuu.config.DbConfig
import com.teruuu.scheduler.crawler.CrawlExecutor
import com.typesafe.akka.extension.quartz.QuartzSchedulerExtension

// This creates an `ApplicationStart` object once at start-up and registers hook for shut-down.
object ScheduleSetting extends DbConfig {
  // CrawlInterface.init
  val _system = ActorSystem("system")

  // スケジューラを生成
  val crawlLinkSchedule = QuartzSchedulerExtension(_system)
  val messagingActor = _system.actorOf(CrawlExecutor.props, "CrawlSchedule")
  crawlLinkSchedule.schedule(
    "CrawlTopLink",
    messagingActor,
    "crawlTopLink"
  )

  val crawTextSchedule = QuartzSchedulerExtension(_system)
  crawTextSchedule.schedule(
    "CrawlLinkText",
    messagingActor,
    "crawlLinkText"
  )

  def main(args: Array[String]): Unit = {
    println("schedler start")
  }
}
