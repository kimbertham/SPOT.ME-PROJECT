
<h1> SpotMe </h1>

<img src='https://i.imgur.com/OPFn2GB.png' alt='img'/>

<h2> Brief </h2>
<p> General Assmeby Group Project - 1 week - 4 participants </p>
<p> Create a full stack application consuming atleast one API. </p>

<h2> Technologies </h2>
<ul>
  <li><p>JavaScript</p></li>
  <li><p>Sass</p></li>
  <li><p>ReactJs</p></li> 
  <li><p>Node.js</p></li> 
  <li><p>Express</p></li> 
  <li><p>MongoDB</p></li> 
  <li><p>Mongoose</p></li>
  <li><p>Git</p></li>
  </ul>
  
<h2> Process </h2>
<p> In our first meeting we to create a social media website targeted at gym goers, it would have posting and messaging elements as well as gym specifics features such as gym searching and group creating. We also decided it would be beneficial for us to spend every morning having a quick stand up where we'd discuss what each of us would be doing throughout the day and also that we'd be available on zoom to each other throughout our working hours. Considering the time available to us, we agreed we would aim to get the project to a MVP stage by the 5 day to allow time for styling and handling any bugs. </p>


<h4> Planning/Delegation </h4>
<p> To ensure everyone was on the same page and had an idea of what to do, we discussed what the website would potentially look like and how it would function by the end of the week. We created a list of the possible APIs and packages we would need throughout the project and used insomnia to get a glimpse of the data we would be handling. We then created a wireframe using figma and mapped out the relationships between the different components and elements.  It was decided that I would personally would predominately on the frontend of the website.
  
<h4> Gym data and search </h4>
<p float='left'>
  <img src='https://i.imgur.com/HWXvsEP.png' width='400' alt='gym'/>
    <img src='https://i.imgur.com/LL5IKJI.png' width='400' alt='gym'/>

<p> My first task was to get the gym sections running, this would involve the use of mapbox and google places API to provide visual locations and details. Once getting the map up, I was able to feed in coordinates attained from google places searches. These results were based on a keyword and provided results found in a given radius. These results were then plotted on the map using markers and linked to a details page on selection. The details page took the form of reusable components with details provided as props. The images were displayed using 'Slick-Carousel', a third-party package. </p>

```
      <MapGl
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
          mapStyle='mapbox://styles/mapbox/light-v10'
          {...this.props.viewport}
          onViewportChange={this.props.moveMap}>
          
          {this.props.data.map((location) => {
            return <Marker
              key={location.place_id}
              latitude={location.lat}
              longitude={location.lng}>
              <span role="img"
                aria-label="marker"
                onClick={() =>this.handleModal(location.place_id)}
              >🏋️‍♀️</span>
            </Marker>
          })}
        </MapGl>
        
  ```
        
 <h4> Profile and followers </h4>
 <p> With the gym sections done, I then began creating and styling the profile info section. This involved pulling the data by sending request to the backend using Axios. Once the basic data was set, I decided to separate the followers and edit sections as modals and implemented the follow buttons on other users page. 
 
 ``` 
    <button onClick={() => followUser(user.id)} className={current.id === user.id ? 'display-none' : 'follow-button'}>
          {current.following.includes(user.id) ? 'Unfollow' : 'Follow'}
        </button>
```

<h4> Profile posting </h4>
<img src='https://i.imgur.com/UQChPal.png' alt='post' width='500'/>
<p> I was then tasked with handling all the posting that would occur on profiles and the homepage. I spent most of this time creating post components and requests to be backend that allowed the viewers to create posts, comments and likes. I also created delete buttons and display likes hovers. </p>
  
```

setLike = (i) => {
  this.setState({ show: i ? i : null })
}

render() {

  const { p, i } = this.props
  const { show } = this.state
  if (!p.likes) p.likes = []
  
  return (
    <div className="feeds-likes" >
      <div className='center'
        onMouseLeave={()=>this.setLike()}
        onMouseEnter={()=> this.setLike(i + 1)} >

        <img className="likes" alt="logo"
          src={require('../../assets/muscle.png')}/>
        
        <div className={show ? 'likes-hover' : 'display-none'}>  
          {p.likes.map(l => 
            <p key={l.id}>{`${l.firstName}`} {`${l.lastName}`}</p> 
          )}
        </div>
  
        <small>
          {p.likes.length === 1 ? `${p.likes[0].firstName} ${p.likes[0].lastName} likes this` 
            : p.likes.length === 2 ? `${p.likes[0].firstName} ${p.likes[0].lastName} and ${p.likes[1].firstName} ${p.likes[1].lastName} like this`  
              : p.likes.length === 3 ?  `${p.likes[0].firstName} ${p.likes[0].lastName}, ${p.likes[1].firstName} ${p.likes[1].lastName} and ${p.likes[2].firstName}                 ${p.likes[2].lastName} like this` 
                : p.likes.length === 4 ?  `${p.likes[0].firstName} ${p.likes[0].lastName}, ${p.likes[1].firstName} ${p.likes[1].lastName} and ${p.likes.length - 2}                 others like this` 
                  : 0 }
         </small>
      </div>
      
 ```
  <h2> Wins/Loses </h2>
  <h4> Wins </h4>
  <ul>
  <li>
  <p> Creating the gym section in this project involved me having to do a lot of reading and searching through documentation in order to get all the data and images set up. The google places API particularly had a lot of nested data and links pointing to other searches required. In doing this, I feel a lot more confident sifting through information and making the appropriate searches in order to find what is needed. </li></p>
 <p><li> Creating the posts forced me to really consider how to set up my components in an organized way. To minimise the number of requests needed, I had to really consider where to place functions and how to pass them as props in a way that was readable and structured. </li></p>
 </ul>
  <h4> Loses </h4>
  <ul>
  <li><p> Initially as a group we had a few issues with managing sections and communication which led to a lot of work being written over. This further became an issue when pulling from git and having a lot of merge conflicts that had to be fixed. After realising this issue, we tried to be more considerate of each other’s work and not make alterations without informing others first. </li></p>
<li><p> When creating the posts, I had forgotten to consider it would not always be the user posting to their own page and that they would likely be posting to others pages. Once I came upon this issue I was able to refactor my code and functions by sending profile ids in parameters, however this could have been avoided had I spent more time before hand planning through my work. </li></p>
 </ul>
 
 <h2> Bugs and future work </h2>
 <p> Some of the empty fields coming from the places API leads to an error on the page due undefined variables. This could be fixed by going through and adding default values if null results are present. </p>
 <p> Currently the website is not quite at finished state and in future i would like to go through and finish sections such as the groups and events. </p>
  
 <h2> Experience and takeaways </h2>
 <p> I found this project taught me a lot about team work and the importance of planning and communication. With so many interacting parts of a website, its key to be informed about what other coders are doing in order for all the components to work together appropriately. I have also become much more comfortable using ReactJS since beginning this project and believe I have a much more stable grasp on the benefits of using state changes and prop passing.  </p>

  
     
