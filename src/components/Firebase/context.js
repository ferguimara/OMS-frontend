import React from 'react';
 
//Create Contect creates two components: 
//The FirebaseContect.Provider component is used to provide a Firebase instrance once at the top-level of React component tree
//The FirebaseContext.Consumer componend is used to retrieve the Firebase instance if it is needed in the React Component
const FirebaseContext = React.createContext(null);
 
export default FirebaseContext;