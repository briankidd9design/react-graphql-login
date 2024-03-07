import React, { Component } from "react";
import AuthForm from "./AuthForm";
import { graphql } from "react-apollo";
import LoginMutation from "../mutations/Login";
import currentUserQuery from "../queries/CurrentUser";
// in order to execute the re-direct
import { hashHistory } from "react-router";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    // by making the errors state an empty array, we do not have to check if it is null and can just map over it right away
    this.state = { errors: [] };
  }
  // whenever our component is about to re-render, the below function will autmatically be called
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
  // destructuring out of the args object
  // whenever we call onSubmit, we have to call it with a property email and a property password as well.
  onSubmit({ email, password }) {
    // All the mutations that we write are all promises. They return a promise that gets resolved after the mutation has been completed
    this.props
      .mutate({
        variables: { email, password },
        // this response goes to every single component that is making use of the CurrentUserQuery including the header
        // The header automatically re-renders with the new data that has been fetched and when the user is logged in only the
        // logout button will appear
        refetchQueries: [{ query: currentUserQuery }],
        // the catch function will be called if the promise results in an error
      })
      // .catch((res) => {
      //   debugger;
      // });
      // 1. Describe a piece of state inside the component-level login form called errors defaulted to an empty array
      // 2. Pass that piece of state down into the AuthForm
      // 3. After we call the mutation, if there are any errors associated with the request, we will update the piece of state that will cause the entire component to re-render
      // 4. The new errors state will be passed down to the AuthForm, which will be responsible for rendering any errors to the form
      .catch((res) => {
        const errors = res.graphQLErrors.map((error) => error.message);
        this.setState({ errors: errors });
      });
  }
  render() {
    // callback to the Auth Form

    return (
      <div>
        <h3>Login</h3>
        <AuthForm
          errors={this.state.errors}
          onSubmit={this.onSubmit.bind(this)}
        />
      </div>
    );
  }
}
// export default graphql(LoginMutation)(LoginForm);
// We associated the query with the component
// As soon as the component gets updated, it will re-render with a set of props on this.props.data
export default graphql(currentUserQuery)(graphql(LoginMutation)(LoginForm));
