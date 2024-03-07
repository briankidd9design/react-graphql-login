const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString } = graphql;
// Since we are going to be working with Users and returning users, we will import the UserType
const UserType = require("./types/user_type");
// This AuthService has both the signup and login functions available on it
const AuthService = require("../services/auth");

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    signup: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        // we can do a comparison for the password on the Front End if we want to confirm that the user entered in the correct password (or the password they want to use) by comparing the two entries
        password: { type: GraphQLString },
      },
      // request represents the request object coming from Express
      // when we make an http request to our back end of any type, (graphql, jquery, fetch helper etc ) it enters int our Express application as a request
      // So the third argument is the request object
      // The request object has a bunch of details about the incoming request like what route we are trying to access, the query string if one exists, the body requests if one exists and other associated properties
      // We are going to use the request parameter to help out with the authentication side of things
      // The request argument will also be used by the auth service
      // GraphQL does not really know the intricacies of the authentication, but knows it needs to delegate the auth to the outside helper function
      //   resolve(parentValue, args, request) {
      resolve(parentValue, { email, password }, req) {
        return AuthService.signup({ email, password, req });
        // wait for this service to resolve before returning any values to the front end
        // GraphQL just knows to call this externeal service
        // return AuthService.signup({
        //   // we have to make sure the email is not in use but also save a new user to the database as well
        //   email: args.email,
        //   password: args.password,
        //   request: args.request,
        // });
      },
    },
    logout: {
      type: UserType,
      resolve(parentValue, args, req) {
        // save a reference to the user property
        const { user } = req;
        // when we call req.logout, it removes the request property off of the user object
        req.logout();
        return user;
      },
    },
    login: {
      // Here's what the mutation returns
      type: UserType,
      // Here's what the mutation expects to have
      args: {
        email: { type: GraphQLString },
        password: {
          type: GraphQLString,
        },
      },

      // destructuring args parameter
      // resolve(parentValue, args, req)
      // Here's what the mutation does
      resolve(parentValue, { email, password }, req) {
        return AuthService.login({ email, password, req });
      },
    },
  },
});

module.exports = mutation;
