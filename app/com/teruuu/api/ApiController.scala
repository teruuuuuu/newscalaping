package com.teruuu.api

import javax.inject.{Inject, Singleton}

import com.teruuu.api.dtc.ScalapDtc
import com.teruuu.infla.db.ScalapTop
import com.teruuu.logic.crawler.CrawlInterface
import play.api.libs.json.{Json, Writes}
import play.api.mvc.{AbstractController, AnyContent, ControllerComponents, Request}

@Singleton
class ApiController @Inject()(cc: ControllerComponents) extends AbstractController(cc) with ScalapDtc {

  def tops = Action { implicit request: Request[AnyContent] => {
    Ok(Json.toJson(CrawlInterface.showTopInfo))
  }}

  def top(id: Int) = Action { implicit request: Request[AnyContent] => {
    Ok(Json.toJson(CrawlInterface.showTopInfo))
  }}

  def addTop = Action { implicit request: Request[AnyContent] => {
    try
      AddTopForm.bindFromRequest.fold(
        errors => {
          BadRequest("request param not correct")
        },
        validForm => {
          val id = CrawlInterface.addTop(validForm.url, validForm.title, validForm.description)
          val res: List[ScalapTop] = List(CrawlInterface.selectTopById(id.toInt).get)
          Ok(Json.toJson(res))
        }
      )

  }}

  def deleteTop(id: Int) = Action { implicit request: Request[AnyContent] => {
    CrawlInterface.deleteTop(id)
    Ok(Json.toJson(CrawlInterface.showTopInfo))
  }}
}
