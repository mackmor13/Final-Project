import React from 'react';
//load LazyLoad for this module for generating the cards for each news article
import ReactCSSTransitionGroup from 'react-addons-css-transition-group' // ES6
import LazyLoad from 'react-lazy-load';
//load CSS for this module
//import './css/style.css';
//import './css/animate.css';
import { Button, Well, Collapse } from 'react-bootstrap';
/*global feednami*/
/*Feednami is a package downloaded and used to collect RSS Feed data and then convert it from XML into JSON without cross domain errors*/
import './feednami-client.js';
import $ from 'jquery';
import firebase from 'firebase';
import cheerio from 'cheerio';
import ReactHtmlParser from 'react-html-parser';
import _RSS_FEEDS from './fb_obj_design'; 
import SignUpForm from './join';
import SignInForm from './login';

//Class which generates the entire application being created
class App extends React.Component {

    constructor(props) {
    super(props);
    this.state = { userId: null };
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ userId: user.uid });
      }
      else {
        this.setState({ userId: null });
      }
    })
  }
  signUp(email, password, preferredCategory, preferredFeed ) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(function (firebaseUser) {
        var profilePromise = firebaseUser.updateProfile({
          preferredCategory: preferredCategory,
          preferredFeed: preferredFeed
        });
        var userRef = firebase.database().ref('users/' + firebaseUser.uid);
        var userData = {
          preferredCategory: preferredCategory,
          preferredFeed: preferredFeed
        }
        var userPromise = userRef.set(userData);
        return Promise.all(profilePromise, userPromise);
      })
      .then(() => this.forceUpdate())
      .catch((err) => console.log(err));
  }
  signIn(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .catch((err) => console.log(err));
  }
  signOut() {
    firebase.auth().signOut();
  }

    //how to display this component

    render() {

        var content = null; 
        if (!this.state.userId) { 
            content = <SignUpForm signUpCallback={this.signUp} signInCallback={this.signIn} />;
        }
        else {
            //content = (this.props.children);
            content = (this.props.children);
        }


        return (
           <div id="wrapper">
      
                <div className="col-xs-9">
                    {content}
                </div>
                   <div className="container" role="banner" >

        
            <h1>Better Than Reuters</h1>
            <p>Come react with people</p>
            {this.state.userId &&
              <div className="logout">
                <button className="btn btn-warning signout" onClick={() => this.signOut()}>Sign out {firebase.auth().currentUser.displayName}</button>
              </div>
            }
            <ul>
            <li>Home</li>
            <li>Stats</li>
            <li>About</li>
            <li>Delete History</li>
            <li>Legal</li>
            </ul>
          </div>
           </div>
        );
    }
}


export default App; //make this class available to other files (e.g., index.js)