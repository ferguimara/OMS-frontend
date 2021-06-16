import React, { Component } from 'react';
import { Link } from 'react-router-dom';
 
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
 
//render page
const PasswordForgetPage = () => (
  <div>
    <h1>PasswordForget</h1>
    <PasswordForgetForm />
  </div>
);

//initialize state
const INITIAL_STATE = {
  email: '',
  error: null,
};

//create component
class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);
 
    this.state = { ...INITIAL_STATE };
  }
  
  //functions:

  onSubmit = event => {
    const { email } = this.state;
 
    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });
 
    event.preventDefault();
  };
 
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  
  //render
  render() {
    const { email, error } = this.state;
 
    const isInvalid = email === '';
 
    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="email"
          value={this.state.email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <button disabled={isInvalid} type="submit">
          Forgot My Password
        </button>
 
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

//password forget link to be used elsewhere
const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET} style={{textDecoration: 'underline', color: 'blue'}}>Forgot Password?</Link>
  </p>
);
 
export default PasswordForgetPage;

//modify component to be wraped with firebase and then use above
const PasswordForgetForm = withFirebase(PasswordForgetFormBase);
 
export { PasswordForgetForm, PasswordForgetLink };