import { useUserLoginStore } from '@/services/userLogin.api';
import React, { ReactNode, useEffect } from 'react'

export default function GetUserContext({children}:{children:ReactNode}) {

     const {GetUserLogin,user}= useUserLoginStore();
    
     /* user authentication verification */
      useEffect(() => {
        try {
          if(!user)
            GetUserLogin();
        } catch (error) {
          console.log(error)
        }
      }, []);
      
  return (
    <>
        {children}
    </>
  )
}
