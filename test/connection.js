const mongoose = require('mongoose')
const express = require('express')
// graphtHttp exports a function that acts as middleware
// it will take a request and funnel it through the graphHttp
// parser and passes on to the resolver
const graphqlHttp = require('express-graphql')
const app = express()
const schema = require('./schema')

// body parsing middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// buildSchema takes a graphQl schema written as a javasript template literal
// an converted to javascript object

// this is a method that takes a creates a user the user
//should have a name propery of type String
// a sting type should be returned

//const users = []
app.get('/', (req, res, next) => {
  res.send('Hiya world!')
})
app.use('/graphql', graphqlHttp({schema, graphiql: true}))
//where do you find the schemas
//connect mongodb
mongoose
  .connect(
    'mongodb+srv://Venessa:w87ny781@cluster0-lkxcw.mongodb.net/Conversate?retryWrites=true&w=majority',
    {useNewUrlParser: true, useUnifiedTopology: true}
  )
  .then(() => {
    app.listen(3000)
    console.log('Listening on port 3000')
  })
  .catch(error => {
    console.log(console.log(error))
  })

//.once is an event listner which tells the connection is to
//listen once
//.on is an event listner that says listens to all requests
// mongoose.connection
//   .once('open', function () {
//     console.log('The connection has been made')
//   })
//   .on('error', function (error) {
//     console.log('Connecton error:', error)
//   })
