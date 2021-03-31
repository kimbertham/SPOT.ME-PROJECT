
<h1> SpotMe </h1>
<p> Link : </p>

<h2> Brief </h2>
<p> General Assmeby Group Project - 1 week - 4 participants </p>
<p> Create a full stack application consuming atleast one API. </p>

<h2> Technologies </h2>
<ul>
  <li><pi>-JavaScript</p></li>
  <li><pi>-Sass</p></li>
  <li><pi>-ReactJs</p></li> 
  <li><pi>-Node.js</p></li> 
  <li><pi>-Express</p></li> 
  <li><pi>-MongoDB</p></li> 
  <li><pi>-Mongoose</p></li>
  <li><pi>-Heroku</p></li> 
  <li><pi>-Git</p></li>
  </ul>
  
<h2> Process </h2>
<p> In our first meeting we to create a social media website targeted at gym goers, it would have posting and messaging elements aswell as gym specifics features such as gym searching and group creating. </p>

<h4> Planning/Delegation </h4>
<p> To ensure everyone was on the same page and had an idea of what to do we discussed what the website would potentially look like and how it would function by the end of the week. We created a list of the possible APIs and packages we would need throughout the project and used insomnia to get an idea of the data we would be handling. We then created a wireframe using figma and mapped out the relationships between the different components and elements. Considering the time available to us, we agreed we would aim to get the project to a MVP stage by the 5 day to allow time for styling and handling any bugs. We also decided it would be beneficial for us to spend every morning having a quick standup where we'd discuss what each of us would be doing throughout the day and also that we'd be available on zoom to each other throughout our working hours. It was decided that I would personally would predominately on the frontend of the website.
  
<h4> Gym data and search </h4>
<p float='left'>
  <img src='https://i.imgur.com/HWXvsEP.png' width='300' alt='gym'/>
    <img src='https://i.imgur.com/LL5IKJI.png' width='300' alt='gym'/>

<p> My first task was to get the gym sections running, this would involve the use of mapbox, and google places API to provide visual locations and details. Once getting the map up, I was able to feed in coordinates attained from google places searches. These results were based on a keyword and provided results found in a given radius. These results were then plotted on the map using markers and on selection linked to a details page. The details page took the form of reusable components with details provided as props. The images were displayed using 'Slick-Carousel', a third party package. </p>

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
        
