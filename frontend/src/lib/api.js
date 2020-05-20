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
  return axios.get(`${baseUrl}/profile/${userId}`)
}

export const getUserGroups = () => {
return axios.get(`/api/groups`, withHeaders())
}


export const getGroup = groupId => {
  console.log(groupId)
  return axios.get(`${baseUrl}/groups/${groupId}`)
}