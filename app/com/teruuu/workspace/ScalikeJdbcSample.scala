package com.teruuu.workspace

import java.time.LocalDateTime

import com.teruuu.config.ApplicationConfig
import com.teruuu.logic.crawler.CrawlService
import scalikejdbc.{ConnectionPool, ConnectionPoolSettings}

object ScalikeJdbcSample {
  def loadJDBCSettings(): Unit ={

    val settings = ConnectionPoolSettings(
      initialSize = 5,
      maxSize = 20,
      connectionTimeoutMillis = 3000L,
      validationQuery = "select 1")

    ConnectionPool.singleton(ApplicationConfig.db_url, ApplicationConfig.db_user, ApplicationConfig.db_password, settings)
  }
  loadJDBCSettings()


  def main(args: Array[String]) = {
//    val d = LocalDateTime.now.withHour(12)
//    println(CrawlService.allTops)
//    println(CrawlService.searchLink(d))

    println(CrawlService.showLinkTexts)
  }
}
