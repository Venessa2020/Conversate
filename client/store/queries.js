import {gql} from 'apollo-boost'

// const addUser = gql`
//   mutation AddUser($name: String!, $description: String!) {
//     addUser(name: $name, description: $description) {
//       name
//       description
//     }
//   }
// `

const getUsersQuery = gql`
  {
    users {
      id
      name
      description
    }
  }
`

const addUserMutation = gql`
  mutation AddUser($name: String!, $description: String!) {
    addUser(name: $name, description: $description) {
      name
      description
      id
    }
  }
`

export {getUsersQuery, addUserMutation}
