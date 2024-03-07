import React, { Component } from "react";
import AuthForm from "./AuthForm";
// GraphQL helper
import { graphql } from "react-apollo";
import SignupMutation from "../mutations/Signup";
import currentUserQuery from "../queries/CurrentUser";
import { hashHistory } from "react-router";

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = { errors: [] };
  }
  componentWillUpdate(nextProps) {
    // nextProps is the props object that will be placed on our component the next time that it re-renders, or as it is just about to update
    // this.props - the old, current set of props
    // nextProps the next set of props that will be in place when the component re-renders
    // the current user will be available on the nextProps
    console.log(this.props, nextProps);
    // if the user did not exist before, but now the user does
    // or if the user was not signed in before but now is
    if (!this.props.data.user && nextProps.data.user) {
      // redirect to dashboard
      hashHistory.push("/dashboard");
    }
  }
  // add a callback function and pass it
  // 1. Add a helper function to the signup form
  // 2. pass that helper function into the Auth form
  // _________________________________________________________
  // We have to handle any errors that result in he mutation
  // We need to make sure we re-run our CurrentUserQuery after the mutation is complete
  // After our mutation runs we force our user over the the dashboard component
  onSubmit({ email, password }) {
    this.props
      .mutate({
        variables: { email, password },

        refetchQueries: [{ query: currentUserQuery }],
      })
      .catch((res) => {
        const errors = res.graphQLErrors.map((error) => error.message);
        this.setState({ errors: errors });
      });
  }
  render() {
    return (
      <div>
        <h3>Signup</h3>
        <AuthForm
          errors={this.state.errors}
          onSubmit={this.onSubmit.bind(this)}
        />
      </div>
    );
  }
}
export default graphql(currentUserQuery)(graphql(SignupMutation)(SignupForm));
