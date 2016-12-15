/* this is an introduction of react-news
    explains all the functionalities in the app
    and explains how it helps minority people
*/
import React from 'react';
import firebase from 'firebase';
import './style.css';
import { Link, hashHistory } from 'react-router';


class AboutUs extends React.Component {
    componentDidMount() {
        //checks if firebase has a current user
        if (!firebase.auth().currentUser) {
            hashHistory.push('/login');
        }
    }

    render() {
        return (
            <div>
                <h2 className="aboutTitle">About React News</h2>
                <p id="p1">
                    Through this product,
                    </p>
                <ol>
                        <li>You can get the most up-to-date news from all of the world.</li>
                        <li>You can search by category, and then search by feed.</li>
                        <li>You can see all the news in cards with their summaires.</li>
                        <li>You can can go read the full article by clicking on the linked titles.</li>
                        <li>You can also express how you feel about the news by clicking on the emojis underneath the articles.</li>
                        <li>You can directly contact a representative by sending emails to them.</li>
                        <li>You can see how others think about this news by checking the color of the card or by the number of clicks under each emotion.</li>
                        <li>You can share the interesting news to Facebook.</li>
                    </ol>

                <p className="aboutInfoCard">Color of the card:</p>
                <ol>
                    <li>Yellow = <span className="yellow">Happy</span></li>
                    <li>Red    = <span className="red">Angry</span></li>
                    <li>Blue   = <span className="blue">Sad</span></li>
                    <li>Purple   = <span className="purple">Wow</span></li>
                    <li>Teal   = <span className="teal">Neutral</span></li>
                </ol>

                <p className="aboutInfoParagraph">
                    This product benefits everyone who is interested in finding out what is going on in the world by getting the fastest news.
                    However, this is the most beneficial to <strong> minority people </strong> because:
                    </p>
                <ol>
                    They can learn more about new policies that are related to their rights and how these policies would affect them.
                    They can talk about the unfaireness they see in politics by sending emails directly to representatives as well as
                    express their feelings to the general public about political news through reactions.
                    Politicians can find out how minority communities think about political topics related to them and adjust how they vote on laws
                    </ol>
                <footer>
                    <span className="contentinfo-item">&copy; 2016 React News</span>
                    <p>Powered by <a href="https://newsapi.org" title="News API">News API</a></p>
                </footer>
            </div>
        )
    }
}

export default AboutUs;