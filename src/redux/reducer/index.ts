import { combineReducers } from "redux";
import auth from "./authReducer";
import alert from "./alertReducer";
import category from "./categoryReducer";
import homeBLogs from "./blogReducer";
import blogCategory from './blogCategoryReducer'
import otherInfo from './otherInfoReducer'
import blogUser from './blogUserReducer'
import comments from './commentReducer'
import socket from './socketReducer'
export default combineReducers({
   auth,
   alert,
   category,
   homeBLogs,
   blogCategory,
   otherInfo,
   blogUser,
   comments,
   socket
})