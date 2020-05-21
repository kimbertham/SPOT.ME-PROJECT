import axios from 'axios'
import { getToken } from './auth'

const baseUrl = '/api'

export const withHeaders = () => {
  return {
    headers: { Authorization: `Bearer ${getToken()}` }
  }
}



export const getUserGroups = () => {
  return axios.get('/api/groups', withHeaders())
}
export const getGroup = groupId => {
  console.log(groupId)
  return axios.get(`${baseUrl}/groups/${groupId}`)
}

// PROFILE FUNCTIONS 

export const getProfile = userId => {
  return axios.get(`${baseUrl}/profile/${userId}`)
}

export const postContent = (content, userId) => {
  return axios.post(`${baseUrl}/profile/${userId}/post`, content, withHeaders())
}


export const getLike = (userId, postId) => {
  return axios.put(`/api/profile/${userId}/post/${postId}`,'' , withHeaders() )
} 

export const commentADelete = (userId, postId,commentId ) => {
  return axios.delete(`/api/profile/${userId}/post/${postId}/comment/${commentId}`, withHeaders())
}

export const deleteAPost = (userId, postId)=>{
  return axios.delete(`/api/profile/${userId}/post/${postId}`, withHeaders())
}

export const followAUser = (userId) => {
  const res = axios.put(`/api/profile/${userId}/follow`,'' ,withHeaders())
  console.log(res)
}

export const postAComment = (postOwner,postId, content) => {
  return axios.put(`/api/profile/${postOwner}/post/${postId}/comment`,
    content , withHeaders() )
}

