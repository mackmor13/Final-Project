// A static object used to refer to specific news feeds when using he api
var _SELECT_OPTIONS = {
    "categories": [{
        "value": "business",
        "label": "Business"
    }, {
        "value": "entertainment",
        "label": "Entertainment"
    }, {
        "value": "gaming",
        "label": "Gaming"
    }, {
        "value": "general",
        "label": "General"
    }, {
        "value": "music",
        "label": "Music"
    }, {
        "value": "scienceandnature",
        "label": "Scienceandnature"
    }, {
        "value": "sport",
        "label": "Sport"
    }, {
        "value": "technology",
        "label": "Technology"
    }, {
        "value": "Australia",
        "label": "Australia"
    }, {
        "value": "Germany",
        "label": "Germany"
    }, {
        "value": "India",
        "label": "India"
    }, {
        "value": "Italy",
        "label": "Italy"
    }, {
        "value": "UnitedKingdom",
        "label": "UnitedKingdom"
    }, {
        "value": "UnitedStates",
        "label": "UnitedStates"
    }],
    "sources": {
        "abcnewsau": {
            "value": "abcnewsau",
            "label": "ABC News (AU)"
        },
        "theguardianau": {
            "value": "theguardianau",
            "label": "The Guardian (AU)"
        },
        "bild": {
            "value": "bild",
            "label": "Bild"
        },
        "dertagesspiegel": {
            "value": "dertagesspiegel",
            "label": "Der Tagesspiegel"
        },
        "diezeit": {
            "value": "diezeit",
            "label": "Die Zeit"
        },
        "focus": {
            "value": "focus",
            "label": "Focus"
        },
        "gruenderszene": {
            "value": "gruenderszene",
            "label": "Gruenderszene"
        },
        "handelsblatt": {
            "value": "handelsblatt",
            "label": "Handelsblatt"
        },
        "spiegelonline": {
            "value": "spiegelonline",
            "label": "Spiegel Online"
        },
        "t3n": {
            "value": "t3n",
            "label": "T3n"
        },
        "wiredde": {
            "value": "wiredde",
            "label": "Wired.de"
        },
        "wirtschaftswoche": {
            "value": "wirtschaftswoche",
            "label": "Wirtschafts Woche"
        },
        "thehindu": {
            "value": "thehindu",
            "label": "The Hindu"
        },
        "thetimesofindia": {
            "value": "thetimesofindia",
            "label": "The Times of India"
        },
        "footballitalia": {
            "value": "footballitalia",
            "label": "Football Italia"
        },
        "bbcnews": {
            "value": "bbcnews",
            "label": "BBC News"
        },
        "bbcsport": {
            "value": "bbcsport",
            "label": "BBC Sport"
        },
        "businessinsideruk": {
            "value": "businessinsideruk",
            "label": "Business Insider (UK)"
        },
        "dailymail": {
            "value": "dailymail",
            "label": "Daily Mail"
        },
        "financialtimes": {
            "value": "financialtimes",
            "label": "Financial Times"
        },
        "fourfourtwo": {
            "value": "fourfourtwo",
            "label": "FourFourTwo"
        },
        "independent": {
            "value": "independent",
            "label": "Independent"
        },
        "metro": {
            "value": "metro",
            "label": "Metro"
        },
        "mirror": {
            "value": "mirror",
            "label": "Mirror"
        },
        "mtvnewsuk": {
            "value": "mtvnewsuk",
            "label": "MTV News (UK)"
        },
        "skynews": {
            "value": "skynews",
            "label": "Sky News"
        },
        "skysportsnews": {
            "value": "skysportsnews",
            "label": "Sky Sports News"
        },
        "talksport": {
            "value": "talksport",
            "label": "TalkSport"
        },
        "theeconomist": {
            "value": "theeconomist",
            "label": "The Economist"
        },
        "theguardianuk": {
            "value": "theguardianuk",
            "label": "The Guardian (UK)"
        },
        "theladbible": {
            "value": "theladbible",
            "label": "The Lad Bible"
        },
        "thesportbible": {
            "value": "thesportbible",
            "label": "The Sport Bible"
        },
        "thetelegraph": {
            "value": "thetelegraph",
            "label": "The Telegraph"
        },
        "arstechnica": {
            "value": "arstechnica",
            "label": "Ars Technica"
        },
        "associatedpress": {
            "value": "associatedpress",
            "label": "Associated Press"
        },
        "bloomberg": {
            "value": "bloomberg",
            "label": "Bloomberg"
        },
        "businessinsider": {
            "value": "businessinsider",
            "label": "Business Insider"
        },
        "buzzfeed": {
            "value": "buzzfeed",
            "label": "Buzzfeed"
        },
        "cnbc": {
            "value": "cnbc",
            "label": "CNBC"
        },
        "cnn": {
            "value": "cnn",
            "label": "CNN"
        },
        "engadget": {
            "value": "engadget",
            "label": "Engadget"
        },
        "entertainmentweekly": {
            "value": "entertainmentweekly",
            "label": "Entertainment Weekly"
        },
        "espn": {
            "value": "espn",
            "label": "ESPN"
        },
        "espncricinfo": {
            "value": "espncricinfo",
            "label": "ESPN Cric Info"
        },
        "fortune": {
            "value": "fortune",
            "label": "Fortune"
        },
        "foxsports": {
            "value": "foxsports",
            "label": "Fox Sports"
        },
        "googlenews": {
            "value": "googlenews",
            "label": "Google News"
        },
        "hackernews": {
            "value": "hackernews",
            "label": "Hacker News"
        },
        "ign": {
            "value": "ign",
            "label": "IGN"
        },
        "mashable": {
            "value": "mashable",
            "label": "Mashable"
        },
        "mtvnews": {
            "value": "mtvnews",
            "label": "MTV News"
        },
        "nationalgeographic": {
            "value": "nationalgeographic",
            "label": "National Geographic"
        },
        "newscientist": {
            "value": "newscientist",
            "label": "New Scientist"
        },
        "newsweek": {
            "value": "newsweek",
            "label": "Newsweek"
        },
        "newyorkmagazine": {
            "value": "newyorkmagazine",
            "label": "New York Magazine"
        },
        "nflnews": {
            "value": "nflnews",
            "label": "NFL News"
        },
        "polygon": {
            "value": "polygon",
            "label": "Polygon"
        },
        "recode": {
            "value": "recode",
            "label": "Recode"
        },
        "redditrall": {
            "value": "redditrall",
            "label": "Reddit /r/all"
        },
        "reuters": {
            "value": "reuters",
            "label": "Reuters"
        },
        "techcrunch": {
            "value": "techcrunch",
            "label": "TechCrunch"
        },
        "techradar": {
            "value": "techradar",
            "label": "TechRadar"
        },
        "thehuffingtonpost": {
            "value": "thehuffingtonpost",
            "label": "The Huffington Post"
        },
        "thenewyorktimes": {
            "value": "thenewyorktimes",
            "label": "The New York Times"
        },
        "thenextweb": {
            "value": "thenextweb",
            "label": "The Next Web"
        },
        "theverge": {
            "value": "theverge",
            "label": "The Verge"
        },
        "thewallstreetjournal": {
            "value": "thewallstreetjournal",
            "label": "The Wall Street Journal"
        },
        "thewashingtonpost": {
            "value": "thewashingtonpost",
            "label": "The Washington Post"
        },
        "time": {
            "value": "time",
            "label": "Time"
        },
        "usatoday": {
            "value": "usatoday",
            "label": "USA Today"
        }
    }
}