import { AUTH, IAuthType, IAuth  } from "../types/authType";

const authReducer = (state: IAuth = {}, action: IAuthType) => { 
   switch (action.type) {
      case AUTH: 
         return action.payload;
      default : 
         return state;
   }
}

export default authReducer;