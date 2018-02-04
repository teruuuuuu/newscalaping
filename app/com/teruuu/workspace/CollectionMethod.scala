package com.teruuu.workspace

object CollectionMethod {

  def main(args: Array[String]): Unit = {

    showListHead(List())
    showListHead(List(1))
    showListHead(List(1, 2))
  }

  private def showListHead(l: List[_]) = {
    l match {
      case (head :: tail) =>
        println(head)
      case _ =>
        println("empty")
    }
  }
}
