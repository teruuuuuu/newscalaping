package com.teruuu.api.dtc

import com.teruuu.infla.db.ScalapTop
import play.api.data.Form
import play.api.data.Forms._
import play.api.data.Forms.mapping
import play.api.libs.json.{Json, Writes}

trait ScalapDtc {

  // Jsonのレスポンスを返すための暗黙の型変換
  implicit val todoWrite = new Writes[ScalapTop] {
    def writes(scalapTop: ScalapTop) =
      Json.obj(
        "id" -> scalapTop.id,
        "url" -> scalapTop.url,
        "title" -> scalapTop.title,
        "description" -> scalapTop.description,
        "create_date" -> scalapTop.create_date.toString
      )
  }

  case class AddTop(url: String, title:String, description:String)
  implicit val AddTopForm:Form[AddTop] = Form (
    mapping(
      "url" -> text,
      "title" -> text,
      "description"-> text
    )(AddTop.apply)(AddTop.unapply)
  )

}
