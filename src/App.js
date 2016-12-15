import React from 'react';
import { Link, hashHistory } from 'react-router';
import { Button, Well, Collapse } from 'react-bootstrap';
import $ from 'jquery';
import firebase from 'firebase';
import SignUpForm from './join';
import SignInForm from './login';
import { Header, Drawer, Navigation, Layout } from 'react-mdl';

/* basic sturucture of this website
    it shows navigation bar when the user is signed in*/
class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = { user: null };
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({ user: user });
            }
            else {
                this.setState({ user: null });
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
            .catch((err) => alert(err));
    }

    signIn(email, password) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .catch((err) => alert(err));
    }

    signOut() {
        firebase.auth().signOut();
        hashHistory.push('/login');
    }

    render() {

        const style = { height: '53rem', position: 'relative' }
        const color = { background: '#d0d0d0 center / cover' };


        return (
            <div style={style}>
                {this.state.user &&
                    <Layout style={color}>
                        <Header transparent title={"React-news"} >
                        </Header>
                        <Drawer className="drawer" aria-label="List" title="React-news" >
                            <Navigation>
                                <Link aria-label="Main page" aria-role="button" to="/newsfeed" activeClassName="activeLink">News</Link>
                                <Link aria-label="About Page" aria-role="button" to="/about" activeClassName="activeLink">About Us</Link>
                                <Link aria-label="Statistics Page" aria-role="button" to="/stats" activeClassName="activeLink">Statistics</Link>

                                <div className="logout">
                                    <button aria-label="Logout" aria-role="button" className="btn btn-warning" onClick={() => this.signOut()}>Sign out</button>
                                </div>
                            </Navigation>
                        </Drawer>

                        <main className="container">
                            {this.props.children}
                        </main>
                    </Layout>
                }
                {!this.state.user && //for sign in and sign up page
                    <Layout style={color}>
                        <Header transparent title="React-news" >
                        </Header>

                        <main className="container">
                            {this.props.children}
                        </main>
                    </Layout>
                }


            </div>


        );
    }
}


//gives statistics about emotion distributions in news aricle database
export class Stats extends React.Component {

    componentDidMount() {
        //checks if firebase has a current user
        if (!firebase.auth().currentUser) {
            hashHistory.push('/login');
        }
    }
    render() {
        return <div><p>stats section</p></div>
    }

}
// gives an detailed introduction of this website and all the functionalities it has
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