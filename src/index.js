import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import App, { Stats, About} from './App';
import NewsFeed from './newsFeed'
import Join from './join'
import Login from './login'
import firebase from 'firebase';
//load CSS for this module
// import './css/index.css';
// import './css/card.css';
// import './css/animate.css';
// import './css/Flat-UI-master/dist/css/flat-ui.css';

// import 'bootstrap/dist/css/bootstrap.css';
//import require bootstrap components such as button, well, collapse
import { Button, Well, Collapse } from 'react-bootstrap';

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
      <IndexRoute component={NewsFeed} />
      <Route path="join" component={Join} />
      <Route path="login" component={Login} />
      <Route path="newsfeed" component={NewsFeed} />
      <Route path="stats" component={Stats} />
      <Route path="about" component={About} />

    </Route>
  </Router>,  document.getElementById('root')
);

firebase.auth();