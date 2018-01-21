name := """newscalaping"""
organization := "com.teruuu"

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayScala)

scalaVersion := "2.12.4"

libraryDependencies ++= Seq(
  guice,
  filters,
  "org.scalatestplus.play" %% "scalatestplus-play" % "3.1.2" % Test,
  "com.typesafe.akka" %% "akka-actor" % "2.5.8",
  "com.typesafe.akka" %% "akka-testkit" % "2.5.8" % Test,
  "com.enragedginger" %% "akka-quartz-scheduler" % "1.6.1-akka-2.5.x",
  "org.jsoup" % "jsoup" % "1.7.2",
  "org.postgresql" % "postgresql" % "9.4-1201-jdbc4",
  "org.scalikejdbc" %% "scalikejdbc"       % "3.1.0",
  "org.scalikejdbc" %% "scalikejdbc-interpolation" % "3.1.0",
  "org.scalikejdbc" %% "scalikejdbc-config"        % "3.1.0",
  "org.scalikejdbc" %% "scalikejdbc-play-initializer" % "2.6.0-scalikejdbc-3.1",
  "org.scalikejdbc" %% "scalikejdbc-syntax-support-macro" % "3.1.0",
  "ch.qos.logback"  %  "logback-classic"           % "1.2.3",
  "org.apache.httpcomponents" % "httpclient" % "4.5.4"
)


// Adds additional packages into Twirl
//TwirlKeys.templateImports += "com.teruuu.controllers._"

// Adds additional packages into conf/routes
// play.sbt.routes.RoutesKeys.routesImport += "com.teruuu.binders._"
