import { IUserRegister } from "./TypeScript";
import { IBlog } from "./TypeScript";


export const ValidRegister = ({ name, account, password, cf_password }: IUserRegister) => {
   const errors: string[] = [];
   if (!name) {
      errors.push('Please add your name!')
   }
   else if (name.length > 20) {
      errors.push('Name must be less than 20 characters!')
   }
   // check account
   if (!account) {
      errors.push('Please add your account!')
   }
   else if (!validEmail(account) && !validPhone(account)) {
      errors.push('Email or phone number format is incorrect!')
   }
   // check password
   if (password.length < 6) {
      errors.push('Password must be at least 6 characters!')
   }
   else if(password !== cf_password) {
      errors.push('Password and confirm password must be the same!')
   }


   return {
      errMsg: errors,
      errLength: errors.length
   }
}

export const checkPassword = (password: string, cf_password: string) => {
   let err = ''
   if(password.length < 6) err = 'Password must be at least 6 characters!'
   else if(password !== cf_password) err = 'Password and confirm password must be the same!'
   return err
}

export function validPhone(phone: string) {
   const re = /^[+]/g;
   return re.test(phone);
}

export function validEmail(email: string) {
   const regex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
   return regex.test(email);
}


// Valid Blog

export const validCreateBlog = ({ title, content, description, thumbnail, category }: IBlog) => {
   let err: string[] = [];

   if(title.trim().length < 10) err.push('Title has at least 10 characters.');
   else if(title.trim().length > 50) err.push('Title is up to 50 character long.')

   if(content.trim().length < 2000) err.push('Content has at least 2000 characters.');

   if(description.trim().length < 50) err.push('Description has at least 50 characters.');
   else if(description.trim().length > 200) err.push('Description is up to 200 character long.')

   if(!thumbnail) err.push('Thumbnail cannot be left blank.');
   
   if(!category) err.push('Category cannot be left blank.')


   return {
      errMsg: err,
      errLength: err.length
   }
}


// Shallow Equality
export const shallowEquality = (obj1: IBlog, obj2: IBlog) => {
   if(JSON.stringify(obj1) === JSON.stringify(obj2)) return true
   return false
}