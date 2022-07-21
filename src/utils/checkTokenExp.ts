import { AUTH } from './../redux/types/authType';
import jwtDecode from "jwt-decode";
import axios from "axios";
import { getApi } from './FetchData'
interface IToken {
   exp: number
   iat: number
   id: string
}

export const checkTokenExp = async(token: string, dispatch: any) => {
   const decoded: IToken = jwtDecode(token);

   if(decoded.exp >= Date.now()/1000) return;

   const res = await getApi('refresh_token')
   dispatch({type: AUTH, payload: res.data})
   return res.data.access_token;
}