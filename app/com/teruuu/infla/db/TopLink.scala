package com.teruuu.infla.db

import java.sql.Timestamp
import java.time.LocalDateTime

import scalikejdbc.{AutoSession, DBSession, ResultName, SQL, SQLSyntaxSupport, WrappedResultSet, delete, insert, select, withSQL}

case class TopLink(id: Int, top_id: Int, url: String, text: Option[String], add_date: Timestamp)

object TopLink extends SQLSyntaxSupport[TopLink] {
  override val tableName = "top_link"
  val tl = TopLink.syntax("tl")
  val tc = TopLink.column

  def apply(rs: WrappedResultSet): TopLink =
    TopLink(rs.int("id"), rs.int("top_id"), rs.string("url"), rs.stringOpt("text"), rs.timestamp("add_date"))

  def apply(t: ResultName[TopLink])(rs: WrappedResultSet): TopLink =
    TopLink(rs.int(t.id), rs.int(t.top_id), rs.string(t.url), rs.stringOpt(t.text), rs.timestamp(t.add_date))


  def insertTopLink(top_id: Int, url: String, text:String, add_date: Timestamp)(implicit session: DBSession = AutoSession): Long =
    withSQL {
      insert.into(TopLink).namedValues(tc.top_id -> top_id, tc.url -> url,
        tc.text -> text, tc.add_date -> add_date)
    }.updateAndReturnGeneratedKey.apply()

  def deleteById(id: Int)(implicit session: DBSession = AutoSession) =
    withSQL {
      delete.from(TopLink).where.eq(tc.id, id)
    }.update.apply()

  def deleteByTopId(top_id: Int)(implicit session: DBSession = AutoSession) =
    withSQL {
      delete.from(TopLink).where.eq(tc.top_id, top_id)
    }.update.apply()


  def topLinks(implicit session: DBSession = AutoSession):List[TopLink] =
    withSQL {
      select(tl.id, tl.top_id, tl.url, tl.text, tl.add_date).
        from(TopLink as tl).
        orderBy(tl.id).desc.
        limit(1000).
        offset(0)
    }.map(TopLink(_)).list.apply()

  def selectByTopId(top_id: Int)(implicit session: DBSession = AutoSession):List[TopLink] =
    withSQL {
      select(tl.id, tl.top_id, tl.url, tl.text, tl.add_date).
        from(TopLink as tl).
        where.eq(tl.top_id, top_id).
        orderBy(tl.id)
    }.map(TopLink(_)).list.apply()

  def selectNotTextSearch(date: LocalDateTime)(implicit session: DBSession = AutoSession):List[TopLink] = {
    SQL("""
          select id, top_id, url, text, add_date
          from top_link
          where
            id not in (select link_id from link_text)
            and add_date > ?""")
      .bind(date)
      .map(TopLink(_)).list.apply()
  }

}
