package com.teruuu.config

import scalikejdbc.{ConnectionPool, ConnectionPoolSettings}

trait DbConfig {
  def loadJDBCSettings(): Unit ={
    val settings = ConnectionPoolSettings(
      initialSize = 5,
      maxSize = 20,
      connectionTimeoutMillis = 3000L,
      validationQuery = "select 1")

    ConnectionPool.singleton(ApplicationConfig.db_url, ApplicationConfig.db_user, ApplicationConfig.db_password, settings)
  }
  loadJDBCSettings()

}
