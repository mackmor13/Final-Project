import React from 'react';
import { Link, hashHistory } from 'react-router';
//load LazyLoad for this module for generating the cards for each news article
//import ReactCSSTransitionGroup from 'react-addons-css-transition-group' // ES6
//import LazyLoad from 'react-lazy-load';
//load CSS for this module
// import './css/index.css';
// import './css/card.css';
// import './css/animate.css';
// import './css/Flat-UI-master/dist/css/flat-ui.css';
import { Button, Well, Collapse } from 'react-bootstrap';
/*global feednami*/
import $ from 'jquery';
import firebase from 'firebase';
//import cheerio from 'cheerio';
//import ReactHtmlParser from 'react-html-parser';
import SignUpForm from './join';
import SignInForm from './login';
//import Select from 'react-select';
//import './css/selection.css';


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
            
        navbar = <nav className="navbar navbar-inverse navbar-fixed-top" id="sidebar-wrapper" role="navigation">
                    <ul className="nav sidebar-nav">
                        <li className="sidebar-brand">
                            <Link to="/newsfeed" activeClassName="activeLink"  className="navOption" >
                            React News </Link>
                        </li>
                        <span> Sort News Feed by </span>
                        <li>
                            <Link className="navOption" >
                            All</Link>
                        </li>
                        <li>
                            <Link className="navOption" >
                            Happy</Link>
                        </li>
                        <li>
                            <Link className="navOption" >
                            Wow
                            </Link>
                        </li>
                        <li>
                            <Link className="navOption" >
                            Neutral</Link>
                        </li>
                        <li>
                            <Link className="navOption" >
                            Sad </Link>
                        </li>
                        <li>
                            <Link to="/stats" activeClassName="activeLink"  className="navOption" >
                            Angry </Link>
                        </li>
                        <span> Other Stuff </span>
                        <li>
                            <Link to="/stats" activeClassName="activeLink"  className="navOption" >
                            Statistics </Link>
                        </li>
                        <li>
                            <Link to="/newsfeed" activeClassName="activeLink"  className="navOption" >
                            About Us </Link>
                        </li>
                        <li onClick={() =>
                            this.signOut()}>
                            <Link className="navOption" >
                            Sign Out {firebase.auth().currentUser.preferredCategory} </Link>
                        </li>
                    </ul>
                    </nav>;
             }


        return (
                <div id="wrapper">

                    {this.state.userId &&
                            <div>
                            {navbar}

                            </div>

                        }

                        <div id="page-content-wrapper">
                                    
                                    <span>
                                    <button type="button" className="hamburger is-closed" data-toggle="offcanvas">
                                        <div className="hamburgerSize">
                                                <span className="hamb-top" />
                                                <span className="hamb-middle" />
                                                <span className="hamb-bottom" />
                                        </div>
                                    </button>
                                    </span>
                                    


                                     {this.props.children}

                        </div>

                </div>
            

        );
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