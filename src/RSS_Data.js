var _RSS_FEEDS = {
    Seattle: {
            SeattleTimes: {
            Name: "Seattle Times Political News",
            Description: "This is a news feed about Seattle politics ",
            RSSURL: 'http://www.seattletimes.com/politics/feed/'
        },
        SeattlePi: {
            Name: "Seattle pi",
            Description: "This is a news feed about local Seattle news",
            RSSURL: "http://www.seattlepi.com/local/feed/seattlepi-com-Local-News-218.php"
        }
    },
    NewYork: { 
        NewYorkTimes: {
            Name: "New York Times News",
            Description: "This is a news feed about the New York News",
            RSSURL: "http://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml"
        },
        NewYorkNBC: {
            Name: "NBC News",
            Description: "This is a news feed about New York local news",
            RSSURL: "http://www.seattlepi.com/local/feed/seattlepi-com-Local-News-218.php",
        }
    },
    LosAngeles: {
        NBCLosAngeles: {
            Name: "NBC Los Angeles",
            Description: "This is a news feed about local news in Los Angeles",
            RSSURL: "http://www.nbclosangeles.com/news/local/?rss=y&embedThumb=y&summary=y"
        }
     },
    SanFrancisco: {
        abc7news: {
            Name: "abc7News",
            Description: "SanFrancisco local news",
            RSSURL: "http://abc7news.com/feed/"
        }
     }
}

export default _RSS_FEEDS;
// Feednami 
// User selects an rss feed 
// goes to feednami (rss feed .rssurl )
// we get the object
// see if the object exists in firebase
// if it does not exists
// add four properties to the object - happy,sad,angry,neutral
// add the object to firebase
// according to the rss feed selected I am going to render my cards by calling the rss feed information on firebase
// if a user reacts to a news article  -  the emotion value for that article in firebase gets updated (a user cannot select more than one emotion to react with)