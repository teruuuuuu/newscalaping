package com.teruuu.util

import java.util.ArrayList

import org.apache.http.NameValuePair
import org.apache.http.client.entity.UrlEncodedFormEntity
import org.apache.http.client.methods.HttpPost
import org.apache.http.impl.client.DefaultHttpClient
import org.apache.http.message.BasicNameValuePair

object Slack {

  def call(token: String, channel: String, text: String) = {
    val url = "https://slack.com/api/chat.postMessage"
    val post = new HttpPost(url)
    val client = new DefaultHttpClient
    val params = client.getParams

    val nameValuePairs = new ArrayList[NameValuePair](1)
    nameValuePairs.add(new BasicNameValuePair("token", token))
    nameValuePairs.add(new BasicNameValuePair("channel", channel))
    nameValuePairs.add(new BasicNameValuePair("text", text))
    nameValuePairs.add(new BasicNameValuePair("username", "bot"))
    post.setEntity(new UrlEncodedFormEntity(nameValuePairs))

    // send the post request
    val response = client.execute(post)
    response.getAllHeaders.foreach(arg => println(arg))
  }
}
