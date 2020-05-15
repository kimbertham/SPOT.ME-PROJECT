function errorHandler(err,req,res,next){
  console.log(err)
  
  if (err.name === 'ValidationError') {
    const customErrors = {} 
    for (const key in err.errors) {
      customErrors[key] = err.errors[key].message
    }
    return res.status(422).json(customErrors)
  }

  if (err.message === 'Not Found'){
    return res.status(404).json({ message: 'Oops, this is not found' })
  }

  if (err.message === 'Unauthorized'){
    return res.status(422).json({ message: 'Oops, you are not authorized to do that' })
  }

  if (err.message === 'wrong info'){
    return res.status(422).json({ message: 'Wrong username or password' })
  }

  if (err.message === 'comment could not be found, this may already be removed!'){
    return res.status(422).json({ message: 'comment could not be found, this may already be removed!' })
  }
  

  res.status(500).json(err)
  next(err)
}

module.exports = errorHandler