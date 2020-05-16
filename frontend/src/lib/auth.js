export const setToken = token => {
  window.localStorage.setItem('token', token)
}

export const getToken = () => {
  localStorage.removeItem('token')
}