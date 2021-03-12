import React from 'react'
import { defaultImage } from '../../lib/common'

const Followers = ({ user, getData, setModal }) => {

  const { followers } = user
  if (!user || !followers ) return null

  return (
    <div className='modal-' onClick={setModal}>
      <div className='followers-cont'>
    
        <h2 className='title'>{`${user.firstName}'s Followers`}</h2>
        
        {followers.length > 0 ? followers.map(f => {
          return <div key={f.id}className='f-field' onClick={()=> getData(f.id)}>
            <img alt='f -img'src={f.image ? `${f.image}` : defaultImage }/>
            <p>{`${f.firstName} ${f.lastName}`}</p>
          </div>

        }) 
          : <p style={{ color: 'red' }}> no followers to show </p> }

      </div>
    </div>
  )
}

export default Followers