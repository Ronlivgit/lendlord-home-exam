import axios from "axios"
import { baseUri } from "../config/api"

export function camelLetters(word){
    const returnWord = `${word.charAt(0).toUpperCase() + word.slice(1)}`
    return returnWord
}

export async function fetchByUserId(userId){
    const response = await axios.get(`${baseUri}/user/${userId}`)
    if(response.status === 200){
        return response.data
    }
    else{
        return console.error("Error fetching userId" , response);
    }
}

export async function postCreateUser(payload){
    try {
        console.log('payload : ' , payload)
        const response = await axios.post(`${baseUri}/newUser`,payload)
        console.log('response : ' , response)
        return response.data
    } catch (error) {
        console.error(error);
    }
}

export async function removeUser(userId) {
    try {
        console.log("userId : " , userId)
        const response = await axios.delete(`${baseUri}/deleteUser/${userId}`)
        return response
    } catch (error) {
        console.error(error);
    }
}