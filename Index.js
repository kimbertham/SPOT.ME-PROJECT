const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
const port = 8000
const dbURI = 'mongodb://localhost/spotme-db'


mongoose.connect(
  dbURI,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true  },
  (err) => {
    if (err) return console.log(err)
    console.log('Mongo is Connected!')
  })

app.use(bodyParser.json())

// Middleware here







// Middleware end

app.listen(port, () => console.log(`Express is listening on port ${port}`))