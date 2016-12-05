import React from 'react';
import { Link, hashHistory } from 'react-router';
//load LazyLoad for this module for generating the cards for each news article
import ReactCSSTransitionGroup from 'react-addons-css-transition-group' // ES6
import LazyLoad from 'react-lazy-load';
//load CSS for this module
import './css/index.css';
import './css/card.css';
import './css/animate.css';
import './css/Flat-UI-master/dist/css/flat-ui.css';
import { Button, Well, Collapse } from 'react-bootstrap';
/*global feednami*/
import $ from 'jquery';
import firebase from 'firebase';
import cheerio from 'cheerio';
import ReactHtmlParser from 'react-html-parser';
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

    signUp(email, password, preferredCategory, preferredFeed) {
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
        hashHistory.push('/login');
    }

    //how to display this component

    render() {

        var content = null;
        var navbar = null;
        if (!this.state.userId) {
            // content = <SignUpForm />;
            navbar = null;
        }
        else {
            // content = (this.props.children);
            // //content = <p>hey</p>;
            navbar = <ul>
                <li><a><Link to="/newsfeed" activeClassName="activeLink">News Feed</Link></a></li>
                <li><Link to="/stats" activeClassName="activeLink">Stats</Link></li>
                <li><Link to="/about" activeClassName="activeLink">About</Link></li>
                </ul>;
        }


        return (
            <div id="wrapper">


                <div className="container" role="banner" >


                    <h1>Better Than Reuters</h1>
                    <p>Come react with people</p>
                    {this.state.userId &&
                        <div>
                            <div className="logout">
                                <button className="btn btn-warning signout" onClick={() => this.signOut()}>Sign out {firebase.auth().currentUser.displayName}</button>
                            </div>
                            {navbar}
                        </div>
                    }

                </div>
                <div className="col-xs-9">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export class NewsFeed extends React.Component {
    
    componentDidMount() {
        //checks if firebase has a current user
        if (!firebase.auth().currentUser) {
            hashHistory.push('/login');
        }
    }
      
    render() {
        return <NewsFeed />
    }
}

export class Stats extends React.Component {

    componentDidMount() {
        //checks if firebase has a current user
        if (!firebase.auth().currentUser) {
            hashHistory.push('/login');
        }
    }
    render() {
        return<div><p>stats section</p></div>
    }

}

export class About extends React.Component {
    componentDidMount() {
        //checks if firebase has a current user
        if (!firebase.auth().currentUser) {
            hashHistory.push('/login');
        }
    }
    render() {
        return <div><p>about section</p></div>
    }
}

export default App; //make this class available to other files (e.g., index.js) 