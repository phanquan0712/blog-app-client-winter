import { CREATE_COMMENT,
         GET_COMMENTS, REPLY_COMMENT, 
         UPDATE_COMMENT, ICommentType, 
         UPDATE_REPLY, ICommentState ,
         DELETE_COMMENT, DELETE_REPLY 
} from "../types/commentType";

const initState: ICommentState = {
   data: [],
   total: 1,
}

const commentReducer = (state: ICommentState = initState, action: ICommentType) => {
   switch (action.type) {
      case CREATE_COMMENT:
         return {
            ...state,
            data: [action.payload, ...state.data],
         }
      case GET_COMMENTS:
         return action.payload;
      case REPLY_COMMENT:
         return {
            ...state,
            data: state.data.map(item => (
               item._id === action.payload.comment_root
                  ? {
                     ...item,
                     replyCM: [
                        ...item.replyCM,
                        action.payload
                     ]
                  }
                  : item
            ))
         }
      case UPDATE_COMMENT:
         return {
            ...state,
            data: state.data.map(item => (
               item._id === action.payload._id 
               ?
               action.payload
               :
               item
            ))
         }
      case UPDATE_REPLY:
         return {
            ...state,
            data: state.data.map(item => (
               item._id === action.payload.comment_root ?
               {
                  ...item,
                  replyCM: item.replyCM?.map(reply => (
                     reply._id === action.payload._id ?
                     action.payload
                     :
                     reply
                  ))
               }
               :
               item
            ))
         }
      case DELETE_COMMENT:
            return {
               ...state,
               data: state.data.filter(item => (
                  item._id !== action.payload._id
               ))
            }
      case DELETE_REPLY:
         return {
            ...state,
            data: state.data.map(item => (
               item._id === action.payload.comment_root ?
               {
                  ...item,
                  replyCM: item.replyCM?.filter(reply => (
                     reply._id !== action.payload._id
                  ))
               }
               :
               item
            ))
         }
      default:
         return state;
   }
}

export default commentReducer;