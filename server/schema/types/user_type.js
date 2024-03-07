const graphql = require("graphql");
// These types are all destructured off of the graphql object
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;

// What different fields these different types or objects should have. Whenever we work with a type, it usually corresponds to a model of sorts in the database, or a collection of types that sits in our database.
// The boilerplate that we are making use of already has a model defined in the models/user.js file
const UserType = new GraphQLObjectType({
  name: "UserType",
  fields: {
    email: {
      type: GraphQLString,
    },
    id: {
      type: GraphQLID,
    },
  },
});

module.exports = UserType;
