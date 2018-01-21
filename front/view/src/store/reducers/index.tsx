import { combineReducers } from 'redux'
import sampleReducer from './sample-reducer'
import userListReducer from './userlist-reducer'
import topinfoListReducer from './topinfolist-reducer'


const rootReducer = combineReducers({
  sampleReducer
  , userListReducer
  , topinfoListReducer
})
export default rootReducer

