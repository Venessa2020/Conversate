const mongoose = require('mongoose')
const Schema = mongoose.Schema

const QuizSchema = new Schema({
  a: String,
  b: String,
  c: String,
  d: String,
  userId: String
})

const Quiz = mongoose.model('Quiz', QuizSchema)
module.exports = Quiz
