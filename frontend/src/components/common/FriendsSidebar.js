import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { notify } from '../../lib/notifications'
import { getProfile, withHeaders } from '../../lib/api'
import { getUserId } from '../../lib/auth'
import axios from 'axios'


class FriendsSidebar extends React.Component {
  state = {
    user: {},
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

  handleChange = event => {
    this.setState({ chat: { content: event.target.value } }) 
  }
  
  handleSubmit =  async (event) => {
    event.preventDefault()
    try {
      await axios.post(`/api//messages/${getUserId()}/post/${this.state.chatId}`,this.state.chat , withHeaders())
      await this.getData()
      await this.getChat(this.state.chatId)
      this.setState( { chat: { content: '', image: '' } })
    } catch (err) {
      console.log(err)
    }
  }

  deleteMessage = async (event, postId) => {
    try {
      await axios.delete(`/api//messages/${getUserId()}/delete/${postId}`, withHeaders())
      await this.getData()
      await this.getChat(this.state.chatId)

      notify('Message deleted!')
    } catch (err) {
      console.log(err)
    }
    
  }

  getChat = async id => {
    const conversation = this.state.user.messages.filter(message => id === message.otherUserId)
    console.log(conversation)
    this.setState({ conversation: conversation, chatId: id })
  }

  toggleModal = (id) => {
    this.getChat(id)
    this.setState({ modal: !this.state.modal  })
  }

  render() {
    const { user, modal, chat, conversation } = this.state
    const modalClassName = modal ? 'display-block' : 'display-none'
    

    return ( <div className="right-section">
      <ToastContainer/>
      <div className='sidebar-head'> 
        <h3 className="contacts">Contacts</h3>
      </div>
      <div className="friends-list">
        { user.following ? user.following.map(friend => {
          return <div key={friend} className="friend" onClick={()=>this.toggleModal(friend)}>
            <img 
              className='friend-icon' 
              src={require('../../assets/dumbbell.png')}
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
              return <div key={`${entry._id}chat`}
                className={ entry.sender === user.id ? 'my-message' : 'their-message' }
              >{entry.content}
                <p onClick={(event) => this.deleteMessage(event, entry._id)}>X</p>
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
            <button>Send</button>
          </form>
        </div>
      </div>
    </div>
    )
  } 
}

export default FriendsSidebar