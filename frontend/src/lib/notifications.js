
import {  toast } from 'react-toastify'

export const notify = (message) => toast( message , {
  position: 'top-right',
  autoClose: 1500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined
})

 export const defaultImage = 'https://bit.ly/3g47LRX'
