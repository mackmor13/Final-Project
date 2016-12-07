class Stats extends React.Component {
    render() {
        var stats = {
            happy: { counts: 0, sampleArticle: '' },
            sad: { counts: 0, sampleArticle: '' },
            wow: { counts: 0, sampleArticle: '' },
            neutral: { counts: 0, sampleArticle: '' },
            angry: { counts: 0, sampleArticle: '' }
        }
        var articlesRef = firebase.database().ref('articleUniqueIDs');
        articlesRef.on('value', (snapshot) => {
            snapshot.forEach(function (child) {
                stats[child.emotion].counts = stats[child.emotion].counts + 1;
                stats[child.emotion].sampleArticle = child.title //CHANGE THIS TO CURRENT PROPERTY
            })
        })

        var statRows = stats.map(function (emotion) {
            return <tr>
                <td>{emotion.key}</td>
                <td>{emotion.counts} </td>
                <td>{emotion.sampleArticle} </td>
            </tr>

        })


        return (
            <table className="table table-condensed table-striped">
                <thead>
                    <tr>
                        <th className="col-xs-1" aria-label="Emotions">Emotions</th>
                        <th className="col-xs-2" aria-label="Counts">Counts</th>
                        <th aria-label="Articles">Sample Articles</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td></td><td></td><td></td>
                    </tr>
                    <tr><td></td><td></td><td></td>
                    </tr>
                    <tr><td></td><td></td><td></td>
                    </tr>
                    <tr><td></td><td></td><td></td>
                    </tr>
                    <tr><td></td><td></td><td></td>
                    </tr>
                </tbody>
            </table>
        )
    }
}


class Legal extends React.Component {
    render() {
        return (
            <div>
                <p>
                    <blockquote>


                    </blockquote>
                </p>
            </div>
        )
    }
}