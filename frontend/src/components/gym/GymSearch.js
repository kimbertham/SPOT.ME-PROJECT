import React from 'react'

const gymSearch = ({change, submit, longitude,latitude,radius, keywords}) => {
  return (
  <section className='gymSearch'>
  <div className='gym-search-container'>
    <form onSubmit={submit} className='gym-search-form'>
        <div className='keywords-field'>
          <label className='keywords'><p>keywords</p> </label>
          <input 
            onChange={change}
            name='keywords' 
            value={keywords}
            className='form-input' 
            placeholder='keywords'/>
      <div className='radius-field'>
        <label className='radius'><p>radius</p> </label>
        <input 
          onChange={change}
          name='radius'
          value={radius}
          className='form-input' 
          placeholder='radius'/>
      </div>
      </div>
      <div className='longitude-field'>
        <label className='longitude'><p>longitude</p> </label>
        <input 
          onChange={change}
          name='longitude' 
          value={longitude}
          className='form-input' 
          placeholder='longitude'/>
      </div>
      <div className='latitude-field'>
        <label className='latitude'><p>latitude</p> </label>
        <input 
          onChange={change}
          name='latitude'
          value={latitude}
          className='form-input' 
          placeholder='latitude'/>
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