require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const router = require('./config/routes')
const app = express()
const port = process.env.PORT || 8000
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/spotme-db'
const errorHandler = require('./lib/errorHandler')


mongoose.connect(
  dbURI,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true  },
  (err) => {
    if (err) return console.log(err)
    console.log('Mongo is Connected!')
  })


// Middleware here
app.use(express.static(`${__dirname}/frontend/build`))


app.use(bodyParser.json())

app.use('/api', router)

app.use('/*', (req, res) => res.sendFile(`${__dirname}/frontend/build/index.html`))

app.use(errorHandler)


// Middleware end

app.listen(port, () => console.log(`Express is listening on port ${port}`))