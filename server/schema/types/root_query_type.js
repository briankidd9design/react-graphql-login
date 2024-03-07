const graphql = require("graphql");
const { GraphQLObjectType, GraphQLID } = graphql;
const UserType = require("./user_type");

const RootQueryType = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    // GraphQL requires a field so we created a dummy field
    // return the current authenticated user for the current request object
    // If the req object does have a user, then we will return the user successfully
    // to the client side
    // Otherwise we will return null.
    // We will compare the existence of a user and null to determine whether
    // or not a user is authenticated on the client side
    // dummyField: { type: GraphQLID },
    user: {
      type: UserType,
      // the request object gets some properties automatically placed on it
      // by passport whenever we authenticate a user. this includes the property, user
      resolve(parentValue, args, req) {
        return req.user;
      },
    },
  },
});

module.exports = RootQueryType;
