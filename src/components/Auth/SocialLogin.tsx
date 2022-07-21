import React from 'react'
import { useDispatch } from 'react-redux'
import { GoogleLoginResponse, GoogleLogin } from 'react-google-login-lite';
import { facebookLogin, googlelogin } from '../../redux/action/authAction';
import { FacebookLogin, FacebookLoginAuthResponse } from 'react-facebook-login-lite';
const SocialLogin = () => {
   const dispatch = useDispatch();
   // Google
   const onSuccess = (googleUser: GoogleLoginResponse) => {
      const id_token = googleUser.getAuthResponse().id_token;
      dispatch(googlelogin(id_token));
   }

   // Facebook
   const onFbSuccess = (response: FacebookLoginAuthResponse) => {
      const { accessToken, userID } = response.authResponse
      dispatch(facebookLogin(accessToken, userID));
   }

   return (
      <div className='my-2'>
         <GoogleLogin
            client_id='700427633806-ut7c8e5d2377r9q9o1ev5eu3kak37fhs.apps.googleusercontent.com'
            cookiepolicy='single_host_origin'
            onSuccess={onSuccess}
         />
         <FacebookLogin
            appId="549602096794210"
            onSuccess={onFbSuccess}
         />
      </div>
   )
}

export default SocialLogin