import React from 'react'
import {gql} from 'apollo-boost'
//used to bind a query to a component
import {graphql} from 'react-apollo'

const getUsersQuery = gql`
  {
    users {
      id
      name
      description
    }
  }
`
class Users extends React.Component {
  render() {
    console.log(this.props, 'The props')
    const {loading, users} = this.props.data
    if (loading) {
      return <h1>...Loading</h1>
    }
    return (
      <div>
        <ul>
          <li>User's Name</li>
          {users.map(user => {
            return <div key={user.id}>{user.name}</div>
          })}
        </ul>
      </div>
    )
  }
}

export default graphql(getUsersQuery)(Users)
