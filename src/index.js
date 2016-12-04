import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import App, {NewsFeed, Stats} from './App';
import Join from './join'
import Login from './login'
import firebase from 'firebase';

import 'bootstrap/dist/css/bootstrap.css';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAfwrtHv5IjhHux7o19pk5C9LR5gIqaKhs",
  authDomain: "reactnews-51fe8.firebaseapp.com",
  databaseURL: "https://reactnews-51fe8.firebaseio.com",
  storageBucket: "reactnews-51fe8.appspot.com",
  messagingSenderId: "620524973308"
};

firebase.initializeApp(config);

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App} >
      <Route path="join" component={Join} />
      <Route path="login" component={Login} />
      {/* <IndexRoute component={NewsFeed} />
      <Route path="newsfeed" component={NewsFeed} />
      <Route path="stats" component={Stats}*/}
    </Route>
  </Router>,  document.getElementById('root')
);

firebase.auth();