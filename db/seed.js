const mongoose = require('mongoose')
const faker = require('faker')
const User = require('./models/user')
const dbURI = 'mongodb://localhost/spotme-db'


mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, async (err, db) => {
  
  if (err) return console.log(err)

  try {
    await db.dropDatabase()

    const users = []

    for (let index = 0; index < 300; index++) {
      const name = faker.name.findName()
      const splitName = name.split(' ')
      const firstName = splitName[0]
      const lastName = splitName[1]
      const image = faker.image.imageUrl()
      users.push({
        firstName: firstName, 
        lastName: lastName,
        username: name,
        email: `${name.split(' ').join('')}@email.com`,
        password: 'pass',
        passwordConfirmation: 'pass',
        image: image
      })
    }

    const createdUsers = await User.create(users)

    console.log(`❇️ Created ${createdUsers.length} ❇️`)
    
  } catch (err) {
    console.log(err)
  }

  mongoose.connection.close()
})