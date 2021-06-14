import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
 
import { SignUpLink } from '../SignUp/SignUp';
import { PasswordForgetLink } from '../PasswordForget/PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
 
const SignInPage = () => (
  <div>
    <h1>Sign In</h1>
    <SignInForm />
    <PasswordForgetLink />
    <SignUpLink />
  </div>
);
 
//Initialize State of the Component:
const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

//create our component
class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    //initialize state
    this.state = { ...INITIAL_STATE };
  }
 
  /* ***Functions*** */

  //the onSubmit() class method, which will pass all the form data to the Firebase authentication API via your authentication interface in the Firebase class:
  onSubmit = event => {
    //deconstructing our local state into variables
    const { email, password } = this.state;
    
    //use our firebase method from class to create a user
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });
 
    event.preventDefault();
  };
 
  //updating the local state with what is in input fields
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
 
  render() {
    //our local state
    const { email, password, error } = this.state;
    
    //use an isInvalid boolean to enable or disable the submit button
    const isInvalid = password === '' || email === '';
 
    //Return all our our input functions
    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <button disabled={isInvalid} type="submit">
          Sign In
        </button>
 
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}
 
const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);
 
export default SignInPage;
 
export { SignInForm };