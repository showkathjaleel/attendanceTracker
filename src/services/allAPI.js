import { commonAPI } from "./commonAPi"
import SERVER_URL from "./serverUrl"



// login api

export const registerAPI = async (user)=>{
 return await commonAPI("POST",`${SERVER_URL}/register`,user,"")
}

export const logoutAPI = async (user)=>{
    return await commonAPI("POST",`${SERVER_URL}/logout`,user,"")
   }

   export const loginAPI = async (data)=>{
    return await commonAPI("POST",`${SERVER_URL}/login`,data,"")
   }