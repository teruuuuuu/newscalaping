package com.teruuu.api

import javax.inject.{Inject, Singleton}

import com.teruuu.api.dtc.ScalapDtc
import com.teruuu.config.DbConfig
import com.teruuu.logic.crawler.ScalapEntity
import com.teruuu.logic.crawler.CrawlService
import play.api.libs.json.Json
import play.api.mvc.{AbstractController, AnyContent, ControllerComponents, Request}
import scalikejdbc.DB

@Singleton
class ApiController @Inject()(cc: ControllerComponents) extends AbstractController(cc) with ScalapDtc with DbConfig {
  // 監視対象(top)ページ
  def tops = Action { implicit request: Request[AnyContent] => {
    DB readOnly {implicit session =>
      Ok(Json.toJson(CrawlService.allTops.sortBy(-_.create_date.getTime)))
    }
  }}

  def top(id: Int) = Action { implicit request: Request[AnyContent] => {
    DB readOnly { implicit session =>
      Ok(Json.toJson(CrawlService.allTops))
    }
  }}

  def addTop = Action { implicit request: Request[AnyContent] => {
    try
      AddTopForm.bindFromRequest.fold(
        errors => {
          BadRequest("request param not correct")
        },
        validForm => {
          val newTop = ScalapEntity(validForm.url, validForm.title, validForm.description)
          newTop.crawlTop
          Ok(Json.toJson(newTop.data))
        }
      )

  }}

  def deleteTop(id: Int) = Action { implicit request: Request[AnyContent] => {
    DB readOnly { implicit session =>
      CrawlService.selectTopById(id)
    } match {
      case Some(x) =>
        val entity = ScalapEntity(x)
        entity.delete
        Ok(Json.toJson(entity.data))
      case _ =>
        Ok(Json.toJson(-1))
    }
  }}

  // 監視対象ページのリンク情報
  def links = Action { implicit request: Request[AnyContent] => {
    Ok(Json.toJson(
      DB readOnly { implicit session =>
        CrawlService.topLinks.sortBy(-_.add_date.getTime)
      }))
  }}
}
