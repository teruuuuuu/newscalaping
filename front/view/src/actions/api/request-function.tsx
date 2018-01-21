import {CALL_API} from '../../store/define'

export function callApi(remote: any) {
    return { type: CALL_API, remote:remote}
  }
  
export function createRequestData(url: string, dataType: string, type: string, data: any, response_action: any){
    return { url: url,
             dataType:dataType,
             type:type,
             data:  data,
             response_action: response_action,
             contentType: 'application/x-www-form-urlencoded; charset=UTF-8' }
}
