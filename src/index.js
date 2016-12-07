import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import App, {NewsFeed, Stats, About} from './App';
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
    <Route path="/" component={App}>
      <IndexRoute component={App} />
    </Route>
  </Router>,  document.getElementById('root')
);

firebase.auth();