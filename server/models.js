const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Create schema for our database, this is how mongoose will store data in our database

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
})

//Create Model
// the name of the model(collection in the database) and the schema to use with the model
const User = mongoose.model('User', UserSchema)

module.exports = User
