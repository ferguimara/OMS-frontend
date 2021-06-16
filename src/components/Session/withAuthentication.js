import React from 'react';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';

//construct a higher-order authentication component to then be exported throughout the app
const withAuthentication = Component => {
    //create the component and initialize the state
    class WithAuthentication extends React.Component {
        constructor(props) {
            super(props);
    
            this.state = {
            authUser: null,
            };
        }
    //detect if user is auth
    componentDidMount() {
        this.listener = this.props.firebase.auth.onAuthStateChanged(
          authUser => {
            authUser
              ? this.setState({ authUser })
              : this.setState({ authUser: null });
          },
        );
    }
    //detect if user unauths
    componentWillUnmount() {
        this.listener();
    }
    
    render() {
        //return the component with all of its props along with now the auth user props
        return (
            <AuthUserContext.Provider value={this.state.authUser}>
              <Component {...this.props} authUser={this.state.authUser} />
            </AuthUserContext.Provider>
        );
    }
  }
  
  return withFirebase(WithAuthentication);
};
 
export default withAuthentication;