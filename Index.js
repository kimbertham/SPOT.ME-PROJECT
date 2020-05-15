const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const router = require('./config/routes')
const app = express()
const port = 8000
const dbURI = 'mongodb://localhost/spotme-db'
const errorHandler = require('./lib/errorHandler')


mongoose.connect(
  dbURI,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true  },
  (err) => {
    if (err) return console.log(err)
    console.log('Mongo is Connected!')
  })


// Middleware here



app.use(bodyParser.json())

app.use('/api', router)
app.use(errorHandler)


// Middleware end

app.listen(port, () => console.log(`Express is listening on port ${port}`))