import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import App from './App';
import firebase from 'firebase';
import SignUpForm from './signup';
import SignInForm from './login';

import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDADRuBNTKL9k68ezcRssLOsSrWY8maeqE",
  authDomain: "info-343a-final.firebaseapp.com",
  databaseURL: "https://info-343a-final.firebaseio.com",
  storageBucket: "info-343a-final.appspot.com",
  messagingSenderId: "327840590763"
};
firebase.initializeApp(config);

ReactDOM.render(
   <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={App} />
      {/*<Route path="channels" component={MainPage} />
      <Route path="channel/:name" component={MessageList} />
      <Route path="login" component={SignInForm} />
      <Route path="join" component={SignUpForm} />*/}
    </Route>
  </Router>,
  document.getElementById('root')
);