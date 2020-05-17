import axios from 'axios'
import { getToken } from './auth'

const baseUrl = '/api'

const withHeaders = () => {
  return {
    headers: { Authorization: `Bearer ${getToken()}` }
  }
}

export const getProfile = userId => {
  return axios.get(`${baseUrl}/profile/${userId}`)
}