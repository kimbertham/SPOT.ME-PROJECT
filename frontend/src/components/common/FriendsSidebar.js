import React from 'react'
import axios from 'axios'
import { getProfile } from '../../lib/api'
import { withHeaders } from '../../lib/api'
import { getUserId } from '../../lib/auth'

class FriendsSidebar extends React.Component {
  state = {
    user : {},
    modal: false,
    friendProfiles: [],
    chat: {
      content: '',
      image: ''
    },
    chatId: '',
    conversation: []
  }

  getData = async () => {
    const res = await getProfile(getUserId())
    this.setState( { user: res.data })   
  }

  async componentDidMount() {
    try {
      //* limited by following in backend
      // const friendData = await res.data.following.map(id => getProfile(id))
      this.getData()
    } catch (err) {
      console.log(err)
    }
  }

  handleChange = event => { this.setState({ chat: {content: event.target.value }}) }
  
  handleSubmit =  async (event) => {
    event.preventDefault()
    try {
      const res = await axios.post(`/api//messages/${getUserId()}/post/5ec60be3e9d35e6a408d1605`,this.state.chat , withHeaders())
      await this.getData()
      await this.getChat(this.state.chatId)
      // console.log(res)
    } catch (err) {
      console.log(err)
    }
  }

  getChat = id => {
    const conversation = this.state.user.messages.filter(message => id === message.otherUserId)
    this.setState({ conversation: conversation, chatId: id })
  }

  toggleModal = (id) => {
    this.getChat(id)
    this.setState({ modal : !this.state.modal  })
  }

  render() {
    const { user, modal, chat, conversation } = this.state
    const modalClassName = modal ? 'display-block' : 'display-none'

  return ( <div className="right-section">
            <div className='sidebar-head'> 
              <h3>Contacts</h3>
            </div>
          <div className="friends-list">
    { user.following ? user.following.map(friend => {
    return <div key={friend} className="friend" onClick={()=>this.toggleModal(friend)}>
              <img 
                className='friend-icon' 
                src={require("../../assets/dumbbell.png")}
                // src={ friend.image ? friend.image : '../../assets/dumbell.png'} 
                alt='friend'
              />          
          <p>Friend</p>
          </div>
    }) : null }
  </div>

  <div className={`${modalClassName} modal `}> 
    <div className={`${modalClassName} modal-info chat-modal`}>
      
      <div className="chat-top" >
        <h1> Chat </h1>
        <div className="close-chat-modal" onClick={this.toggleModal}> X</div>
      </div>

      {/* // * past messages show */}
      <div className="chatbox">
        { conversation.map(entry => {
          return <div 
          className={ entry.sender === user.id ? "my-message" : "their-message" }
          >{entry.content}
          </div>
          
        })}
      </div>

      <form className="chat-form" onSubmit={this.handleSubmit} >
          <textarea 
            className='chat-input'
            placeholder="Type something here"
            name="content"
            onChange={this.handleChange}
            value={chat.content}
            />
          <button>Send!</button>
      </form>
      </div>
    </div>
  </div>
    )
  } 
}

export default FriendsSidebar