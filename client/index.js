import React from 'react'
import ReactDOM from 'react-dom'
import ApolloClient from 'apollo-boost'
import {ApolloProvider} from 'react-apollo'
import PracticeTest from './components/practiceTest'

const client = new ApolloClient({
  // the end point that handles all of our http queries
  uri: 'http://localhost:8080/graphql'
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <PracticeTest />
  </ApolloProvider>,
  document.getElementById('app')
)
