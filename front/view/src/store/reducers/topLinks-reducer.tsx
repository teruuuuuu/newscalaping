import { INIT_TOPLINKS_LIST } from '../define';
import {TopLinks} from '../../model/topLinks'

interface ReducerState {
  topLinks: Array<TopLinks>
}
const INITIAL_LINK_STATE:ReducerState = { topLinks : [new TopLinks(0, 0, 'url','text', 'time')]};

export default function topLinksReducer(state:ReducerState = INITIAL_LINK_STATE, action: {type: string, data: any}) {
  switch (action.type) {
    case INIT_TOPLINKS_LIST:
      const newtopLinks: Array<TopLinks> = [];
      action.data.map((topLink: any, i: number) =>
          newtopLinks.push(new TopLinks(topLink.id, topLink.top_id, topLink.url, topLink.text, topLink.add_date))
      )
      // return (Object as any).assign({}, state, { topLinks: newtopLinks})
      return {topLinks: newtopLinks}

    default:
      return state
  }
}