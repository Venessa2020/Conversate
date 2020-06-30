const graphql = require('graphql')
// Require in models
const User = require('./user')
const Quiz = require('./quiz')

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql

// MATCH ALGORITHIM
const fina = arrays => {
  let highestMatch = 0
  let topMatch
  arrays.filter(arr => {
    if (arr[1] > highestMatch) {
      highestMatch = arr[1]
      topMatch = arr
    }
  })
  return topMatch
}

const match = (totalNum, newUser) => {
  let final = []
  for (let i = 0; i < totalNum.length; i++) {
    let keys1 = Object.keys(newUser)
    let keys2 = Object.keys(totalNum[i])
    let person = []
    let store = []
    let score = 0
    for (key in keys1) {
      if (newUser[key] === totalNum[i][key]) {
        score++
        store.push(key)
      }
    }
    person.push(i, score, store)
    final.push(person)
  }
  return fina(final)
}

//
const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    description: {type: GraphQLString}
  })
})

const QuizType = new GraphQLObjectType({
  name: 'Quiz',
  fields: () => ({
    id: {type: GraphQLID},
    a: {type: GraphQLString},
    b: {type: GraphQLString},
    c: {type: GraphQLString},
    d: {type: GraphQLString},
    userId: {
      type: UserType,
      resolve(parent, args) {
        console.log(parent)
      }
    }
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
    },
    quiz: {
      type: new GraphQLList(QuizType),
      resolve(parent, args) {
        return Quiz.find({})
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
        return user.save()
      }
    },
    addQuiz: {
      type: QuizType,
      args: {
        a: {type: new GraphQLNonNull(GraphQLString)},
        b: {type: new GraphQLNonNull(GraphQLString)},
        c: {type: new GraphQLNonNull(GraphQLString)},
        d: {type: new GraphQLNonNull(GraphQLString)}
      },
      resolve(parent, args) {
        let newQuiz = new Quiz({
          a: args.a,
          b: args.b,
          c: args.c,
          d: args.d
        })
        return newQuiz.save()
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})
