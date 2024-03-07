// This is a higher order component
import React, { Component } from "react";
import { graphql } from "react-apollo";
import currentUserQuery from "../queries/CurrentUser";
import { hashHistory } from "react-router";
// We want to determine if the user is authenticated

export default (WrappedComponent) => {
  class RequireAuth extends Component {
    // called every single time the component updates in state in any fashion.
    // componentDidMount() {
    // componentWillUpdate is called every single time the query updates in state in any fashion including loading to not loading, or not loading to loading, or the current user does not exist anymore
    // Every single time that our query updates in anyway shape or form, the componentWillUpdate will be called again and we can inspect the new props coming in and decide whether or not we need to re-direct the user to the login form
    componentWillUpdate(nextProps) {
      // the nextProps that the component is about to be rendered with
      // If the query is finished loading and the user is not logged in then let's kick the user back to the login screen
      //   console.log(this.props.data.loading && this.props.data.user);
      //   if (!this.props.data.loading && !this.props.data.user) {
      //     hashHistory.push("/login");
      //   }
      // the updated query is not loading and there is no defined user
      // if this is the case, re-direct the user to the login screen
      if (!nextProps.data.loading && !nextProps.data.user) {
        hashHistory.push("/login");
      }
    }
    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return graphql(currentUserQuery)(RequireAuth);
};
