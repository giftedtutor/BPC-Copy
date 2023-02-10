// ** Redux Imports
import { combineReducers } from 'redux'

// ** Reducers Imports
import auth from './auth'
import upvc from './forms/upvcCalculations/index'
import upvcCalculatedReducer from './formulas'
import navbar from './navbar'
import layout from './layout'
import chat from '@src/views/apps/chat/store/reducer'
import todo from '@src/views/apps/todo/store/reducer'
import email from '@src/views/apps/email/store/reducer'
import invoice from '@src/views/apps/invoice/store/reducer'
import calendar from '@src/views/apps/calendar/store/reducer'
import ecommerce from '@src/views/apps/ecommerce/store/reducer'
import dataTables from '@src/views/tables/data-tables/store/reducer'
// import { onChange } from '../../views/apps/upvc-section/quotation-input/redux/actions'
import CoastingChangeReducer from './CoastingCHange'
const rootReducer = combineReducers({
  auth,
  todo,
  chat,
  email,
  navbar,
  layout,
  invoice,
  calendar,
  ecommerce,
  dataTables,
  // onChange,
  upvc,
  CoastingChangeReducer,
  upvcCalculatedReducer
  // onSubmitForm
})

export default rootReducer
