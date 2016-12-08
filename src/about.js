/* this is an introduction of react-news
    explains all the functionalities in the app
    and explains how it helps minority people
*/
import react from 'react';
import "./style.css";

class AboutUs extends React.Component {
    render() {
        return (
            <div>
                <h2>About React News</h2>
                <p>
                    Through this product,
                    <blockquote>
                        you can get the most up-to-date news from all of the world.
                        You can search by category, and then search by feed.
                        You can see all the news in cards with their summaires.
                        You can can go read the full article by clicking on the linked titles.
                        You can also express how you feel about the news by clicking on the emojis underneath the articles.
                        You can directly contact a representative by sending emails to them.
                        You can see how others think about this news by checking the color of the card or by the number of clicks under each emotion.
                        You can share the interesting news to Facebook.
                    </blockquote>
                    <blockquote>
                        Color of the card:
                    Yellow = Happy
                    Red    = Angry
                    Blue   = Sad
                    Teal   = Neutral
                    Purple = Wow
                    </blockquote>
                    This product benefits everyone who is interested in finding out what is going on in the world by getting the fastest news.
                    However, this is the most beneficial to <strong> minority people </strong> because:
                    <ol>
                        They can learn more about new policies that are related to their rights and how these policies would affect them.
                    They can talk about the unfaireness they see in politics by sending emails directly to representatives as well as
                    express their feelings to the general public about political news through reactions.
                    Politicians can find out how minority communities think about political topics related to them and adjust how they vote on laws
                    </ol>
                </p>

                <footer>
                    <span class="contentinfo-item">&copy; 2016 React News</span>
                    <p>Powered by <a href="https://newsapi.org" title="News API">News API</a></p>
                </footer>
            </div>
        )
    }
}

export default AboutUs;