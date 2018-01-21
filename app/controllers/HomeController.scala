package controllers

import javax.inject._

import com.teruuu.infla.db.ScalapTop
import com.teruuu.logic.crawler.CrawlInterface
import play.api.libs.json.{Json, Writes}
import play.api.mvc._
import scalikejdbc.DB

/**
 * This controller creates an `Action` to handle HTTP requests to the
 * application's home page.
 */
@Singleton
class HomeController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {

  /**
   * Create an Action to render an HTML page.
   *
   * The configuration in the `routes` file means that this method
   * will be called when the application receives a `GET` request with
   * a path of `/`.
   */
  def index() = Action { implicit request: Request[AnyContent] => {
    CrawlInterface.showTopInfo.foreach(println)
    Ok(views.html.index())
  }}

  // Jsonのレスポンスを返すための暗黙の型変換
  // AddTodoのcase classをJson形式に変換するときはこれが使われる
  implicit val todoWrite = new Writes[ScalapTop] {
    def writes(scalapTop: ScalapTop) =
      Json.obj(
        "id" -> scalapTop.id,
        "url" -> scalapTop.url,
        "title" -> scalapTop.title,
        "description" -> scalapTop.description,
        "create_date" -> scalapTop.create_date
      )
  }

  def tops = Action { implicit request: Request[AnyContent] => {
    Ok(Json.toJson(CrawlInterface.showTopInfo))
  }}
}
