package com.teruuu.config

import com.google.inject.AbstractModule
import com.teruuu.scheduler.ScheduleSetting
import play.api.{Configuration, Environment}

class ModuleConfig(environment: Environment,  configuration: Configuration) extends AbstractModule {

  def configure() = {
    bind(classOf[ScheduleSetting]).asEagerSingleton()
  }
}

