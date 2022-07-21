import { GET_OTHER_INFO, IGetOtherInfo } from "../types/profileType";
import { IUser } from "../../utils/TypeScript";


const otherInfoReducer = (state: IUser[] = [], action: IGetOtherInfo): IUser[] => {
   switch(action.type) {
      case GET_OTHER_INFO:
         if(state.every(item => item._id !== action.payload._id)) {
            return [...state, action.payload]
         } else {
            return state.find(item => item._id ===  action.payload._id) ? state : [...state, action.payload]
         }
      default:
         return state;
   }
}

export default otherInfoReducer;