import React from 'react'
import ReactDOM from 'react-dom'
import ApolloClient from 'apollo-boost'
import {ApolloProvider} from 'react-apollo'
import AddUser from './components/addUser'
import Quiz from './components/quiz'
import Users from './components/users'

const client = new ApolloClient({
  // the end point that handles all of our http queries
  uri: 'http://localhost:8080/graphql'
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Users />
    <AddUser />
    <Quiz />
  </ApolloProvider>,
  document.getElementById('app')
)
