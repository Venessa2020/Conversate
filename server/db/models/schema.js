const graphql = require('graphql')
// Require in models
const User = require('./models')

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    description: {type: GraphQLString}
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        //return the user with the id used in the argument
        return User.findById(args.id)
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        //return all users by passing in an empty object
        return User.find({})
      }
    }
  }
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  //fields is used to show different type ways we can mutate the data (ex. addUser, deleteUser,etc.)
  fields: {
    addUser: {
      type: UserType,
      //arguments that we are expecting from the client when we receive the addUser request
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        description: {type: new GraphQLNonNull(GraphQLString)}
      },
      //resolve shows how our data is transformed
      resolve(parent, args) {
        let user = new User({
          name: args.name,
          description: args.description
        })
        // save the instane of user to our database
        console.log('hey', user)
        return user.save()
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})
