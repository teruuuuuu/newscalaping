import * as types from '../../store/define'
import * as f from './request-function'

export function  user_list_init() {
  const response_action = function(data: any){
    return {type: types.INIT_USER_LIST, data: data}
  }
  const data = {}
  return f.createRequestData( process.env.REQUEST_URL.USER_LIST_INIT, 'JSON', 'GET',  data,  response_action);
}
