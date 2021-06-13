import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
 
const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

class Firebase {
    constructor() {
      app.initializeApp(config);

      this.auth = app.auth();
      this.db = app.database();
    }

    // *** Aut API ***

    //sign up function (registration) takes email and password parameters 
    //for its function signature and uses an official Firebase API endpoint to create a user:
    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    //set up the login/sign-in function, which takes email and password parameters
    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    //case of the sign out function, you don't need to pass any argument to it, because Firebase knows about the currently authenticated user
    doSignOut = () => this.auth.signOut();

    //Reset and Change password for authenticated user:
    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
 
    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);

    // *** User Api ***

    user = uid => this.db.ref(`users/${uid}`);
 
    users = () => this.db.ref('users');
}
 
export default Firebase;