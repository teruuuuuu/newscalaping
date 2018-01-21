package com.teruuu.config

import com.google.inject.Inject
import play.api.http.HttpFilters
import play.filters.cors.CORSFilter

class CorsConfig @Inject() (corsFilter: CORSFilter) extends HttpFilters {
  def filters = Seq(corsFilter)
}