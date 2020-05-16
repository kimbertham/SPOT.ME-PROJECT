<<<<<<< HEAD
// import { notify } from 'react-notify-toast'
// const styles = {
//   background: '#000', text: '#fff' 
// }

// export const toast = message => {
//   notify.show(message, 'custom', 3000, styles)
// }
=======

import {  toast } from 'react-toastify';
const styles = {
  background: '#000', text: '#fff' 
}


export const notify = (message) => toast( message , {
  position: "top-right",
  autoClose: 1500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
})
>>>>>>> development
