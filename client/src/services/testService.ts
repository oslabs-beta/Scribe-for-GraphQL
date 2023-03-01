import axios from "axios"
import { API_URL } from "../utils/constants"

export const generateTypeTest = async (userInput:string) => {
  console.log('make post request to /typetest')
  // console.log(API_URL + 'typeTest')
  const { data } = await axios.post(API_URL + 'typeTest', userInput,{withCredentials:true});
  return data;
}