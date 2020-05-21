import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { getUserGroups, withHeaders } from '../../lib/api'

class ProfileGroups extends React.Component {
state = {
  groups: []
}

async componentDidMount() {
  const res = await getUserGroups()
  const groups = res.data
  this.setState({ groups })
}

handleChange = event => {
  const group = { ...this.state.group, [event.target.name]: event.target.value }
  this.setState({ group })
}

handleSubmit =  async (event) => {
  event.preventDefault()
  const userId = this.props.user
  await axios.post(`/api/groups/new/${userId}`, this.state.group, withHeaders())
}

render(){
  const { groups } = this.state
  const modalClassName = this.props.modal ? 'display-block' : 'display-none'
  return (

    <>
      {groups? groups.map((group,i) => {
        return <Link key={i} to={`/groups/${group._id}`}>
          <div key={ group.id } className='group-field'>
          <img className='group-icon'
          src={ group.image ? group.image :
          'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS1xllWBpckzi_eEfVyJuUcy9WEWObmCUmTsENKt85aXU67KSnF&usqp=CAU'} 
          alt='group'/>
          <div className='group-info'>
        <p>{ group.name }</p>
        </div>
          </div>
        </Link>
      }) : ' ' }


      <div className={`${modalClassName} modal `}> 
        <div className={`${modalClassName} modal-info modal-group`}> 
          <div onClick={this.props.toggleModal}> X</div>
          <h1> New Group </h1>
          <form onSubmit={this.handleSubmit}className="group-profile-form">
            <div className="group-field">
              <label className="label"> Group Name </label>
              <input 
                className='group-input' 
                placeholder="Group name here"
                name="name"
                onChange={this.handleChange}
                value={groups.name}
              />
            </div>
            <div className="group-field">
              <label className="label"> Description </label>
              <input 
                className='group-input'
                placeholder="Group description here"
                name="description"
                onChange={this.handleChange}
                value={groups.description}
              />
            </div>
            <div className="group-field">
              <label className="label"> Image Url </label>
              <input 
                className='group-input'
                placeholder="Group image here"
                name="image"
                onChange={this.handleChange}
                value={groups.image}
              />
            </div>
            <button>Send!</button>
          </form>
        </div>
      </div>
    </>
  )
}
}
export default ProfileGroups