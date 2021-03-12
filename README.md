# ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) General Assembly Project #3: spot.me (group project)

<a href="http://spot-me-group.herokuapp.com/register">Deployed Link<a/>

The third project is to **build a full-stack application** using **Mongoose, Express, React.JS and Node.JS**.

### Technical Requirements

Brief:

* **Time given** - 8 days.
* **Group members** - 4.
* **Create and consume an API** – this could be anything but it must make sense for your project.
* **The app can have a router** - with several "pages", this is up to your disgression and if it makes sense for your project.
* **Include wireframes** - that you designed before building the app.
* **Be deployed online** and accessible to the public.

---

## Concept

We wanted to build a facebook clone aimed towards gyms and workout related groups.

## Communication

We had a team standup every morning to update our progress every morning, what we were planning to do next, as well as express any blockers we were experiencing. We also stayed in contact with each other throughout the day for advice.

## Functionality

* Register and login.
* Friend and follow other users.
* Find gyms, see information, images, reviews and join them.
* Create groups.
* Private message other friends.
* Make public posts to all friends or specifically joined groups.

## Technologies Used
* JSX
* CSS
* JavaScript
* React.JS
* React-router-dom
* MongoDB
* Express
* Mongoose
* Node.JS
* Axios
* Bulma
* Insomnia
* Google Maps API
* Mapbox API

---

## Walk-Through

### Home

<img src="https://imgur.com/BMhbtQH.jpg">

### User page

<img src="https://imgur.com/0uHLD3X.jpg">

### Name search

<img src="https://imgur.com/ojCVGoV.jpg">

### Map

<img src="https://imgur.com/VVPRawv.jpg">

### Map modal

<img src="https://imgur.com/4R89ILX.jpg">

### Gym info

<img src="https://imgur.com/2zQDUXA.jpg">

### Messaging

<img src="https://imgur.com/zy8rm4b.jpg">
---

## Timeline breakdown

**Highlighted:** My personal contribution.

**Day 1:** Completed **wireframe design**, and mapped out schemas.

**Day 2:** Created frontend and backend for **login**, **registration**, navbar, and profile pages.

**Day 3:** Completed Schema for users in the backend, **location search** and information page in frontend.

**Day 4:** Added **seeds**, **posting**, and post viewing functionality.

**Day 5:** Completed comment and likes to posts, gym information pages, **group creation**, and following.

**Day 6:** Implimented **Messaging**, home page, search bar. 

**Day 7:** **Bug fixes**.

**Day 8:** **Final bug fixes** and **styling**.

---

## Wireframe

<a href="https://www.figma.com/file/Y1gbyc00bHPZqZpkZwb8Jd/Dinder?node-id=0%3A1">Figma link<a/>
  
Before we started I created the overall wireframe for the pages built in ***Figma***. For this project I wanted to give a clear outline of what the end product would be, so that the instructors would have a thorough grasp of what we were trying to achieve and to save time when it came to the styling phase.

<img src="https://imgur.com/GrRozzi.jpg">

---

## Featured code

### Locations

I initially implimented the Mapbox API consumption, later on one of my team mates tried implimenting geolocation based on user searches but had issues with mapbox itself. I helped to remedy the issue by moving the mapbox location variables into the parent component.

```
<MapGl
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
          mapStyle='mapbox://styles/mapbox/light-v10'
          {...this.props.viewport}
          onViewportChange={this.props.moveMap}
        >
          {this.props.data.map((location) => {
            return <Marker
              key={location.place_id}
              latitude={location.lat}
              longitude={location.lng}>
              <span role="img"
                aria-label="marker"
                onClick={() =>this.handleModal(location.place_id)}
              > 🏋️</span>
            </Marker>
          })}
        </MapGl>
```

```
class gymLocations extends React.Component {
  state= {
    searchForm: {
      keyword: '', 
      radius: '', 
      longitude: '', 
      latitude: '',
      address: ''
    },
    data: [],
    viewport: {
      latitude: 51.509865,
      longitude: -0.118092,
      width: '84.5vw',
      height: '82.5vh',
      zoom: 12
    }, 
    user: {},
    modal: false
  }

  handleChange = event => {
    const searchForm = { ...this.state.searchForm, [event.target.name]: event.target.value }
    this.setState({ searchForm })
  }

  async handleGeocoding() {
    const res = await axios.post('/api/locations/co' , { ...this.state.searchForm })
    const searchForm = { ...this.state.searchForm, latitude: res.data.lat, longitude: res.data.lng }
    const viewport = { ...this.state.viewport, latitude: res.data.lat, longitude: res.data.lng }
    this.setState({ searchForm, viewport })
  }

  handleSubmit = async event => {
    event.preventDefault()
    try {
      await this.handleGeocoding()
      const response = await axios.post('/api/locations', { ...this.state.searchForm }) 
      this.setState({ data: response.data })
    } catch (err) {
      console.log(err)
    }
  }

  moveMap = (viewport) => {
    this.setState({ viewport })
  }

  setModal =() => {
    this.setState({ modal: true })
  }
  hideModal = () => {
    this.setState({ modal: false })
  }

  render(){
    return (

      <>
        <div className="locations">
          <div className="search">
            <GymSearch
              change={this.handleChange} 
              submit={this.handleSubmit}
              {...this.state.searchForm}
              flyTo={this.handleFlyTo}
            />
          </div>
          <div className="map">
            <Map
              moveMap={this.moveMap}
              viewport={this.state.viewport}
              data={this.state.data}
            />
          </div>
        </div>
        <div className="sidebar">
          <ProfileSidebar 
            modal={this.state.modal}
            setModal={this.setModal}
            hideModal={this.hideModal}
            user={this.state.user.id}/>
        </div>
        
      </>
    )
  }
}

export default gymLocations
```

### Messaging

My most proud moment was completing the messaging system, there was a lot of trial and error since it was the first time I had to plan and write both frontend and backend relationships. I found it very interesting deciding how much work should be done in the frontend and backend, and what logic to impliment and learned a lot from this.

```
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
```

## Wins and Blockers

One of the challenges we faced was with promises from the backend. There were a lot async issues where pages would break due to information not being fetched in time. We managed to fix these but at the cost of a lot of time researching.

A big win personally was managing to impliment the messaging. I took it upon myself to build both the frontend and backend for it, however due to the constraints of how the backend was built from another team member I was unable to show names for the friends list to message.

---

## Bugs

**Friends sidebar does not show names.**

The limitation here was with the architecture of the user schema. In hindsight I would have brought up messaging requirements in the initial planning process.

**Message deleting only deletes for user and not recipent.**

My issue with this was the logic of the messages itself. I created a property in the user schema for messages, when a message is sent a message is then saved into both users. The difficulty was finding the exact message in the other users message array.

---

## Future Features

* Functioning image upload.
* Add additional emojis for likes.
* Settings page.

---

## Key Lessons Learnt

Understanding how React works with props and a little bit of foresight knowing what to expect, and whether to put the state in the parent component saved a lot of time in the long run. However, some components were not built this way and took some refactoring to impliment additional features, this was a team communication issue which I will bear in mind for in the future.
