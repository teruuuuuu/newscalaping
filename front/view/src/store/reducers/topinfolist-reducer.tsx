import { INIT_TOPINFO_LIST } from '../define';
import {TopInfo} from '../../model/topinfo'

const INITIAL_STATE = {
    topinfo_list :[new TopInfo(0, 'url','tile', 'description', 'time')]
  };

export default function topinfoListReducer(state = INITIAL_STATE, action: {type: string, data: any}) {
  switch (action.type) {
    case INIT_TOPINFO_LIST:
      const newtop: Array<TopInfo> = [];
      action.data.map((topinfo: any, i: number) =>
        newtop.push(new TopInfo(topinfo.id, topinfo.url, topinfo.title, topinfo.description, topinfo.create_date))
      )
      return (Object as any).assign({}, state, { topinfo_list: newtop})

    default:
      return state
  }
}
