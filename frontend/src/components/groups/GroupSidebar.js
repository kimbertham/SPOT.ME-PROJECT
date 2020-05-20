import React from 'react'

function GroupSidebar(props) {
  // console.log('yo');
  const members = props.members
  //  console.log(props.members);

  return (
<<<<<<< HEAD
    <div key={member._id}> 
    <img src={member.image} alt='group-img'/>
    <p>{member.firstName} {member.lastName}</p>
    </div>
  )
}) : ''}
=======
    <div className='left-section'>
      <div className='profile-sidebar'>
        <div className='groups-container'>
          <div className='sidebar-head'>
            <h1>Members</h1>
          </div>
          <div className="groups-list-wrap">
        <div className="groups-list">
          {members ? members.map(member => {
            return (
              <div key={member._id}>
                <img src={member.image} />
                <p>{member.firstName} {member.lastName}</p>
              </div>
            )
          }) : ''}
          </div>
          </div>
        </div>
>>>>>>> d5bce1a3b039a644102d8965887f37649b40cb0d
      </div>
    </div>
  )

}
export default GroupSidebar