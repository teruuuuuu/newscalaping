import { combineReducers } from 'redux'
import sampleReducer from './sample-reducer'
import userListReducer from './userlist-reducer'
import topinfoListReducer from './topinfolist-reducer'
import topLinksReducer from './topLinks-reducer'


const rootReducer = combineReducers({
  sampleReducer
  , userListReducer
  , topinfoListReducer
  , topLinksReducer
})
export default rootReducer

