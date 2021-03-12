import axios from 'axios'
import { getToken, getUserId } from './auth'


const baseUrl = '/api'

export const withHeaders = () => {
  return {
    headers: { Authorization: `Bearer ${getToken()}` }
  }
}

export const getUserGroups = () => {
  return axios.get('/api/groups', withHeaders())
}

export const getGroup = async groupId => {
  return await axios.get(`${baseUrl}/groups/${groupId}`)
}

// PROFILE FUNCTIONS 

export const getProfile = async userId => {
  return await axios.get(`${baseUrl}/profile/${userId}`)
}

export const postContent = async (content, userId) => {
  return await axios.post(`${baseUrl}/profile/${userId}/post`, content, withHeaders())
}

export const toggleLike = async (userId, postId) => {
  return await axios.put(`/api/profile/${userId}/post/${postId}`,'' , withHeaders() )
} 

export const deleteAComment = async (userId, postId, commentId ) => {
  return await axios.delete(`/api/profile/${userId}/post/${postId}/comment/${commentId}`, withHeaders())
}

export const deleteAPost = async (userId, postId)=>{
  return await axios.delete(`/api/profile/${userId}/post/${postId}`, withHeaders())
}

export const followAUser = async (userId) => {
  const res = await axios.put(`/api/profile/${userId}/follow`,'' ,withHeaders())
  console.log(res)
}

export const postAComment = async (postOwner, postId, content) => {
  return await axios.put(`/api/profile/${postOwner}/post/${postId}/comment`,
    content , withHeaders() )
}

export const getCurrentUser = async () => {
  const resId = await getUserId()
  const dataId = resId.data
  const resProfile = await getProfile(dataId)
  const dataProfile = resProfile.data
  return dataProfile
}
