import React from "react";
import ReactDOM from "react-dom";
// 1. Set up ApolloProvider and ApolloClient
// 2. Set up the Router
// Apollo Client is the default export and therefore no {} are necessary
// The Apollo client is not related to any framework, including React. It's job is to interact with the database and store the data which will be presented by the Apollo Provider
import ApolloClient, { createNetworkInterface } from "apollo-client";
// Apollo Provider is not the default export and therefore the curly braces are necessary
import { ApolloProvider } from "react-apollo";
// In the index.js file we want to start up React router,
// We want to wire up the Apollo Client to our react application through the use of the Apollo Provider
// Provides a glue layer between the ApolloClient that fetches all the data and our React application, which displays all the data
import { Router, hashHistory, Route, IndexRoute } from "react-router";
// Note: If there is ever a "casing" issue or for any other reason, you can reload VSCode with ctrl+shft+p Developer: Reload Window
import App from "./components/App";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import Dashboard from "./components/Dashboard";
//We want to apply requireAuth wherever the dashboard gets used
import requireAuth from "./components/requireAuth";

const networkInterface = createNetworkInterface({
  uri: "/graphql",
  opts: {
    // this is the line that passes in the cookie
    // key same-origin, you are making request to the same origin that the browser is currently on so it's safe to send cookies on the outgoing request.
    // Send along a cookie whenever you send a query to the backend server
    credentials: "same-origin",
  },
});
// ApolloClient assumes that your GraphQL client on the Express side is listening on the endpoint /graphql
// if you check in the server.js file Whenever you make your own networkInterface, ApolloClient no longer assumes the endpoint is graphql
// app.use('/graphql', expressGraphQL({
// schema,
// qraphiql: true
//}))
const client = new ApolloClient({
  // The purpose of the o.id is to indentify every record that comes back from the server and store it in some local cache
  // this allows the apollo client to uniquely identify every record that we fetch
  // Therefore we will not have to refetch our data for every single query that is issued
  // now the ApolloClient is not using the default network interface that it assumes that you want to use, it's going to use the customized one right there
  networkInterface,
  dataIdFromObject: (o) => o.id,
  // We can customize the way the requests are being made to the backend server by specifying another option inside of the options object called the network interface
  // The network interface is a little piece of code inside the Apollo Client that is in charge of making backend requests to our network server
  // This will be our custom interface, and we will tell it that whenever you make a request to the backend make sure to send some cookies along with the request. Then we will take the newtwork interface and pass it along to the ApolloClient
});
const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        {/* The App component will always show the header and any nested component inside of it */}
        <Route path="/" component={App}>
          <Route path="login" component={LoginForm}></Route>
          <Route path="signup" component={SignupForm}></Route>
          <Route path="dashboard" component={requireAuth(Dashboard)}></Route>
        </Route>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector("#root"));
