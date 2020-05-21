import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { getGroup, withHeaders } from '../../lib/api'

class GroupEdit extends React.Component {
state = {
  formData: {
    name: this.props._id,
    description: this.props.description,
    image: this.props.image
  }
}

// componentDidMount() {
//   console.log(this.props);
  
//     this.setState({ 
//       formData: {
//         name: this.props.name,
//         description: this.props.description,
//         image: this.props.image,
//       }
//     })
// }

handleChange = event => {
  const formData = { ...this.state.formData, [event.target.name]: event.target.value }
  this.setState({ formData })
}

handleSubmit =  async (event) => {
  try {
    const groupId = this.props._id
    event.preventDefault()
    const userId = this.props.user
    await axios.put(`/api/groups/${groupId}/edit`, this.state.formData, withHeaders())
    this.props.toggleModal()
    this.props.handleEdit()
  } catch(err){
    console.log(err);
    
  }
  
}

render(){
  const { formData } = this.state
  const modalClassName = this.props.modal ? 'display-block' : 'display-none'
  return (

    <>
      <div className={`${modalClassName} modal `}> 
        <div className={`${modalClassName} modal-info modal-group`}> 
          <div className="closed" onClick={this.props.toggleModal}> X</div>
          <h1> Edit Group </h1>
          <form onSubmit={this.handleSubmit}className="group-profile-form">
            <div className="field">
              <label className="label"> Group Name </label>
              <div className="control"> 
              <input 
                className=' input is-info group-input' 
                placeholder="Group name here"
                name="name"
                onChange={this.handleChange}
                value={formData.name}
              />
              </div>
            </div>
            <div className="field">
              <label className="label"> Description </label>
              <div className="control">
                <input 
                className='input is-info group-input'
                placeholder="Group description here"
                name="description"
                onChange={this.handleChange}
                value={formData.description}
              />
              </div>
            </div>
            <div className="field">
              <label className="label"> Image Url </label>
              <div className="control">
                <input 
                className='input is-info group-input'
                placeholder="Group image here"
                name="image"
                onChange={this.handleChange}
                value={formData.image}
              />
              </div>
            </div>
            <button type="submit" className="button is-fullwidth is-rounded is-link">Send!</button>
          </form>
        </div>
      </div>
    </>
  )
}
}
export default GroupEdit