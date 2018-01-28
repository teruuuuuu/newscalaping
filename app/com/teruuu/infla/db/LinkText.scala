package com.teruuu.infla.db

import java.sql.Timestamp

import scalikejdbc.{AutoSession, DBSession, delete, ResultName, SQLSyntaxSupport, WrappedResultSet, insert, select, withSQL}

case class LinkText(id: Int, link_id: Int, text: String, add_date: Timestamp)

object LinkText extends SQLSyntaxSupport[LinkText] {
  override val tableName = "link_text"
  val lt = LinkText.syntax("lt")
  val lc = LinkText.column

  def apply(rs: WrappedResultSet): LinkText =
    LinkText(rs.int("id"), rs.int("link_id"), rs.string("text"), rs.timestamp("add_date"))

  def apply(t: ResultName[LinkText])(rs: WrappedResultSet): LinkText =
    LinkText(rs.int(t.id), rs.int(t.link_id), rs.string(t.text), rs.timestamp(t.add_date))


  def insertLinkText(link_id: Int, text:String, add_date: Timestamp)(implicit session: DBSession = AutoSession): Long =
    withSQL {
      insert.into(LinkText).namedValues(lc.link_id -> link_id, lc.text -> text, lc.add_date -> add_date)
    }.updateAndReturnGeneratedKey.apply()

  def deleteById(id: Int)(implicit session: DBSession = AutoSession) =
    withSQL {
      delete.from(LinkText).where.eq(lc.id, id)
    }.update.apply()

  def deleteByLinkId(link_id: Int)(implicit session: DBSession = AutoSession) =
    withSQL {
      delete.from(LinkText).where.eq(lc.link_id, link_id)
    }.update.apply()

  def selectAll(implicit session: DBSession = AutoSession):List[LinkText] =
    withSQL {
      select(lt.id, lt.link_id, lt.text, lt.add_date).
        from(LinkText as lt)
    }.map(LinkText(_)).list.apply()

  def selectByLinkId(link_id: Int)(implicit session: DBSession = AutoSession):List[LinkText] =
    withSQL {
      select(lt.id, lt.link_id, lt.text, lt.add_date).
        from(LinkText as lt).
        where.eq(lt.link_id, link_id)
    }.map(LinkText(_)).list.apply()
}
