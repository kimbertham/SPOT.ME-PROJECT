import React from 'react'

function GroupSidebar(props) {
  // console.log('yo');
  const members = props.members
  //  console.log(props.members);

  return (
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
                <img src={member.image} alt='group-icon'/>
                <p>{member.firstName} {member.lastName}</p>
              </div>
            )
          }) : ''}
          </div>
          </div>
        </div>
      </div>
    </div>
  )

}
export default GroupSidebar