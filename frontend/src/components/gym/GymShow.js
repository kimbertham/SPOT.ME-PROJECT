import React from 'react'
import axios from 'axios'

class gymShow extends React.Component {
  state={
    data : {
    bussinessStatus:'',
    location:'',
    name:'',
    rating:'',
    reviews:'',
    type:'',
      }
  }

async componentDidMount() {
  try {
      const gymId = this.props.match.params.placeId
      const response = await axios.post(`/api/locations/${gymId}`)
      const data = response.data
      console.log(response.data)
      this.setState({data})
    } catch (err) {
      console.log(err)
    }
}

render() {
  console.log(this.state)
  return (  
    <div className='gym-show-page'>
      
    </div>
    ) 
  }
}
export default gymShow