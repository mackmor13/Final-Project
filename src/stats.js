import React from 'react';
import './style.css';
import firebase from 'firebase';
import emoji from "../public/img/emoji.jpg";

class Stats extends React.Component {
    constructor(props) {
        super(props);
        // looks at every article on firebase with emotions associated and tallies the total emotions
        // is complete once a tally of all emotions every created have been accounted forEach
        // these counts appear on the statistics page
        var mostRef = firebase.database().ref('articles');
        var stats = {
            wow: { count: 0, sampleArticle: '' },
            happy: { count: 0, sampleArticle: '' },
            neutral: { count: 0, sampleArticle: '' },
            angry: { count: 0, sampleArticle: '' },
            sad: { count: 0, sampleArticle: '' },
        }

        mostRef.on('value', (snapshot) => {
            snapshot.forEach(function (child) {
                var article = child.val();
                if (article.emotion && article.emotion != '') {
                    stats[article.emotion].count = stats[article.emotion].count + 1;
                    stats[article.emotion].sampleArticle = <strong><a href={article.url} target="_blank" className='linkArticle'>{article.title}</a></strong>
                }
            })
        })
        // Put the statistics into a readable format
        var statRows = Object.keys(stats).map(function (emotion) {
            return <tr>
                <td>{emotion}</td>
                <td>{stats[emotion].count} </td>
                <td>{stats[emotion].sampleArticle}</td>
            </tr>
        })
        this.state = { statRows: statRows }
    }



    render() {

        var mostRef = firebase.database().ref('articles');


        return (
            <div>
                <p>This table shows both the most popular articles as well as the amount of reactions for each emotion.
                You can use this table to find our top trending articles as well as get a sense of the general
                public's sentiment towards the news. </p>
                <table className="table table-condensed table-striped">
                    <thead>
                        <tr>
                            <th className="col-xs-1" aria-label="Emotions">Emotions</th>
                            <th className="col-xs-2" aria-label="Counts">Counts</th>
                            <th aria-label="Articles">Sample Articles</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.statRows}
                    </tbody>
                </table>
                <img src={emoji} alt="emotion" />
            </div>
        )
    }
}

export default Stats;