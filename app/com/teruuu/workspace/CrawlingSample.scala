package com.teruuu.workspace

import org.jsoup.Jsoup

object CrawlingSample {

  def main(args: Array[String]): Unit ={
    println("hello")
    val doc = Jsoup.connect("https://gigazine.net/news/20180128-in-a-galaxy-far-far-away/").get
    println(doc.body.text)
  }
}
