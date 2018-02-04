package com.teruuu.config

import com.google.inject.AbstractModule
import com.teruuu.scheduler.ScheduleSetting
import play.api.{Configuration, Environment}
import scalikejdbc.{ConnectionPool, ConnectionPoolSettings}

class ModuleConfig(environment: Environment,  configuration: Configuration) extends AbstractModule {
  def loadJDBCSettings(): Unit ={
    val settings = ConnectionPoolSettings(
      initialSize = 5,
      maxSize = 20,
      connectionTimeoutMillis = 3000L,
      validationQuery = "select 1")

    ConnectionPool.singleton(ApplicationConfig.db_url, ApplicationConfig.db_user, ApplicationConfig.db_password, settings)
  }
  loadJDBCSettings()

  def configure() = {
    // bind(classOf[ScheduleSetting]).asEagerSingleton()
  }
}

