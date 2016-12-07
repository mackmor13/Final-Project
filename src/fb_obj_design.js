var _RSS_FEEDS = {
    article_count: 10,
    
    article_urls:   {   "http://www.seattletimes.com/seattle-news/politics/bernie-sanders-urges-seattle-progressives-to-stand-up-fight-back/?utm_source=RSS&utm_medium=Referral&utm_campaign=RSS_politics": 0, 
                        "http://www.seattletimes.com/seattle-news/politics/washington-state-electors-join-movement-seeking-to-deny-trump-the-presidency/?utm_source=RSS&utm_medium=Referral&utm_campaign=RSS_politics": 1,
                        "http://www.seattlepi.com/local/crime/article/Charge-Teen-lit-Shoreline-girl-s-house-on-fire-10645834.php": 2,
                        "http://www.seattlepi.com/local/komo/article/Bundle-up-climbers-Mt-Rainier-weather-on-par-10644703.php": 3,
                        "http://www.seattlepi.com/local/komo/article/Not-guilty-plea-in-kidnapping-murder-of-10645222.php": 4,
                        "http://www.nytimes.com/2016/11/30/business/dealbook/trumps-economic-cabinet-picks-signal-embrace-of-wall-st-elite.html?partner=rss&emc=rss": 5,
                        "http://www.nytimes.com/2016/12/01/us/politics/donald-trump-transition.html?partner=rss&emc=rss": 6,
                        "http://www.nytimes.com/2016/11/30/us/charlotte-officer-acted-lawfully-in-fatal-shooting-of-keith-scott.html?partner=rss&emc=rss": 7,
                        "http://abc7news.com/news/buzz-aldrin-medically-evacuated-from-south-pole/1634147/": 8,
                        "http://abc7news.com/traffic/bart-board-to-vote-on-$267m-retrofit-for-transbay-tube/1634135/": 9,
                        "http://www.nytimes.com/2016/11/30/us/michael-slager-walter-scott-killing.html?partner=rss&emc=rss": 10
                    },
    categories: {
        Seattle: 'Seattle',
        NewYork: 'NewYork',
        LosAngeles: 'LosAngeles',
        SanFrancisco: 'SanFrancisco'
    },

    Seattle: {SeattleTimes: 'http://www.seattletimes.com/politics/feed/', SeattlePi: "http://www.seattlepi.com/local/feed/seattlepi-com-Local-News-218.php"},
    NewYork: {NewYorkTimes: "http://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml", NewYorkNBC: "http://www.seattlepi.com/local/feed/seattlepi-com-Local-News-218.php"},
    LosAngeles: {NBCLosAngeles: "http://www.nbclosangeles.com/news/local/?rss=y&embedThumb=y&summary=y"},
    SanFrancisco: {abc7news: "http://abc7news.com/feed/"},
    
    SeattleTimes: [0, 1],
    SeattlePi: [2, 4],
    NewYorkTimes: [5, 6],
    NewYorkNBC: [3],
    NBCLosAngeles: [7,10],
    abc7news: [8, 9],

    '0': {title: 'title', description: 'description', imgurl: 'url', link: 'link', date: 'timestamp', location: 'location', wow: 0, happy: 0, neutral: 0, sad: 0, angry: 0},
    '1': {title: 'title', description: 'description', imgurl: 'url', link: 'link', date: 'timestamp', location: 'location', wow: 0, happy: 0, neutral: 0, sad: 0, angry: 0},
    '2': {title: 'title', description: 'description', imgurl: 'url', link: 'link', date: 'timestamp', location: 'location', wow: 0, happy: 0, neutral: 0, sad: 0, angry: 0},
    '3': {title: 'title', description: 'description', imgurl: 'url', link: 'link', date: 'timestamp', location: 'location', wow: 0, happy: 0, neutral: 0, sad: 0, angry: 0},
    '4': {title: 'title', description: 'description', imgurl: 'url', link: 'link', date: 'timestamp', location: 'location', wow: 0, happy: 0, neutral: 0, sad: 0, angry: 0},
    '5': {title: 'title', description: 'description', imgurl: 'url', link: 'link', date: 'timestamp', location: 'location', wow: 0, happy: 0, neutral: 0, sad: 0, angry: 0},
    '6': {title: 'title', description: 'description', imgurl: 'url', link: 'link', date: 'timestamp', location: 'location', wow: 0, happy: 0, neutral: 0, sad: 0, angry: 0},
    '7': {title: 'title', description: 'description', imgurl: 'url', link: 'link', date: 'timestamp', location: 'location', wow: 0, happy: 0, neutral: 0, sad: 0, angry: 0},
    '8': {title: 'title', description: 'description', imgurl: 'url', link: 'link', date: 'timestamp', location: 'location', wow: 0, happy: 0, neutral: 0, sad: 0, angry: 0},
    '9': {title: 'title', description: 'description', imgurl: 'url', link: 'link', date: 'timestamp', location: 'location', wow: 0, happy: 0, neutral: 0, sad: 0, angry: 0},
    '10': {title: 'title', description: 'description', imgurl: 'url', link: 'link', date: 'timestamp', location: 'location', wow: 0, happy: 0, neutral: 0, sad: 0, angry: 0},
   
    users:  {   hash1: {username: 'boJack', email: 'horse@man.com'},
                hash2: {username: 'boMack', email: 'jorse@man.com'},
                hash3: {username: 'boFlack', email: 'slorse@man.com'}
            },

    hash1: {'0': 'happy', '6': 'wow', '4': 'angry'},
    hash2: {'4': 'angry', '7': 'wow'},
    hash3: {'9': 'sad', '5': 'sad', '7': 'sad'}
}