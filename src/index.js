
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import App from './App';

import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(
   <Router history={hashHistory}>
    <Route path="/" component={App}>
      {<IndexRoute component={App} />/*
      <Route path="channels" component={MainPage} />
      <Route path="channel/:name" component={MessageList} />
      <Route path="login" component={SignInForm} />
      <Route path="join" component={SignUpForm} />*/}
    </Route>
  </Router>,
  document.getElementById('root')
);