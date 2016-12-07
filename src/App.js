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
import { Header, Drawer, Navigation, Layout } from 'react-mdl';
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

        const style = {height: '53rem', position: 'relative'}


        return (
                            <div style={style}>
                                {
                                <Layout style={{background: 'url(http://eskipaper.com/images/free-city-background-2.jpg) center / cover'}}>                                
                                <Header transparent title={"React-news"}>
                                </Header>
                                <Drawer aria-label="List" title="React-news">
                                <Navigation>
                                    <Link aria-label="Main page" to="/newsfeed" activeClassName="activeLink">News</Link>
                                    <Link aria-label="Main page" to="/emotion/happy" activeClassName="activeLink">Happy</Link>
                                    <Link aria-label="Main page" to="/emotion/sad" activeClassName="activeLink">Sad</Link>
                                    <Link aria-label="Main page" to="/emotion/wow" activeClassName="activeLink">Wow</Link>
                                    <Link aria-label="Main page" to="/emotion/neutral" activeClassName="activeLink">Neutral</Link>
                                    <Link aria-label="Main page" to="/emotion/angry" activeClassName="activeLink">Angry</Link>
                                    <Link aria-label="Main page" to="/about" activeClassName="activeLink">About Us</Link>
                                    <Link aria-label="Main page" to="/stats" activeClassName="activeLink">Statistics</Link>

                                    <div className="logout">
                                    <button aria-label="Logout" className="btn btn-warning" onClick={() => this.signOut()}>Sign out</button>
                                    </div>
                                </Navigation>
                                </Drawer>

                                <main className="container">
                                {this.props.children}
                                </main>
                            </Layout>
                            }
                            {/*!this.state.userId && //for sign in and sign up page
                            <Layout fixedHeader>
                                <Header title="KcalS">
                                </Header>

                                <main className="container">
                                {this.props.children}
                                </main>
                            </Layout>*/
                            }


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