import React from 'react'

const gymSearch = ({change, submit, longitude,latitude,radius, keyword, address, flyTo}) => {
  return (
  <section className='gymSearch'>
  <div className='gym-search-container'>
    <form onSubmit={submit} className='gym-search-form'>
        <div className='keyword-field'>
          <label className='keyword'><p>keyword</p> </label>
          <input 
            onChange={change}
            name='keyword' 
            value={keyword}
            className='form-input' 
            placeholder='keyword'/>
        </div>

      <div className='radius-field'>
        <label className='radius'><p>radius</p> </label>
        <input 
          onChange={change}
          name='radius'
          value={radius}
          className='form-input' 
          placeholder='radius'/>
      </div>

      <div className='address-field'>
        <label className='address'><p>address</p> </label>
        <input 
          onChange={change}
          name='address' 
          value={address}
          className='form-input' 
          placeholder='address'/>
      </div>

      <div className='search-button'>
        <button type='submit'>Search</button>
      </div>
    </form>
    </div>
        </section>
    )
}

export default gymSearch