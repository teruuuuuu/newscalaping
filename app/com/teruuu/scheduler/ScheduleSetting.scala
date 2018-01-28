package com.teruuu.scheduler

import java.time.LocalDateTime
import javax.inject._

import akka.actor.ActorSystem
import com.teruuu.logic.crawler.CrawlInterface
import com.teruuu.scheduler.crawler.CrawlExecutor
import com.typesafe.akka.extension.quartz.QuartzSchedulerExtension
import play.api.inject.ApplicationLifecycle

import scala.concurrent.Future

// This creates an `ApplicationStart` object once at start-up and registers hook for shut-down.
@Singleton
class ScheduleSetting @Inject() (lifecycle: ApplicationLifecycle) {
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

  // Shut-down hook
  lifecycle.addStopHook { () => {
    Future.successful(())
  }}

}
