package com.teruuu.workspace

import java.io.IOException

import org.jsoup.Jsoup

object CrawlingSample {

  def main(args: Array[String]): Unit ={
    // val doc = Jsoup.connect("https://gigazine.net/news/20180128-in-a-galaxy-far-far-away/").get
    // println(doc.body.text)

//    val url = "http://japanese.engadget.com/tag/apple pay".replace(" ", "%20")

    val url = "http://japanese.engadget.com/tag/apple pay"
    showLinkInfo(url)
    showLinkInfo(url.replace(" ", "%20"))
  }

  private def showLinkInfo(url: String): Unit = {
    val doc = Jsoup.connect(url).ignoreHttpErrors(true)
    try {
      println(doc.get.body.text)
      println(doc.response.statusMessage())

    } catch {
      case e: IOException
      =>
        println("fail")
        println(e.getMessage)
    }
  }
}
