import * as types from '../../store/define'
import * as f from './request-function'

export function  get_top_info() {
  const response_action = function(data: any){
    return {type: types.INIT_TOPINFO_LIST, data: data}
  }
  const data = {}
  return f.createRequestData( process.env.REQUEST_URL.TOP_INFO, 'JSON', 'GET',  data,  response_action);
}

export function  add_top_info(url: string, title: string, description: string) {
  const response_action = function(data: any){
    return {type: types.CALL_API, data: data, remote: get_top_info()}
  }
  const data = {url: url, title: title, description: description}
  return f.createRequestData( process.env.REQUEST_URL.TOP_INFO, 'JSON', 'POST',  data,  response_action);
}

export function  delete_top_info(id: number) {
  const response_action = function(data: any){
    return {type: types.CALL_API, data: data, remote: get_top_info()}
  }
  const data = {}
  return f.createRequestData( process.env.REQUEST_URL.TOP_INFO + "/" + id, 'JSON', 'DELETE',  data,  response_action);
}