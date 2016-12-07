import React from 'react';
import firebase from 'firebase';
import { Link, hashHistory } from 'react-router';
//load CSS for this module
// import './css/index.css';
// import './css/card.css';
// import './css/animate.css';
// import './css/Flat-UI-master/dist/css/flat-ui.css';
import Select from 'react-select';
//import './css/selection.css';
import NewsFeedController from './newsFeedDataController.js';

//import require bootstrap components such as button, well, collapse
import { Button, Well, Collapse } from 'react-bootstrap';

//Options Object for Select 
var _NEWS_FEEDS_INFORMATION = {
"categories": {
       "Australia": {
      "abcnewsau": "abc-news-au",
      "theguardianau": "the-guardian-au"
    },
    "Germany": {
      "bild": "bild",
      "dertagesspiegel": "der-tagesspiegel",
      "diezeit": "die-zeit",
      "focus": "focus",
      "gruenderszene": "gruenderszene",
      "handelsblatt": "handelsblatt",
      "spiegelonline": "spiegel-online",
      "t3n": "t3n",
      "wiredde": "wired-de",
      "wirtschaftswoche": "wirtschafts-woche"
    },
    "India": {
      "thehindu": "the-hindu",
      "thetimesofindia": "the-times-of-india"
    },
    "Italy": {
      "footballitalia": "football-italia"
    },
    "UnitedKingdom": {
      "bbcnews": "bbc-news",
      "bbcsport": "bbc-sport",
      "businessinsideruk": "business-insider-uk",
      "dailymail": "daily-mail",
      "financialtimes": "financial-times",
      "fourfourtwo": "four-four-two",
      "independent": "independent",
      "metro": "metro",
      "mirror": "mirror",
      "mtvnewsuk": "mtv-news-uk",
      "skynews": "sky-news",
      "skysportsnews": "sky-sports-news",
      "talksport": "talksport",
      "theeconomist": "the-economist",
      "theguardianuk": "the-guardian-uk",
      "theladbible": "the-lad-bible",
      "thesportbible": "the-sport-bible",
      "thetelegraph": "the-telegraph"
    },
    "UnitedStates": {
      "arstechnica": "ars-technica",
      "associatedpress": "associated-press",
      "bloomberg": "bloomberg",
      "businessinsider": "business-insider",
      "buzzfeed": "buzzfeed",
      "cnbc": "cnbc",
      "cnn": "cnn",
      "engadget": "engadget",
      "entertainmentweekly": "entertainment-weekly",
      "espn": "espn",
      "espncricinfo": "espn-cric-info",
      "fortune": "fortune",
      "foxsports": "fox-sports",
      "googlenews": "google-news",
      "hackernews": "hacker-news",
      "ign": "ign",
      "mashable": "mashable",
      "mtvnews": "mtv-news",
      "nationalgeographic": "national-geographic",
      "newscientist": "new-scientist",
      "newsweek": "newsweek",
      "newyorkmagazine": "new-york-magazine",
      "nflnews": "nfl-news",
      "polygon": "polygon",
      "recode": "recode",
      "redditrall": "reddit-r-all",
      "reuters": "reuters",
      "techcrunch": "techcrunch",
      "techradar": "techradar",
      "thehuffingtonpost": "the-huffington-post",
      "thenewyorktimes": "the-new-york-times",
      "thenextweb": "the-next-web",
      "theverge": "the-verge",
      "thewallstreetjournal": "the-wall-street-journal",
      "thewashingtonpost": "the-washington-post",
      "time": "time",
      "usatoday": "usa-today"
    },
    "business": {
      "bloomberg": "bloomberg",
      "businessinsider": "business-insider",
      "businessinsideruk": "business-insider-uk",
      "cnbc": "cnbc",
      "diezeit": "die-zeit",
      "financialtimes": "financial-times",
      "fortune": "fortune",
      "handelsblatt": "handelsblatt",
      "theeconomist": "the-economist",
      "thewallstreetjournal": "the-wall-street-journal",
      "wirtschaftswoche": "wirtschafts-woche"
    },
    "entertainment": {
      "buzzfeed": "buzzfeed",
      "dailymail": "daily-mail",
      "entertainmentweekly": "entertainment-weekly",
      "mashable": "mashable",
      "theladbible": "the-lad-bible"
    },
    "gaming": {
      "ign": "ign",
      "polygon": "polygon"
    },
    "general": {
      "abcnewsau": "abc-news-au",
      "associatedpress": "associated-press",
      "bbcnews": "bbc-news",
      "bild": "bild",
      "cnn": "cnn",
      "dertagesspiegel": "der-tagesspiegel",
      "focus": "focus",
      "googlenews": "google-news",
      "independent": "independent",
      "metro": "metro",
      "mirror": "mirror",
      "newsweek": "newsweek",
      "newyorkmagazine": "new-york-magazine",
      "redditrall": "reddit-r-all",
      "reuters": "reuters",
      "skynews": "sky-news",
      "spiegelonline": "spiegel-online",
      "theguardianau": "the-guardian-au",
      "theguardianuk": "the-guardian-uk",
      "thehindu": "the-hindu",
      "thehuffingtonpost": "the-huffington-post",
      "thenewyorktimes": "the-new-york-times",
      "thetelegraph": "the-telegraph",
      "thetimesofindia": "the-times-of-india",
      "thewashingtonpost": "the-washington-post",
      "time": "time",
      "usatoday": "usa-today"
    },
    "music": {
      "mtvnews": "mtv-news",
      "mtvnewsuk": "mtv-news-uk"
    },
    "scienceandnature": {
      "nationalgeographic": "national-geographic",
      "newscientist": "new-scientist"
    },
    "sport": {
      "bbcsport": "bbc-sport",
      "espn": "espn",
      "espncricinfo": "espn-cric-info",
      "footballitalia": "football-italia",
      "fourfourtwo": "four-four-two",
      "foxsports": "fox-sports",
      "nflnews": "nfl-news",
      "skysportsnews": "sky-sports-news",
      "talksport": "talksport",
      "thesportbible": "the-sport-bible"
    },
    "technology": {
      "arstechnica": "ars-technica",
      "engadget": "engadget",
      "gruenderszene": "gruenderszene",
      "hackernews": "hacker-news",
      "recode": "recode",
      "t3n": "t3n",
      "techcrunch": "techcrunch",
      "techradar": "techradar",
      "thenextweb": "the-next-web",
      "theverge": "the-verge",
      "wiredde": "wired-de"
    }
  },
  "sources": {
    "abcnewsau": {
      "category": "general",
      "country": "Australia",
      "description": "Australia's most trusted source of local, national and world news. Comprehensive, independent, in-depth analysis, the latest business, sport, weather and more.",
      "id": "abc-news-au",
      "language": "en",
      "name": "ABC News (AU)",
      "sortBysAvailable": ["top"],
      "url": "http://www.abc.net.au/news",
      "urlsToLogos": {
        "large": "http://i.newsapi.org/abc-news-au-l.png",
        "medium": "http://i.newsapi.org/abc-news-au-m.png",
        "small": "http://i.newsapi.org/abc-news-au-s.png"
      }
    },
    "arstechnica": {
      "category": "technology",
      "country": "United States",
      "description": "The PC enthusiast's resource. Power users and the tools they love, without computing religion.",
      "id": "ars-technica",
      "language": "en",
      "name": "Ars Technica",
      "sortBysAvailable": ["top", "latest"],
      "url": "http://arstechnica.com",
      "urlsToLogos": {
        "large": "http://i.newsapi.org/ars-technica-l.png",
        "medium": "http://i.newsapi.org/ars-technica-m.png",
        "small": "http://i.newsapi.org/ars-technica-s.png"
      }
    },
    "associatedpress": {
      "category": "general",
      "country": "United States",
      "description": "The AP delivers in-depth coverage on the international, politics, lifestyle, business, and entertainment news.",
      "id": "associated-press",
      "language": "en",
      "name": "Associated Press",
      "sortBysAvailable": ["top", "latest"],
      "url": "http://bigstory.ap.org",
      "urlsToLogos": {
        "large": "http://i.newsapi.org/associated-press-l.png",
        "medium": "http://i.newsapi.org/associated-press-m.png",
        "small": "http://i.newsapi.org/associated-press-s.png"
      }
    },
    "bbcnews": {
      "category": "general",
      "country": "United Kingdom",
      "description": "Use BBC News for up-to-the-minute news, breaking news, video, audio and feature stories. BBC News provides trusted World and UK news as well as local and regional perspectives. Also entertainment, business, science, technology and health news.",
      "id": "bbc-news",
      "language": "en",
      "name": "BBC News",
      "sortBysAvailable": ["top"],
      "url": "http://www.bbc.co.uk/news",
      "urlsToLogos": {
        "large": "http://i.newsapi.org/bbc-news-l.png",
        "medium": "http://i.newsapi.org/bbc-news-m.png",
        "small": "http://i.newsapi.org/bbc-news-s.png"
      }
    },
    "bbcsport": {
      "category": "sport",
      "country": "United Kingdom",
      "description": "The home of BBC Sport online. Includes live sports coverage, breaking news, results, video, audio and analysis on Football, F1, Cricket, Rugby Union, Rugby League, Golf, Tennis and all the main world sports, plus major events such as the Olympic Games.",
      "id": "bbc-sport",
      "language": "en",
      "name": "BBC Sport",
      "sortBysAvailable": ["top"],
      "url": "http://www.bbc.co.uk/sport",
      "urlsToLogos": {
        "large": "http://i.newsapi.org/bbc-sport-l.png",
        "medium": "http://i.newsapi.org/bbc-sport-m.png",
        "small": "http://i.newsapi.org/bbc-sport-s.png"
      }
    },
    "bild": {
      "category": "general",
      "country": "Germany",
      "description": "Die Seite 1 für aktuelle Nachrichten und Themen, Bilder und Videos aus den Bereichen News, Wirtschaft, Politik, Show, Sport, und Promis.",
      "id": "bild",
      "language": "de",
      "name": "Bild",
      "sortBysAvailable": ["top", "latest"],
      "url": "http://www.bild.de",
      "urlsToLogos": {
        "large": "http://i.newsapi.org/bild-l.png",
        "medium": "http://i.newsapi.org/bild-m.png",
        "small": "http://i.newsapi.org/bild-s.png"
      }
    },
    "bloomberg": {
      "category": "business",
      "country": "United States",
      "description": "Bloomberg delivers business and markets news, data, analysis, and video to the world, featuring stories from Businessweek and Bloomberg News.",
      "id": "bloomberg",
      "language": "en",
      "name": "Bloomberg",
      "sortBysAvailable": ["top"],
      "url": "http://www.bloomberg.com",
      "urlsToLogos": {
        "large": "http://i.newsapi.org/bloomberg-l.png",
        "medium": "http://i.newsapi.org/bloomberg-m.png",
        "small": "http://i.newsapi.org/bloomberg-s.png"
      }
    },
    "businessinsider": {
      "category": "business",
      "country": "United States",
      "description": "Business Insider is a fast-growing business site with deep financial, media, tech, and other industry verticals. Launched in 2007, the site is now the largest business news site on the web.",
      "id": "business-insider",
      "language": "en",
      "name": "Business Insider",
      "sortBysAvailable": ["top", "latest"],
      "url": "http://www.businessinsider.com",
      "urlsToLogos": {
        "large": "http://i.newsapi.org/business-insider-l.png",
        "medium": "http://i.newsapi.org/business-insider-m.png",
        "small": "http://i.newsapi.org/business-insider-s.png"
      }
    },
    "businessinsideruk": {
      "category": "business",
      "country": "United Kingdom",
      "description": "Business Insider is a fast-growing business site with deep financial, media, tech, and other industry verticals. Launched in 2007, the site is now the largest business news site on the web.",
      "id": "business-insider-uk",
      "language": "en",
      "name": "Business Insider (UK)",
      "sortBysAvailable": ["top", "latest"],
      "url": "http://uk.businessinsider.com",
      "urlsToLogos": {
        "large": "http://i.newsapi.org/business-insider-uk-l.png",
        "medium": "http://i.newsapi.org/business-insider-uk-m.png",
        "small": "http://i.newsapi.org/business-insider-uk-s.png"
      }
    },
    "buzzfeed": {
      "category": "entertainment",
      "country": "United States",
      "description": "BuzzFeed is a cross-platform, global network for news and entertainment that generates seven billion views each month.",
      "id": "buzzfeed",
      "language": "en",
      "name": "Buzzfeed",
      "sortBysAvailable": ["top", "latest"],
      "url": "https://www.buzzfeed.com",
      "urlsToLogos": {
        "large": "http://i.newsapi.org/buzzfeed-l.png",
        "medium": "http://i.newsapi.org/buzzfeed-m.png",
        "small": "http://i.newsapi.org/buzzfeed-s.png"
      }
    },
    "cnbc": {
      "category": "business",
      "country": "United States",
      "description": "Get latest business news on stock markets, financial & earnings on CNBC. View world markets streaming charts & video; check stock tickers and quotes.",
      "id": "cnbc",
      "language": "en",
      "name": "CNBC",
      "sortBysAvailable": ["top"],
      "url": "http://www.cnbc.com",
      "urlsToLogos": {
        "large": "http://i.newsapi.org/cnbc-l.png",
        "medium": "http://i.newsapi.org/cnbc-m.png",
        "small": "http://i.newsapi.org/cnbc-s.png"
      }
    },
    "cnn": {
      "category": "general",
      "country": "United States",
      "description": "View the latest news and breaking news today for U.S., world, weather, entertainment, politics and health at CNN",
      "id": "cnn",
      "language": "en",
      "name": "CNN",
      "sortBysAvailable": ["top"],
      "url": "http://us.cnn.com",
      "urlsToLogos": {
        "large": "http://i.newsapi.org/cnn-l.png",
        "medium": "http://i.newsapi.org/cnn-m.png",
        "small": "http://i.newsapi.org/cnn-s.png"
      }
    },
    "dailymail": {
      "category": "entertainment",
      "country": "United Kingdom",
      "description": "All the latest news, sport, showbiz, science and health stories from around the world from the Daily Mail and Mail on Sunday newspapers.",
      "id": "daily-mail",
      "language": "en",
      "name": "Daily Mail",
      "sortBysAvailable": ["top", "latest"],
      "url": "http://www.dailymail.co.uk/home/index.html",
      "urlsToLogos": {
        "large": "http://i.newsapi.org/daily-mail-l.png",
        "medium": "http://i.newsapi.org/daily-mail-m.png",
        "small": "http://i.newsapi.org/daily-mail-s.png"
      }
    },
    "dertagesspiegel": {
      "category": "general",
      "country": "Germany",
      "description": "Nachrichten, News und neueste Meldungen aus dem Inland und dem Ausland - aktuell präsentiert von tagesspiegel.de.",
      "id": "der-tagesspiegel",
      "language": "de",
      "name": "Der Tagesspiegel",
      "sortBysAvailable": ["latest"],
      "url": "http://www.tagesspiegel.de",
      "urlsToLogos": {
        "large": "http://i.newsapi.org/der-tagesspiegel-l.png",
        "medium": "http://i.newsapi.org/der-tagesspiegel-m.png",
        "small": "http://i.newsapi.org/der-tagesspiegel-s.png"
      }
    },
    "diezeit": {
      "category": "business",
      "country": "Germany",
      "description": "Aktuelle Nachrichten, Kommentare, Analysen und Hintergrundberichte aus Politik, Wirtschaft, Gesellschaft, Wissen, Kultur und Sport lesen Sie auf ZEIT ONLINE.",
      "id": "die-zeit",
      "language": "de",
      "name": "Die Zeit",
      "sortBysAvailable": ["latest"],
      "url": "http://www.zeit.de/index",
      "urlsToLogos": {
        "large": "http://i.newsapi.org/die-zeit-l.png",
        "medium": "http://i.newsapi.org/die-zeit-m.png",
        "small": "http://i.newsapi.org/die-zeit-s.png"
      }
    },
    "engadget": {
      "category": "technology",
      "country": "United States",
      "description": "Engadget is a web magazine with obsessive daily coverage of everything new in gadgets and consumer electronics.",
      "id": "engadget",
      "language": "en",
      "name": "Engadget",
      "sortBysAvailable": ["top", "latest"],
      "url": "https://www.engadget.com",
      "urlsToLogos": {
        "large": "http://i.newsapi.org/engadget-l.png",
        "medium": "http://i.newsapi.org/engadget-m.png",
        "small": "http://i.newsapi.org/engadget-s.png"
      }
    },
    "entertainmentweekly": {
      "category": "entertainment",
      "country": "United States",
      "description": "Online version of the print magazine includes entertainment news, interviews, reviews of music, film, TV and books, and a special area for magazine subscribers.",
      "id": "entertainment-weekly",
      "language": "en",
      "name": "Entertainment Weekly",
      "sortBysAvailable": ["top"],
      "url": "http://www.ew.com",
      "urlsToLogos": {
        "large": "http://i.newsapi.org/entertainment-weekly-l.png",
        "medium": "http://i.newsapi.org/entertainment-weekly-m.png",
        "small": "http://i.newsapi.org/entertainment-weekly-s.png"
      }
    },
    "espn": {
      "category": "sport",
      "country": "United States",
      "description": "ESPN has up-to-the-minute sports news coverage, scores, highlights and commentary for NFL, MLB, NBA, College Football, NCAA Basketball and more.",
      "id": "espn",
      "language": "en",
      "name": "ESPN",
      "sortBysAvailable": ["top"],
      "url": "http://espn.go.com",
      "urlsToLogos": {
        "large": "http://i.newsapi.org/espn-l.png",
        "medium": "http://i.newsapi.org/espn-m.png",
        "small": "http://i.newsapi.org/espn-s.png"
      }
    },
    "espncricinfo": {
      "category": "sport",
      "country": "United States",
      "description": "ESPN Cricinfo provides the most comprehensive cricket coverage available including live ball-by-ball commentary, news, unparalleled statistics, quality editorial comment and analysis.",
      "id": "espn-cric-info",
      "language": "en",
      "name": "ESPN Cric Info",
      "sortBysAvailable": ["top", "latest"],
      "url": "http://www.espncricinfo.com/",
      "urlsToLogos": {
        "large": "http://i.newsapi.org/espn-cric-info-l.png",
        "medium": "http://i.newsapi.org/espn-cric-info-m.png",
        "small": "http://i.newsapi.org/espn-cric-info-s.png"
      }
    },
    "financialtimes": {
      "category": "business",
      "country": "United Kingdom",
      "description": "The latest UK and international business, finance, economic and political news, comment and analysis from the Financial Times on FT.com.",
      "id": "financial-times",
      "language": "en",
      "name": "Financial Times",
      "sortBysAvailable": ["top", "latest"],
      "url": "http://www.ft.com/home/uk",
      "urlsToLogos": {
        "large": "http://i.newsapi.org/financial-times-l.png",
        "medium": "http://i.newsapi.org/financial-times-m.png",
        "small": "http://i.newsapi.org/financial-times-s.png"
      }
    },
    "focus": {
      "category": "general",
      "country": "Germany",
      "description": "Minutenaktuelle Nachrichten und Service-Informationen von Deutschlands modernem Nachrichtenmagazin.",
      "id": "focus",
      "language": "de",
      "name": "Focus",
      "sortBysAvailable": ["top"],
      "url": "http://www.focus.de",
      "urlsToLogos": {
        "large": "http://i.newsapi.org/focus-l.png",
        "medium": "http://i.newsapi.org/focus-m.png",
        "small": "http://i.newsapi.org/focus-s.png"
      }
    },
    "footballitalia": {
      "category": "sport",
      "country": "Italy",
      "description": "Italian football news, analysis, fixtures and results for the latest from Serie A, Serie B and the Azzurri.",
      "id": "football-italia",
      "language": "en",
      "name": "Football Italia",
      "sortBysAvailable": ["top", "latest"],
      "url": "http://www.football-italia.net",
      "urlsToLogos": {
        "large": "http://i.newsapi.org/football-italia-l.png",
        "medium": "http://i.newsapi.org/football-italia-m.png",
        "small": "http://i.newsapi.org/football-italia-s.png"
      }
    },
    "fortune": {
      "category": "business",
      "country": "United States",
      "description": "Fortune 500 Daily and Breaking Business News",
      "id": "fortune",
      "language": "en",
      "name": "Fortune",
      "sortBysAvailable": ["top", "latest"],
      "url": "http://fortune.com",
      "urlsToLogos": {
        "large": "http://i.newsapi.org/fortune-l.png",
        "medium": "http://i.newsapi.org/fortune-m.png",
        "small": "http://i.newsapi.org/fortune-s.png"
      }
    },
    "fourfourtwo": {
      "category": "sport",
      "country": "United Kingdom",
      "description": "The latest football news, in-depth features, tactical and statistical analysis from FourFourTwo, the UK&#039;s favourite football monthly.",
      "id": "four-four-two",
      "language": "en",
      "name": "FourFourTwo",
      "sortBysAvailable": ["top", "latest"],
      "url": "http://www.fourfourtwo.com/news",
      "urlsToLogos": {
        "large": "http://i.newsapi.org/four-four-two-l.png",
        "medium": "http://i.newsapi.org/four-four-two-m.png",
        "small": "http://i.newsapi.org/four-four-two-s.png"
      }
    },
    "foxsports": {
      "category": "sport",
      "country": "United States",
      "description": "Find live scores, player and team news, videos, rumors, stats, standings, schedules and fantasy games on FOX Sports.",
      "id": "fox-sports",
      "language": "en",
      "name": "Fox Sports",
      "sortBysAvailable": ["top", "latest"],
      "url": "http://www.foxsports.com",
      "urlsToLogos": {
        "large": "http://i.newsapi.org/fox-sports-l.png",
        "medium": "http://i.newsapi.org/fox-sports-m.png",
        "small": "http://i.newsapi.org/fox-sports-s.png"
      }
    },
    "googlenews": {
      "category": "general",
      "country": "United States",
      "description": "Comprehensive, up-to-date news coverage, aggregated from sources all over the world by Google News.",
      "id": "google-news",
      "language": "en",
      "name": "Google News",
      "sortBysAvailable": ["top"],
      "url": "https://news.google.co.uk",
      "urlsToLogos": {
        "large": "http://i.newsapi.org/google-news-l.png",
        "medium": "http://i.newsapi.org/google-news-m.png",
        "small": "http://i.newsapi.org/google-news-s.png"
      }
    },
    "gruenderszene": {
      "category": "technology",
      "country": "Germany",
      "description": "Online-Magazin für Startups und die digitale Wirtschaft. News und Hintergründe zu Investment, VC und Gründungen.",
      "id": "gruenderszene",
      "language": "de",
      "name": "Gruenderszene",
      "sortBysAvailable": ["top", "latest"],
      "url": "http://www.gruenderszene.de",
      "urlsToLogos": {
        "large": "http://i.newsapi.org/gruenderszene-l.png",
        "medium": "http://i.newsapi.org/gruenderszene-m.png",
        "small": "http://i.newsapi.org/gruenderszene-s.png"
      }
    },
    "hackernews": {
      "category": "technology",
      "country": "United States",
      "description": "Hacker News is a social news website focusing on computer science and entrepreneurship. It is run by Paul Graham's investment fund and startup incubator, Y Combinator. In general, content that can be submitted is defined as \"anything that gratifies one's intellectual curiosity\".",
      "id": "hacker-news",
      "language": "en",
      "name": "Hacker News",
      "sortBysAvailable": ["top", "latest"],
      "url": "https://news.ycombinator.com",
      "urlsToLogos": {
        "large": "http://i.newsapi.org/hacker-news-l.png",
        "medium": "http://i.newsapi.org/hacker-news-m.png",
        "small": "http://i.newsapi.org/hacker-news-s.png"
      }
    },
    "handelsblatt": {
      "category": "business",
      "country": "Germany",
      "description": "Auf Handelsblatt lesen sie Nachrichten über Unternehmen, Finanzen, Politik und Technik. Verwalten Sie Ihre Finanzanlagen mit Hilfe unserer Börsenkurse.",
      "id": "handelsblatt",
      "language": "de",
      "name": "Handelsblatt",
      "sortBysAvailable": ["latest"],
      "url": "http://www.handelsblatt.com",
      "urlsToLogos": {
        "large": "http://i.newsapi.org/handelsblatt-l.png",
        "medium": "http://i.newsapi.org/handelsblatt-m.png",
        "small": "http://i.newsapi.org/handelsblatt-s.png"
      }
    },
    "ign": {
      "category": "gaming",
      "country": "United States",
      "description": "IGN is your site for Xbox One, PS4, PC, Wii-U, Xbox 360, PS3, Wii, 3DS, PS Vita and iPhone games with expert reviews, news, previews, trailers, cheat codes, wiki guides and walkthroughs.",
      "id": "ign",
      "language": "en",
      "name": "IGN",
      "sortBysAvailable": ["top", "latest"],
      "url": "http://www.ign.com",
      "urlsToLogos": {
        "large": "http://i.newsapi.org/ign-l.png",
        "medium": "http://i.newsapi.org/ign-m.png",
        "small": "http://i.newsapi.org/ign-s.png"
      }
    },
    "independent": {
      "category": "general",
      "country": "United Kingdom",
      "description": "National morning quality (tabloid) includes free online access to news and supplements. Insight by Robert Fisk and various other columnists.",
      "id": "independent",
      "language": "en",
      "name": "Independent",
      "sortBysAvailable": ["top"],
      "url": "http://www.independent.co.uk",
      "urlsToLogos": {
        "large": "http://i.newsapi.org/independent-l.png",
        "medium": "http://i.newsapi.org/independent-m.png",
        "small": "http://i.newsapi.org/independent-s.png"
      }
    },
    "mashable": {
      "category": "entertainment",
      "country": "United States",
      "description": "Mashable is a global, multi-platform media and entertainment company.",
      "id": "mashable",
      "language": "en",
      "name": "Mashable",
      "sortBysAvailable": ["top", "latest"],
      "url": "http://mashable.com",
      "urlsToLogos": {
        "large": "http://i.newsapi.org/mashable-l.png",
        "medium": "http://i.newsapi.org/mashable-m.png",
        "small": "http://i.newsapi.org/mashable-s.png"
      }
    },
    "metro": {
      "category": "general",
      "country": "United Kingdom",
      "description": "News, Sport, Showbiz, Celebrities from Metro - a free British newspaper.",
      "id": "metro",
      "language": "en",
      "name": "Metro",
      "sortBysAvailable": ["top", "latest"],
      "url": "http://metro.co.uk",
      "urlsToLogos": {
        "large": "http://i.newsapi.org/metro-l.png",
        "medium": "http://i.newsapi.org/metro-m.png",
        "small": "http://i.newsapi.org/metro-s.png"
      }
    },
    "mirror": {
      "category": "general",
      "country": "United Kingdom",
      "description": "All the latest news, sport and celebrity gossip at Mirror.co.uk. Get all the big headlines, pictures, analysis, opinion and video on the stories that matter to you.",
      "id": "mirror",
      "language": "en",
      "name": "Mirror",
      "sortBysAvailable": ["latest", "top"],
      "url": "http://www.mirror.co.uk/",
      "urlsToLogos": {
        "large": "http://i.newsapi.org/mirror-l.png",
        "medium": "http://i.newsapi.org/mirror-m.png",
        "small": "http://i.newsapi.org/mirror-s.png"
      }
    },
    "mtvnews": {
      "category": "music",
      "country": "United States",
      "description": "The ultimate news source for music, celebrity, entertainment, movies, and current events on the web. It's pop culture on steroids.",
      "id": "mtv-news",
      "language": "en",
      "name": "MTV News",
      "sortBysAvailable": ["top", "latest"],
      "url": "http://www.mtv.com/news",
      "urlsToLogos": {
        "large": "http://i.newsapi.org/mtv-news-l.png",
        "medium": "http://i.newsapi.org/mtv-news-m.png",
        "small": "http://i.newsapi.org/mtv-news-s.png"
      }
    },
    "mtvnewsuk": {
      "category": "music",
      "country": "United Kingdom",
      "description": "All the latest celebrity news, gossip, exclusive interviews and pictures from the world of music and entertainment.",
      "id": "mtv-news-uk",
      "language": "en",
      "name": "MTV News (UK)",
      "sortBysAvailable": ["top"],
      "url": "http://www.mtv.co.uk/news",
      "urlsToLogos": {
        "large": "http://i.newsapi.org/mtv-news-uk-l.png",
        "medium": "http://i.newsapi.org/mtv-news-uk-m.png",
        "small": "http://i.newsapi.org/mtv-news-uk-s.png"
      }
    },
    "nationalgeographic": {
      "category": "science-and-nature",
      "country": "United States",
      "description": "Reporting our world daily: original nature and science news from National Geographic.",
      "id": "national-geographic",
      "language": "en",
      "name": "National Geographic",
      "sortBysAvailable": ["top"],
      "url": "http://news.nationalgeographic.com",
      "urlsToLogos": {
        "large": "http://i.newsapi.org/national-geographic-l.png",
        "medium": "http://i.newsapi.org/national-geographic-m.png",
        "small": "http://i.newsapi.org/national-geographic-s.png"
      }
    },
    "newscientist": {
      "category": "science-and-nature",
      "country": "United States",
      "description": "Breaking science and technology news from around the world. Exclusive stories and expert analysis on space, technology, health, physics, life and Earth.",
      "id": "new-scientist",
      "language": "en",
      "name": "New Scientist",
      "sortBysAvailable": ["top"],
      "url": "https://www.newscientist.com/section/news",
      "urlsToLogos": {
        "large": "http://i.newsapi.org/new-scientist-l.png",
        "medium": "http://i.newsapi.org/new-scientist-m.png",
        "small": "http://i.newsapi.org/new-scientist-s.png"
      }
    },
    "newsweek": {
      "category": "general",
      "country": "United States",
      "description": "Newsweek provides in-depth analysis, news and opinion about international issues, technology, business, culture and politics.",
      "id": "newsweek",
      "language": "en",
      "name": "Newsweek",
      "sortBysAvailable": ["top", "latest"],
      "url": "http://www.newsweek.com",
      "urlsToLogos": {
        "large": "http://i.newsapi.org/newsweek-l.png",
        "medium": "http://i.newsapi.org/newsweek-m.png",
        "small": "http://i.newsapi.org/newsweek-s.png"
      }
    },
    "newyorkmagazine": {
      "category": "general",
      "country": "United States",
      "description": "NYMAG and New York magazine cover the new, the undiscovered, the next in politics, culture, food, fashion, and behavior nationally, through a New York lens.",
      "id": "new-york-magazine",
      "language": "en",
      "name": "New York Magazine",
      "sortBysAvailable": ["top", "latest"],
      "url": "http://nymag.com",
      "urlsToLogos": {
        "large": "http://i.newsapi.org/new-york-magazine-l.png",
        "medium": "http://i.newsapi.org/new-york-magazine-m.png",
        "small": "http://i.newsapi.org/new-york-magazine-s.png"
      }
    },
    "nflnews": {
      "category": "sport",
      "country": "United States",
      "description": "The official source for NFL news, schedules, stats, scores and more.",
      "id": "nfl-news",
      "language": "en",
      "name": "NFL News",
      "sortBysAvailable": ["top", "latest"],
      "url": "http://www.nfl.com/news",
      "urlsToLogos": {
        "large": "http://i.newsapi.org/nfl-news-l.png",
        "medium": "http://i.newsapi.org/nfl-news-m.png",
        "small": "http://i.newsapi.org/nfl-news-s.png"
      }
    },
    "polygon": {
      "category": "gaming",
      "country": "United States",
      "description": "Polygon is a gaming website in partnership with Vox Media. Our culture focused site covers games, their creators, the fans, trending stories and entertainment news.",
      "id": "polygon",
      "language": "en",
      "name": "Polygon",
      "sortBysAvailable": ["top"],
      "url": "http://www.polygon.com",
      "urlsToLogos": {
        "large": "http://i.newsapi.org/polygon-l.png",
        "medium": "http://i.newsapi.org/polygon-m.png",
        "small": "http://i.newsapi.org/polygon-s.png"
      }
    },
    "recode": {
      "category": "technology",
      "country": "United States",
      "description": "Get the latest independent tech news, reviews and analysis from Recode with the most informed and respected journalists in technology and media.",
      "id": "recode",
      "language": "en",
      "name": "Recode",
      "sortBysAvailable": ["top"],
      "url": "http://www.recode.net",
      "urlsToLogos": {
        "large": "http://i.newsapi.org/recode-l.png",
        "medium": "http://i.newsapi.org/recode-m.png",
        "small": "http://i.newsapi.org/recode-s.png"
      }
    },
    "redditrall": {
      "category": "general",
      "country": "United States",
      "description": "Reddit is an entertainment, social news networking service, and news website. Reddit's registered community members can submit content, such as text posts or direct links.",
      "id": "reddit-r-all",
      "language": "en",
      "name": "Reddit /r/all",
      "sortBysAvailable": ["top", "latest"],
      "url": "https://www.reddit.com/r/all",
      "urlsToLogos": {
        "large": "http://i.newsapi.org/reddit-r-all-l.png",
        "medium": "http://i.newsapi.org/reddit-r-all-m.png",
        "small": "http://i.newsapi.org/reddit-r-all-s.png"
      }
    },
    "reuters": {
      "category": "general",
      "country": "United States",
      "description": "Reuters.com brings you the latest news from around the world, covering breaking news in business, politics, entertainment, technology, video and pictures.",
      "id": "reuters",
      "language": "en",
      "name": "Reuters",
      "sortBysAvailable": ["top", "latest"],
      "url": "http://www.reuters.com",
      "urlsToLogos": {
        "large": "http://i.newsapi.org/reuters-l.png",
        "medium": "http://i.newsapi.org/reuters-m.png",
        "small": "http://i.newsapi.org/reuters-s.png"
      }
    },
    "skynews": {
      "category": "general",
      "country": "United Kingdom",
      "description": "Sky news delivers breaking news, headlines and top stories from business, politics, entertainment and more in the UK and worldwide.",
      "id": "sky-news",
      "language": "en",
      "name": "Sky News",
      "sortBysAvailable": ["top"],
      "url": "http://news.sky.com",
      "urlsToLogos": {
        "large": "http://i.newsapi.org/sky-news-l.png",
        "medium": "http://i.newsapi.org/sky-news-m.png",
        "small": "http://i.newsapi.org/sky-news-s.png"
      }
    },
    "skysportsnews": {
      "category": "sport",
      "country": "United Kingdom",
      "description": "Watch the best live coverage of your favourite sports: Football, Golf, Rugby, Cricket, Tennis, F1, Boxing, plus the latest sports news, transfers and scores.",
      "id": "sky-sports-news",
      "language": "en",
      "name": "Sky Sports News",
      "sortBysAvailable": ["top", "latest"],
      "url": "http://www.skysports.com",
      "urlsToLogos": {
        "large": "http://i.newsapi.org/sky-sports-news-l.png",
        "medium": "http://i.newsapi.org/sky-sports-news-m.png",
        "small": "http://i.newsapi.org/sky-sports-news-s.png"
      }
    },
    "spiegelonline": {
      "category": "general",
      "country": "Germany",
      "description": "Deutschlands führende Nachrichtenseite. Alles Wichtige aus Politik, Wirtschaft, Sport, Kultur, Wissenschaft, Technik und mehr.",
      "id": "spiegel-online",
      "language": "de",
      "name": "Spiegel Online",
      "sortBysAvailable": ["top"],
      "url": "http://www.spiegel.de",
      "urlsToLogos": {
        "large": "http://i.newsapi.org/spiegel-online-l.png",
        "medium": "http://i.newsapi.org/spiegel-online-m.png",
        "small": "http://i.newsapi.org/spiegel-online-s.png"
      }
    },
    "t3n": {
      "category": "technology",
      "country": "Germany",
      "description": "Das Online-Magazin bietet Artikel zu den Themen E-Business, Social Media, Startups und Webdesign.",
      "id": "t3n",
      "language": "de",
      "name": "T3n",
      "sortBysAvailable": ["top"],
      "url": "http://t3n.de",
      "urlsToLogos": {
        "large": "http://i.newsapi.org/t3n-l.png",
        "medium": "http://i.newsapi.org/t3n-m.png",
        "small": "http://i.newsapi.org/t3n-s.png"
      }
    },
    "talksport": {
      "category": "sport",
      "country": "United Kingdom",
      "description": "Tune in to the world's biggest sports radio station - Live Premier League football coverage, breaking sports news, transfer rumours &amp; exclusive interviews.",
      "id": "talksport",
      "language": "en",
      "name": "TalkSport",
      "sortBysAvailable": ["top", "latest"],
      "url": "http://talksport.com",
      "urlsToLogos": {
        "large": "http://i.newsapi.org/talksport-l.png",
        "medium": "http://i.newsapi.org/talksport-m.png",
        "small": "http://i.newsapi.org/talksport-s.png"
      }
    },
    "techcrunch": {
      "category": "technology",
      "country": "United States",
      "description": "TechCrunch is a leading technology media property, dedicated to obsessively profiling startups, reviewing new Internet products, and breaking tech news.",
      "id": "techcrunch",
      "language": "en",
      "name": "TechCrunch",
      "sortBysAvailable": ["top", "latest"],
      "url": "https://techcrunch.com",
      "urlsToLogos": {
        "large": "http://i.newsapi.org/techcrunch-l.png",
        "medium": "http://i.newsapi.org/techcrunch-m.png",
        "small": "http://i.newsapi.org/techcrunch-s.png"
      }
    },
    "techradar": {
      "category": "technology",
      "country": "United States",
      "description": "The latest technology news and reviews, covering computing, home entertainment systems, gadgets and more.",
      "id": "techradar",
      "language": "en",
      "name": "TechRadar",
      "sortBysAvailable": ["top", "latest"],
      "url": "http://www.techradar.com",
      "urlsToLogos": {
        "large": "http://i.newsapi.org/techradar-l.png",
        "medium": "http://i.newsapi.org/techradar-m.png",
        "small": "http://i.newsapi.org/techradar-s.png"
      }
    },
    "theeconomist": {
      "category": "business",
      "country": "United Kingdom",
      "description": "The Economist offers authoritative insight and opinion on international news, politics, business, finance, science, technology and the connections between them.",
      "id": "the-economist",
      "language": "en",
      "name": "The Economist",
      "sortBysAvailable": ["top", "latest"],
      "url": "http://www.economist.com",
      "urlsToLogos": {
        "large": "http://i.newsapi.org/the-economist-l.png",
        "medium": "http://i.newsapi.org/the-economist-m.png",
        "small": "http://i.newsapi.org/the-economist-s.png"
      }
    },
    "theguardianau": {
      "category": "general",
      "country": "Australia",
      "description": "Latest news, sport, comment, analysis and reviews from Guardian Australia",
      "id": "the-guardian-au",
      "language": "en",
      "name": "The Guardian (AU)",
      "sortBysAvailable": ["top"],
      "url": "https://www.theguardian.com/au",
      "urlsToLogos": {
        "large": "http://i.newsapi.org/the-guardian-au-l.png",
        "medium": "http://i.newsapi.org/the-guardian-au-m.png",
        "small": "http://i.newsapi.org/the-guardian-au-s.png"
      }
    },
    "theguardianuk": {
      "category": "general",
      "country": "United Kingdom",
      "description": "Latest news, sport, business, comment, analysis and reviews from the Guardian, the world's leading liberal voice.",
      "id": "the-guardian-uk",
      "language": "en",
      "name": "The Guardian (UK)",
      "sortBysAvailable": ["top", "latest"],
      "url": "https://www.theguardian.com/uk",
      "urlsToLogos": {
        "large": "http://i.newsapi.org/the-guardian-uk-l.png",
        "medium": "http://i.newsapi.org/the-guardian-uk-m.png",
        "small": "http://i.newsapi.org/the-guardian-uk-s.png"
      }
    },
    "thehindu": {
      "category": "general",
      "country": "India",
      "description": "The Hindu. latest news, analysis, comment, in-depth coverage of politics, business, sport, environment, cinema and arts from India's national newspaper.",
      "id": "the-hindu",
      "language": "en",
      "name": "The Hindu",
      "sortBysAvailable": ["top", "latest"],
      "url": "http://www.thehindu.com",
      "urlsToLogos": {
        "large": "http://i.newsapi.org/the-hindu-l.png",
        "medium": "http://i.newsapi.org/the-hindu-m.png",
        "small": "http://i.newsapi.org/the-hindu-s.png"
      }
    },
    "thehuffingtonpost": {
      "category": "general",
      "country": "United States",
      "description": "The Huffington Post is a politically liberal American online news aggregator and blog that has both localized and international editions founded by Arianna Huffington, Kenneth Lerer, Andrew Breitbart, and Jonah Peretti, featuring columnists.",
      "id": "the-huffington-post",
      "language": "en",
      "name": "The Huffington Post",
      "sortBysAvailable": ["top"],
      "url": "http://www.huffingtonpost.com",
      "urlsToLogos": {
        "large": "http://i.newsapi.org/the-huffington-post-l.png",
        "medium": "http://i.newsapi.org/the-huffington-post-m.png",
        "small": "http://i.newsapi.org/the-huffington-post-s.png"
      }
    },
    "theladbible": {
      "category": "entertainment",
      "country": "United Kingdom",
      "description": "The LAD Bible is one of the largest community for guys aged 16-30 in the world. Send us your funniest pictures and videos!",
      "id": "the-lad-bible",
      "language": "en",
      "name": "The Lad Bible",
      "sortBysAvailable": ["top", "latest"],
      "url": "http://www.theladbible.com",
      "urlsToLogos": {
        "large": "http://i.newsapi.org/the-lad-bible-l.png",
        "medium": "http://i.newsapi.org/the-lad-bible-m.png",
        "small": "http://i.newsapi.org/the-lad-bible-s.png"
      }
    },
    "thenewyorktimes": {
      "category": "general",
      "country": "United States",
      "description": "The New York Times: Find breaking news, multimedia, reviews & opinion on Washington, business, sports, movies, travel, books, jobs, education, real estate, cars & more at nytimes.com.",
      "id": "the-new-york-times",
      "language": "en",
      "name": "The New York Times",
      "sortBysAvailable": ["top"],
      "url": "http://www.nytimes.com",
      "urlsToLogos": {
        "large": "http://i.newsapi.org/the-new-york-times-l.png",
        "medium": "http://i.newsapi.org/the-new-york-times-m.png",
        "small": "http://i.newsapi.org/the-new-york-times-s.png"
      }
    },
    "thenextweb": {
      "category": "technology",
      "country": "United States",
      "description": "The Next Web is one of the world’s largest online publications that delivers an international perspective on the latest news about Internet technology, business and culture.",
      "id": "the-next-web",
      "language": "en",
      "name": "The Next Web",
      "sortBysAvailable": ["latest"],
      "url": "http://thenextweb.com",
      "urlsToLogos": {
        "large": "http://i.newsapi.org/the-next-web-l.png",
        "medium": "http://i.newsapi.org/the-next-web-m.png",
        "small": "http://i.newsapi.org/the-next-web-s.png"
      }
    },
    "thesportbible": {
      "category": "sport",
      "country": "United Kingdom",
      "description": "TheSPORTbible is one of the largest communities for sports fans across the world. Send us your sporting pictures and videos!",
      "id": "the-sport-bible",
      "language": "en",
      "name": "The Sport Bible",
      "sortBysAvailable": ["top", "latest"],
      "url": "http://www.thesportbible.com",
      "urlsToLogos": {
        "large": "http://i.newsapi.org/the-sport-bible-l.png",
        "medium": "http://i.newsapi.org/the-sport-bible-m.png",
        "small": "http://i.newsapi.org/the-sport-bible-s.png"
      }
    },
    "thetelegraph": {
      "category": "general",
      "country": "United Kingdom",
      "description": "Latest news, business, sport, comment, lifestyle and culture from the Daily Telegraph and Sunday Telegraph newspapers and video from Telegraph TV.",
      "id": "the-telegraph",
      "language": "en",
      "name": "The Telegraph",
      "sortBysAvailable": ["top", "latest"],
      "url": "http://www.telegraph.co.uk",
      "urlsToLogos": {
        "large": "http://i.newsapi.org/the-telegraph-l.png",
        "medium": "http://i.newsapi.org/the-telegraph-m.png",
        "small": "http://i.newsapi.org/the-telegraph-s.png"
      }
    },
    "thetimesofindia": {
      "category": "general",
      "country": "India",
      "description": "Times of India brings the Latest News and Top Breaking headlines on Politics and Current Affairs in India and around the World, Sports, Business, Bollywood News and Entertainment, Science, Technology, Health and Fitness news, Cricket and opinions from leading columnists.",
      "id": "the-times-of-india",
      "language": "en",
      "name": "The Times of India",
      "sortBysAvailable": ["top", "latest"],
      "url": "http://timesofindia.indiatimes.com",
      "urlsToLogos": {
        "large": "http://i.newsapi.org/the-times-of-india-l.png",
        "medium": "http://i.newsapi.org/the-times-of-india-m.png",
        "small": "http://i.newsapi.org/the-times-of-india-s.png"
      }
    },
    "theverge": {
      "category": "technology",
      "country": "United States",
      "description": "The Verge covers the intersection of technology, science, art, and culture.",
      "id": "the-verge",
      "language": "en",
      "name": "The Verge",
      "sortBysAvailable": ["top", "latest"],
      "url": "http://www.theverge.com",
      "urlsToLogos": {
        "large": "http://i.newsapi.org/the-verge-l.png",
        "medium": "http://i.newsapi.org/the-verge-m.png",
        "small": "http://i.newsapi.org/the-verge-s.png"
      }
    },
    "thewallstreetjournal": {
      "category": "business",
      "country": "United States",
      "description": "WSJ online coverage of breaking news and current headlines from the US and around the world. Top stories, photos, videos, detailed analysis and in-depth reporting.",
      "id": "the-wall-street-journal",
      "language": "en",
      "name": "The Wall Street Journal",
      "sortBysAvailable": ["top"],
      "url": "http://www.wsj.com",
      "urlsToLogos": {
        "large": "http://i.newsapi.org/the-wall-street-journal-l.png",
        "medium": "http://i.newsapi.org/the-wall-street-journal-m.png",
        "small": "http://i.newsapi.org/the-wall-street-journal-s.png"
      }
    },
    "thewashingtonpost": {
      "category": "general",
      "country": "United States",
      "description": "Breaking news and analysis on politics, business, world national news, entertainment more. In-depth DC, Virginia, Maryland news coverage including traffic, weather, crime, education, restaurant reviews and more.",
      "id": "the-washington-post",
      "language": "en",
      "name": "The Washington Post",
      "sortBysAvailable": ["top"],
      "url": "https://www.washingtonpost.com",
      "urlsToLogos": {
        "large": "http://i.newsapi.org/the-washington-post-l.png",
        "medium": "http://i.newsapi.org/the-washington-post-m.png",
        "small": "http://i.newsapi.org/the-washington-post-s.png"
      }
    },
    "time": {
      "category": "general",
      "country": "United States",
      "description": "Breaking news and analysis from TIME.com. Politics, world news, photos, video, tech reviews, health, science and entertainment news.",
      "id": "time",
      "language": "en",
      "name": "Time",
      "sortBysAvailable": ["top", "latest"],
      "url": "http://time.com",
      "urlsToLogos": {
        "large": "http://i.newsapi.org/time-l.png",
        "medium": "http://i.newsapi.org/time-m.png",
        "small": "http://i.newsapi.org/time-s.png"
      }
    },
    "usatoday": {
      "category": "general",
      "country": "United States",
      "description": "Get the latest national, international, and political news at USATODAY.com.",
      "id": "usa-today",
      "language": "en",
      "name": "USA Today",
      "sortBysAvailable": ["top", "latest"],
      "url": "http://www.usatoday.com/news",
      "urlsToLogos": {
        "large": "http://i.newsapi.org/usa-today-l.png",
        "medium": "http://i.newsapi.org/usa-today-m.png",
        "small": "http://i.newsapi.org/usa-today-s.png"
      }
    },
    "wiredde": {
      "category": "technology",
      "country": "Germany",
      "description": "Wired reports on how emerging technologies affect culture, the economy and politics.",
      "id": "wired-de",
      "language": "de",
      "name": "Wired.de",
      "sortBysAvailable": ["top", "latest"],
      "url": "https://www.wired.de",
      "urlsToLogos": {
        "large": "http://i.newsapi.org/wired-de-l.png",
        "medium": "http://i.newsapi.org/wired-de-m.png",
        "small": "http://i.newsapi.org/wired-de-s.png"
      }
    },
    "wirtschaftswoche": {
      "category": "business",
      "country": "Germany",
      "description": "Das Online-Portal des führenden Wirtschaftsmagazins in Deutschland. Das Entscheidende zu Unternehmen, Finanzen, Erfolg und Technik.",
      "id": "wirtschafts-woche",
      "language": "de",
      "name": "Wirtschafts Woche",
      "sortBysAvailable": ["latest"],
      "url": "http://www.wiwo.de",
      "urlsToLogos": {
        "large": "http://i.newsapi.org/wirtschafts-woche-l.png",
        "medium": "http://i.newsapi.org/wirtschafts-woche-m.png",
        "small": "http://i.newsapi.org/wirtschafts-woche-s.png"
      }
    }
  }
};

//Generated using javascript and then JSON.stringify
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

/*var categories = Object.keys(_NEWS_FEEDS_INFORMATION.Countries);

console.log (categories);

var categoryOptions = [];

for (var i = 0; i <categories.length; i++) {

    var category = categories[i];
    var oneCategoryOption = {value: category, label:category};
    categoryOptions.push(oneCategoryOption);

}

console.log (JSON.stringify(categoryOptions));
console.log (categoryOptions);*/

class NewsFeed extends React.Component {
    
    constructor(props) {

        super(props)

            // Set the state to hold the following Information
            // feedData is set to null as it yet has to be called from the data controller
            // feedNamesForSelectedCategory are the set of feeds available for the selected category
            // moodSelected is set to all as default

            this.state = {feedData:[], categorySelected: null,feedSelected:null , moodSelected: "all"};

            this.changeCategory = this.changeCategory.bind(this);

            this.changeFeed = this.changeFeed.bind(this);

            this.fetchData= this.fetchData.bind(this);
            
    }

    componentDidMount() {

        firebase.auth().onAuthStateChanged(user => {
            if (user) { 
                //USER HAS LOGGED IN

                firebase.database().ref("users/"+user.uid).once('value').then((snapshot) => {
       
                //console.log(user.uid);
                //console.log (snapshot.val());
                var userPreferrences = snapshot.val(); //an object

                this.setState ({categorySelected:userPreferrences.preferredCategory,feedSelected:userPreferrences.preferredFeed});

                var feedSelected =  this.state.feedSelected;
                console.log (feedSelected);
                var sortBysAvailable = _NEWS_FEEDS_INFORMATION.sources[feedSelected].sortBysAvailable; 
                console.log (sortBysAvailable);
                this.fetchData (feedSelected,sortBysAvailable);

                });

            }
            else {
                //HAS LOGGED OUT
            }
        })
 

    }
    
    //Should change the list of values in the drop down menu
    changeCategory (categoryValue) {


        this.setState({ categorySelected: categoryValue });       


    }


    //Should change the article feed in the card groups
    changeFeed (stationID, sortByOptions) {

                     //Go through each article one by one in a loop
                    //in the loop 
                    
                        //combine the date and title together and remove all special characters
                        //check if that reference already exists in our articleUniqueIDs array
                        //add that reference immidietely in our articleUniqueIDs array

                        //if it is a new article push it to the array for the source selected else dont do anything 
                        //(remember to add keys - happy,sad,angry,wow,neutral)

                        //Set the feedData state to load articles
        
                        //then
    }

    //Function to fetch data for the selected news feed
    fetchData(stationID, sortByOptions) {

        var sortOption = null;
        // if there is only one option, select it (top articles)
        if (sortByOptions.length == 1) {
            sortOption = sortByOptions [0];
        }

        // if more than one options are available, select the second option (latest articles) 
        else {
            sortOption = sortByOptions [1];
        }

        var thisComponent = this; //work around for scope!

        NewsFeedController.searchData(stationID, sortOption)

            .then(function (data) {
                console.log (data);
                thisComponent.addArticlesToFirebase(data);
                //console.log (data.articles);
            })
            //.catch((err) => this.setState({ newFeedData: []},  ));
            console.log(this.state.feed);

    }


    //Function to test if articles already exist in firebase and to add them if they dont 
    //articles data is the data about the articles returned to us for a particular news feed
    addArticlesToFirebase (articlesData) {

        //Array of articles
        // //Name of news feed for which data is being called
        // var source = articlesData.source;
        // //
        // var updates = {};

        // for (var i=0 ; i <articles.length;i++ ) {


        //     var oneArticle = articles [i];

        //     //Initializing Emotions for each article
        //     oneArticle.happy = 0 ;
        //     oneArticle.neutral = 0 ;
        //     oneArticle.wow = 0 ;
        //     oneArticle.angry = 0;
        //     oneArticle.sad = 0;

        //     console.log (oneArticle);
        //     console.log(i);

        //     //combine the date and title together and remove all special characters
        //     //check if that reference already exists in our articleUniqueIDs array
            
        //     //Extract the title for the article and remove special characters from it
        //     var title = oneArticle.title;
        //     title = title.replace(/\s/g, "_");
        //     title =  JSON.stringify(title).replace(/\W/g, '')

        //     //Extract the published data and remove special characters from it  
        //     var publishedAt = oneArticle.publishedAt;
           
        //     publishedAt = publishedAt.replace(/\s/g, "_");


        //     var url = oneArticle.url;
        //     url = JSON.stringify(url).replace(/\W/g, '');
        //     //Join the title and publishedAt variable to create an id for an article
        //     var idForOneArticle = url;
        //     console.log (idForOneArticle);

        //     updates['articleUniqueIDs/' + idForOneArticle] = oneArticle;

        //    // firebase.auth().onAuthStateChanged(user => {
        //        // if (user) { 
        // }


        // firebase.database().ref("articleUniqueIDs/").once('value').then((snapshot) => {
        //     console.log(updates);

        //     //For each article key in updates do the following:
        //     for(var articleKey in updates){
        //         //console.log(article);

        //         //check if that reference already exists in our articleUniqueIDs array
        //         if (snapshot.hasChild(idForOneArticle)) {

        //             console.log ("do not add");
        //         }

        //         //If it does not then do the following 
        //         else {
        //             var myObj = {};
        //             myObj[articleKey] = updates[articleKey];
        //             //Add this reference to firebase
        //             //var articles = "articles";
        //             //console.log (oneArticle.title);
        //             //var updates = {};
        //             //updates['articleUniqueIDs/' + idForOneArticle] = oneArticle;
        //             firebase.database().ref().update(myObj);
        //             console.log("add");
        //         }   
        //     }
        // });

        //Set the feedData state to load articles from firebase

        var articles = articlesData.articles;

        Object.keys(articles).forEach(function (index){
          var url = articles[index].url;
          var urlId = JSON.stringify(url).replace(/\W/g, '');
          var stationName = JSON.stringify(articlesData.source).replace(/\W/g, '')
          var articlesRef = firebase.database().ref('articles/'+urlId);
          articlesRef.set(articles[index]);
          var articleSourceRef = firebase.database().ref(stationName+'/articles/' + urlId);
          // articles[index].source = articlesData.source;
          articleSourceRef.set(articles[index])
        })


    }
                        
    render () {
        this.fetchData("ars-technica", ['top']) 
        //console.log (this.state.feedNamesForSelectedCategory)
        
        return (<main>
                    <HorizontalNavigation selectedCategory= {this.state.categorySelected} selectedFeed = {this.state.feedSelected} changeCategory={this.state.changeCategory} changeFeed = {this.state.changeCategory}  fetchData={this.fetchData}/>
                </main>
                );
    }
}

class HorizontalNavigation extends React.Component {
    
    constructor(props) {

        super(props)

        this.state = {categorySelected:''};

        this.changeCategory = this.changeCategory.bind(this);
        
        this.changeFeed = this.changeFeed.bind(this);

        this.submit = this.submit.bind(this);
    }

    changeFeed(selectedFeed) {
        this.setState ({feedSelected:selectedFeed.label});
    }

    changeCategory(selectedCategory) {
        

        this.setState ({categorySelected:selectedCategory.value});

        var names = Object.keys(_NEWS_FEEDS_INFORMATION.categories[selectedCategory.value])

        var options = [];
        names.forEach(function (name){
          options.push({value:name, label:_NEWS_FEEDS_INFORMATION.categories[selectedCategory.value][name]})
        }) 
        this.setState({feedsForCategory:options})
    }

    submit(event){
      event.preventDefault();
      this.props.fetchData(this.state.feedSelected, ['top'])
    }




    render () {


        return (
            <div className="horizontal_nav_menu">
                   <div className="selectCategory"> 

                        <Select name="form-field-name" resetValue='' value={this.state.categorySelected} options={_SELECT_OPTIONS.categories} onChange={this.changeCategory} className="select"/>
                        
                        <Select name="form-field-names" resetValue='' value={this.state.feedSelected} options={this.state.feedsForCategory} onChange={this.changeFeed} className="selector"/>
                    
                        <Button onClick={this.submit}>Filter</Button>
                     </div> 

            </div> 
        );
    }
} 
class CardGroup extends React.Component {
    
    constructor(props) {

        super(props)

        this.state = {};

    }


    render () {

        


        return (null);
    }
} 

class Card extends React.Component {
    
    constructor(props) {

        super(props)

        this.state = {};

    }


    render () {

        var timeStamp = this.props.articleInfo.publishedAt;
        var d = new Date("2016-12-07T00:02:46Z");
        var dateforMonth = d.getDate();
        var month = d.getMonth();
        var year = d.getFullYear();
        var completeDate = dateforMonth + "|" + month + "|" + year;
        console.log (completeDate);

        return (null);
    }
} 


export default NewsFeed; 