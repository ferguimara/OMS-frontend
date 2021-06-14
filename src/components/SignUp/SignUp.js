import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
 
const SignUpPage = () => (
  <div>
    <h1>Sign Up</h1>
    <SignUpForm />
  </div>
);


//Initialize State of the Component:
const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
};
 
//create our component
class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    //initialize state
    this.state = { ...INITIAL_STATE };
  }
  
  /* ***Functions*** */

  //the onSubmit() class method, which will pass all the form data to the Firebase authentication API via your authentication interface in the Firebase class:
  onSubmit = event => {
    //deconstructing our local state into variables
    const { username, email, passwordOne } = this.state;
    
    //use our firebase method from class to create a user
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        return this.props.firebase
          .user(authUser.user.uid)
          .set({
            username,
            email,
          });
      })
      //set state back to initital state of empty fields
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      //display error if error
      .catch(error => {
        this.setState({ error });
        });
      
      //prevent page refreach
      event.preventDefault();
    };
 
  //updating the local state with what is in input fields
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
 
  render() {
    //our local state 
    const {
        username,
        email,
        passwordOne,
        passwordTwo,
        error,
    } = this.state;

    //use an isInvalid boolean to enable or disable the submit button
    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    //Return all our our input functions
    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Full Name"
        />
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
        />
        {/* disable button if isInvalid is false */}
        <button disabled={isInvalid} type="submit" style={{textDecoration: 'underline !important'}}>
            Sign Up
        </button>

        {/* optional error message from an error object. The error objects from Firebase have this message property by default, so you can rely on it to display the proper text for your application's user. */}
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}
 
const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP} style={{textDecoration: 'underline', color: 'blue'}}>Sign Up</Link>
  </p>
);

//We use compose as a better way to wrap componenet with high-order components
//wrap our signupform with 'withfirebase', 'withrouter'(to get access to all router props) which is what is rendered
const SignUpForm = compose(
    withRouter,
    withFirebase,
)(SignUpFormBase);
 
export default SignUpPage;
 
export { SignUpForm, SignUpLink };