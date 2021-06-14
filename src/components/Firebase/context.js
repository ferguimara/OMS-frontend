import React from 'react';
 
/* ***Used to provide a Firebase instance to entire application  */

//Create Context creates two components: 
//The FirebaseContect.Provider component is used to provide a Firebase instrance once at the top-level of React component tree
//The FirebaseContext.Consumer componend is used to retrieve the Firebase instance if it is needed in the React Component
const FirebaseContext = React.createContext(null);


//wrapping a component with firebasecontext.consumer to give it access to all state
export const withFirebase = Component => props => (
    <FirebaseContext.Consumer>
      {firebase => <Component {...props} firebase={firebase} />}
    </FirebaseContext.Consumer>
);
 
export default FirebaseContext;