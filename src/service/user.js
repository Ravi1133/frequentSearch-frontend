import axios from "axios"
import { baseurl } from "../config"

export async function saveUser(data) {
    try {
        let payload={
            method:"post",
            url:`${baseurl}/api/v1/user/createUser`,
            data
        }
      let responseData= await  axios(payload)
      return responseData
    } catch (error) {
            console.log("error in saveUser",error)
    }
}


export async function getAllUser(data) {
    try {
        let payload={
            method:"post",
            url:`${baseurl}/api/v1/user/getAllUser`
        }
      let responseData= await  axios(payload)
      return responseData
    } catch (error) {
        console.log("error in saveUser",error)
        return error.response
    }
}
