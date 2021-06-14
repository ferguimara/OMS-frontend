import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//Providing a Firebase instance to full app
import Firebase, { FirebaseContext } from './components/Firebase/index';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      {/* providing our context to our top level component. we can now access this whenever via firebasecontext.consumer */}
      <FirebaseContext.Provider value={new Firebase()}>
        <App />
      </FirebaseContext.Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
