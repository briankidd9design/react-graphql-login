import React, { Component } from "react";
import { graphql } from "react-apollo";
import { Link } from "react-router";
import CurrentUserQuery from "../queries/CurrentUser";
import mutation from "../mutations/Logout";

class Header extends Component {
  // 1. update JSX to use css and make the header look more aesthetically pleasing
  // 2. Add a helper method that will determine what set of buttons we should display
  onLogoutClick() {
    // use the refetchQueries help to re-render the component
    // rerun all the queries that the mutation affected
    // then all the components that are associated with a given query will automatically update inside of our application
    this.props.mutate({
      refetchQueries: [{ query: CurrentUserQuery }],
    });
  }
  renderButtons() {
    const { loading, user } = this.props.data;
    if (loading) {
      return <div />;
    }
    if (user) {
      // call a mutation to log the user out, and then navigate the user back to the root of the application
      // Create a clickable item
      // Create an event handler that will call a mutation to log the user out
      // 1. import the logout mutation
      // 2. Associate the mutation with the component
      // 3. Enter the mutation into the helper function
      // 4. Show the signup and login buttons
      return (
        <li>
          <a onClick={this.onLogoutClick.bind(this)}>Logout </a>
        </li>
      );
    } else {
      return (
        <div>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </div>
      );
    }
  }
  render() {
    // the result of the query will always exist on this.props.data
    // console.log(this.props.data);
    return (
      <nav>
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo left">
            Home
          </Link>
          <ul className="right">{this.renderButtons()}</ul>
        </div>
      </nav>
    );
  }
}
// Run this query, look at the result of the query and then decide whether or not we want to show a set of buttons that allow the user to logout or navigate to a form to login or sign up to the application
// export default graphql(CurrentUserQuery)(Header);
export default graphql(mutation)(graphql(CurrentUserQuery)(Header));
