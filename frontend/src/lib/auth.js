export const setToken = token => {
  window.localStorage.setItem('token', token)
}

export const getToken = () => {
  localStorage.removeItem('token')
}

export const getPayload = () => {
  const token = getToken()
  if (!token) return false
  const parts = token.split('.')
  if (parts.length < 3)  return false 
  return JSON.parse(window.atob(parts[1]))
}