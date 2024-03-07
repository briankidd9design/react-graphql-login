const express = require("express");
const models = require("./models");
const expressGraphQL = require("express-graphql");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportConfig = require("./services/auth");
const MongoStore = require("connect-mongo")(session);
const schema = require("./schema/schema");

// Create a new Express application
const app = express();

// Replace with your Mongo Atlas URI
// driver 2.0.14 or earlier
// For reference https://www.mongodb.com/docs/drivers/node/master/fundamentals/connection/connect/
const MONGO_URI =
  "mongodb://kiddler85:DesignCraft77@cluster0-shard-00-00.uq8m3.mongodb.net:27017,cluster0-shard-00-01.uq8m3.mongodb.net:27017,cluster0-shard-00-02.uq8m3.mongodb.net:27017/auth?ssl=true&replicaSet=atlas-45y55t-shard-0&authSource=admin&retryWrites=true&w=majority";
if (!MONGO_URI) {
  throw new Error("You must provide a Mongo Atlas URI");
}

// Mongoose's built in promise library is deprecated, replace it with ES2015 Promise
mongoose.Promise = global.Promise;

// Connect to the mongoDB instance and log a message
// on success or failure
mongoose.set("strictQuery", false);

mongoose.connect(MONGO_URI);
mongoose.connection
  .once("open", () => console.log("Connected to Mongo Atlas instance."))
  .on("error", (error) =>
    console.log("Error connecting to Mongo Atlas:", error)
  );

// Configures express to use sessions.  This places an encrypted identifier
// on the users cookie.  When a user makes a request, this middleware examines
// the cookie and modifies the request object to indicate which user made the request
// The cookie itself only contains the id of a session; more data about the session
// is stored inside of MongoDB.
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: "aaabbbccc",
    store: new MongoStore({
      url: MONGO_URI,
      autoReconnect: true,
    }),
  })
);

// Passport is wired into express as a middleware. When a request comes in,
// Passport will examine the request's session (as set by the above config) and
// assign the current user to the 'req.user' object.  See also servces/auth.js
app.use(passport.initialize());
app.use(passport.session());

// Instruct Express to pass on any request made to the '/graphql' route
// to the GraphQL instance.
app.use(
  "/graphql",
  expressGraphQL({
    schema,
    graphiql: true,
  })
);

// Webpack runs as a middleware.  If any request comes in for the root route ('/')
// Webpack will respond with the output of the webpack process: an HTML file and
// a single bundle.js output of all of our client side Javascript
const webpackMiddleware = require("webpack-dev-middleware");
const webpack = require("webpack");
const webpackConfig = require("../webpack.config.js");
app.use(webpackMiddleware(webpack(webpackConfig)));

module.exports = app;
