Skip to content
This repository
Search
Pull requests
Issues
Gist
 @mackmor13
 Watch 2
  Star 0
 Fork 0 mackmor13/finalProject
 Code  Issues 0  Pull requests 0  Projects 0  Wiki  Pulse  Graphs  Settings
Branch: resubmission Find file Copy pathfinalProject/src/stats.js
15f89f9  13 minutes ago
@jtpraino jtpraino removed firebase work from render in stats.js
2 contributors @jtpraino @mackmor13
RawBlameHistory     
61 lines (54 sloc)  2.04 KB
import React from 'react';
import './style.css';
import firebase from 'firebase';
import emoji from "../public/img/emoji.jpg";

class Stats extends React.Component {

    constructor(props) {
        super(props);
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
        var statRows = Object.keys(stats).map(function (emotion) {
            return <tr>
                <td>{emotion}</td>
                <td>{stats[emotion].count} </td>
                <td>{stats[emotion].sampleArticle}</td>
            </tr>
        })
        this.state = {statRows:statRows}

    }


    render() {

        return (
            <div>
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
Contact GitHub API Training Shop Blog About
© 2016 GitHub, Inc. Terms Privacy Security Status Help