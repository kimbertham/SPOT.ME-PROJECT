import axios from 'axios'
import { getToken } from './auth'

const baseUrl = '/api'

export const withHeaders = () => {
  return {
    headers: { Authorization: `Bearer ${getToken()}` }
  }
}

export const postContent = (content, userId) => {
  return axios.post(`${baseUrl}/profile/${userId}/post`, content, withHeaders())
}

export const getProfile = userId => {
  console.log(userId)
  return axios.get(`${baseUrl}/profile/${userId}`)
}

export const getUserGroups = () => {
return axios.get(`/api/groups`, withHeaders())
}