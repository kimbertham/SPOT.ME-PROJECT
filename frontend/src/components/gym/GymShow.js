import React from 'react'
import axios from 'axios'

class gymShow extends React.Component {

async componentDidMount() {
  try {
      const gymId = this.props.match.params.id
      const response = await axios.post(`/api/locations/${gymId}`)
      console.log(response.data)
    } catch (err) {
      console.log(err)
    }
}


render() {
  return (
    <div className='page-container'/>
  
    ) 
    
  }
}
export default gymShow