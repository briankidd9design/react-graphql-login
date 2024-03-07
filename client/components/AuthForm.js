import React, { Component } from "react";

class AuthForm extends Component {
  // we will have to forms of state: The email and the password
  // as the user updates each individual input, we will update those piece of state
  constructor(props) {
    super(props);

    this.state = { email: "", password: "" };
  }
  onSubmit(event) {
    event.preventDefault();
    // now we want to call the prop this.props.onSubmit being passdown by the AuthForm
    this.props.onSubmit(this.state);
    // const { email, password } = this.state;
    // this.onSubmit({ email, password });
  }
  render() {
    return (
      <div className="row">
        {/* <form onSubmit={this.onSubmit.bind(this)} className="col s6"> */}
        {/* this.onSubmit is referring to a helper inside the Auth form */}
        {/* form onSubmit= is completely independent and not related to the at helper function in the LoginForm */}
        {/* <form onSubmit={this.onSubmit.bind(this)} className="col s6"> */}
        {/* <form onSubmit={this.onSubmit.bind(this)} className="col s6"> */}
        {/* you can also use an arrow function like below to bind to the class. It's pretty cool yet can be a bit confusing. Internalize it as much as possible */}
        <form onSubmit={(event) => this.onSubmit(event)} className="col s6">
          <div className="input-field">
            <input
              style={
                this.props.errors.length > 0
                  ? { borderBottom: "2px solid rgb(255, 0, 0)" }
                  : {}
              }
              placeholder="Email"
              value={this.state.email}
              //   as the user types setState is called and the email is updated, this causese the component to re-render and the input will be updated with the new value of this.state.email
              onChange={(e) => this.setState({ email: e.target.value })}
            />
          </div>
          <div className="input-field">
            <input
              style={
                this.props.errors.length > 0
                  ? { borderBottom: "2px solid rgb(255, 0, 0)" }
                  : {}
              }
              placeholder="Password"
              // makes sure password is obscured by dots
              type="password"
              value={this.state.password}
              onChange={(e) => this.setState({ password: e.target.value })}
            />
          </div>
          <div className="errors">
            {this.props.errors.map((error) => (
              <div key={error}>{error}</div>
            ))}
          </div>

          <button className="btn">Submit</button>
        </form>
      </div>
    );
  }
}

export default AuthForm;
