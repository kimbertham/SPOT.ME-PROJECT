import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { getUserGroups } from '../../lib/api'

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
  await axios.post(`/api/groups/new/${userId}`, this.state.group,
    { headers: { Authorization: `Bearer ${window.localStorage.getItem('token')}` } })
}

  render(){
    const {groups} = this.state
    const modalClassName = this.props.modal ? 'display-block' : 'display-none'
  return(

    <>
<<<<<<< HEAD
      {groups ? groups.map(group => {
        return <Link to='/group/:groupId'>
<<<<<<< HEAD
          <div key= { group.id }className='group-field'>
            <img className='group-icon' src='https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png' alt='group-pic'/>
            <div className='group-info'>
              <p>{ `${group.name}` }</p>
            </div>
=======
=======
      {groups? groups.map(group => {
        return <Link to={`/groups/${group._id}`}>
>>>>>>> d5bce1a3b039a644102d8965887f37649b40cb0d
          <div key={ group.id } className='group-field'>
          <img className='group-icon' src={ group.image ? group.image : 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS1xllWBpckzi_eEfVyJuUcy9WEWObmCUmTsENKt85aXU67KSnF&usqp=CAU'} alt='group'/>
          <div className='group-info'>
        <p>{ group.name }</p>
>>>>>>> e4d42d5b01f3dd51564a1579594655fb833bfb67
          </div>
        </Link>
      }) : ' ' }


<<<<<<< HEAD
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
                placeholder="First Name here"
                name="description"
                onChange={this.handleChange}
                value={groups.description}
              />
            </div>
            <button>Send!</button>
          </form>
        </div>
      </div>
=======
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
>>>>>>> e4d42d5b01f3dd51564a1579594655fb833bfb67
    </>
  )
}
}
export default ProfileGroups