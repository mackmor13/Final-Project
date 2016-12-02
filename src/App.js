import React from 'react';

//load LazyLoad for this module for generating the cards for each news article

import ReactCSSTransitionGroup from 'react-addons-css-transition-group' // ES6
import LazyLoad from 'react-lazy-load';
//load CSS for this module
//import './css/style.css';
//import './css/animate.css';
import { Button, Well, Collapse } from 'react-bootstrap';
/*global feednami*/
/*Feednami is a package downloaded and used to collect RSS Feed data and then convert it from XML into JSON without cross domain errors*/
import './feednami-client.js';
import $ from 'jquery';
import firebase from 'firebase';
import cheerio from 'cheerio';
import ReactHtmlParser from 'react-html-parser';
import _RSS_FEEDS from './fb_obj_design'; 

//For animation of the navigation bar
//Sourced from http://bootsnipp.com/user/snippets/45GQR
$(document).ready(function () {
    var trigger = $('.hamburger'),
        overlay = $('.overlay'),
        isClosed = false;

    trigger.click(function () {
        hamburger_cross();
    });

    function hamburger_cross() {

        if (isClosed === true) {
            overlay.hide();
            trigger.removeClass('is-open');
            trigger.addClass('is-closed');
            isClosed = false;
        } else {
            overlay.show();
            trigger.removeClass('is-closed');
            trigger.addClass('is-open');
            isClosed = true;
        }
    }

    $('[data-toggle="offcanvas"]').click(function () {
        $('#wrapper').toggleClass('toggled');
    });
});


// Object which is a directory containing the RSS News Links (in XML Format) for India and each city in India  
var _RSS_URLS = {

    Nation: "http://timesofindia.indiatimes.com/rssfeeds/-2128936835.cms",
    Business: "http://timesofindia.indiatimes.com/rssfeeds/1898055.cms",
    Cricket: "http://timesofindia.indiatimes.com/rssfeeds/4719161.cms",
    SundayTimes: "http://timesofindia.indiatimes.com/rssfeeds/1945062111.cms",
    Mumbai: "http://timesofindia.indiatimes.com/rssfeeds/-2128838597.cms",
    Delhi: "http://timesofindia.indiatimes.com/rssfeeds/-2128839596.cms",
    Chennai: "http://timesofindia.indiatimes.com/rssfeeds/2950623.cms",
    Banglore: "http://timesofindia.indiatimes.com/rssfeeds/-2128833038.cms",
    Hyderabad: "http://timesofindia.indiatimes.com/rssfeeds/-2128816011.cms",
    Kolkatta: "http://timesofindia.indiatimes.com/rssfeeds/-2128830821.cms",
    Pune: "http://timesofindia.indiatimes.com/rssfeeds/-2128821991.cms",
    Chandigarh: "http://timesofindia.indiatimes.com/rssfeeds/-2128816762.cms",
    Goa: "http://timesofindia.indiatimes.com/rssfeeds/3012535.cms",
    Ahemdabad: "http://timesofindia.indiatimes.com/rssfeeds/-2128821153.cms",
    Surat: "http://timesofindia.indiatimes.com/rssfeeds/3942660.cms",
    Jaipur: "http://timesofindia.indiatimes.com/rssfeeds/3012544.cms",
    Rajkot: "http://timesofindia.indiatimes.com/rssfeeds/3942663.cms"
};


//Class which generates the entire application being created
class App extends React.Component {

    constructor(props) {

        var allArticles = [];

        super(props)

<<<<<<< HEAD
        
       //Object.keys(_RSS_FEEDS).forEach(function(city) {
            Object.keys(_RSS_FEED[city]).forEach(function(src) {
               console.log("Hello");
                /*for (var info in RSS) {
                    var temp = {};
                    if (info == 'Name') {
                        console.log(info);
                    }
                }*/
            }
        });
=======
        console.log(_RSS_FEEDS);
        // FIELDS TO ACCESS:
        /**
         * 'Name' =>
         * 'Description'
         * 'RSSURL'
         * 'Station'
         */

        // Object.keys(_RSS_FEEDS).forEach(function(city) {            
        //     Object.keys(_RSS_FEEDS[city]).forEach(function(src) {
        //         console.log(_RSS_FEEDS[city][src]['Name']);
        //     });
        // });

        // _RSS_FEEDS.forEach(function(city) {
        //     for (var RSS in city) {
        //         console.log(RSS[Name]);
        //         for (var info in RSS) {
        //             var temp = {};
        //             if (info == 'Name') {
        //                 console.log(info);
        //             }
        //         }
        //     }
        // });
>>>>>>> fcbbd58f50464b000937825a36668ef31305d797
        // Variable created to hold information about the different Feed Names
        var feedNames = Object.keys(_RSS_URLS);

        //this ideally would be set up from a Controller
        this.state = { feed: [], categories: feedNames, category: "Nation" };
        this.changeState = this.changeState.bind(this);
        this.myCallbackFunction = this.myCallbackFunction.bind(this);

        //please download data
        feednami.load(_RSS_URLS[this.state.category], this.myCallbackFunction);
    }


    // Function to generate articles
    // feedName is a variable which decides the feed which needs to load
    myCallbackFunction(result) {
        if (result.error) {
            console.log(result.error);
            console.log("Feed Loader not working");
        }

        else {
            var entries = result.feed.entries;
            for (var i = 0; i < entries.length; i++) {
                var entry = entries[i];
            }
            console.log(entries);

            //this is wher I have data
            //I want to put this in the App's state
            this.setState({ feed: entries });
        }

    }

    //this changes the feed to whatever category is selected from the navigation list
    changeState(feedValue) {
        this.myCallbackFunction = this.myCallbackFunction.bind(this);
        this.setState({ category: feedValue })
        feednami.load(_RSS_URLS[feedValue], this.myCallbackFunction);
    }

    //how to display this component

    render() {

        return (
            // Container which is split into the 12 column layout where 3 columns are the menu and 9 columns are for the headlines
            <div id="wrapper">
                <div className="overlay" />
                {/* Sidebar */}
                <nav className="navbar navbar-inverse navbar-fixed-top" id="sidebar-wrapper" role="navigation" style={{ backgroundColor: "red" }}>
                    <ul className="nav sidebar-nav">
                        <li className="sidebar-brand">
                            <a href="#">
                               React News
                             </a>
                        </li>
                        <Navigation categoryNames={this.state.categories} changeCategory={this.changeState} />  
                    </ul>
                </nav>

                {/* /#sidebar-wrapper */}
                {/* Page Content */}
                <div id="page-content-wrapper">
                    <button type="button" className="hamburger is-closed" data-toggle="offcanvas">
                        <span className="hamb-top" />
                        <span className="hamb-middle" />
                        <span className="hamb-bottom" />
                    </button>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 col-lg-offset-2">
                                <h1 className="categoryTitle">{this.state.category}</h1>
                                <Articles articles={this.state.feed} /> {/* Passing all the news articles */}
                            </div>
                        </div>
                    </div>
                </div>
                {/* /#page-content-wrapper */}
            </div>
        );
    }
}

//Class created to generate the Navigation component
class Navigation extends React.Component {

    render() {

        //Creats the list items for the feed categories dynamically 
        //this is defined
        //var thisComponent = this;

        var categoryArray = this.props.categoryNames.map((category) => {
            /* I am passing the function changeCategoryout to each navigation button */
            return <NavigationOption key={category} category={category} categoryChanger={this.props.changeCategory} />
            /* */
        });

        return (
            <div>
                {categoryArray}
            </div>
        );
    }
}


//Class created to generate the navigation options
class NavigationOption extends React.Component {

    constructor(props) {

        super(props);

        this.handleClick = this.handleClick.bind(this);
    }


    //Trying to add further interactivity where the user clicks the button and it deletes the element using jquery
    //Currently this feature is not working
    handleClick() {


        //when a user presses a button the function should basically change the feed to whatever category is selected
        this.props.categoryChanger(this.props.category);

    }

    render() {

        return (

            <li key={this.props.category} onClick={this.handleClick}><a aria-label={this.props.category}>{this.props.category}</a></li>

        );
    }
}


//Class created to generate the CardGroup component which will contain all the results for the feed selected
class Articles extends React.Component {

    render() {

        //An array is created which dynamically creates HTML for all the results to be printed 
        var articleArray = this.props.articles.map(function (article) {

            // pubDate
            var postDate = new Date(article.date);
            // reformat pubDate
            var pubDate = (postDate.getMonth() + 1) + "/" + postDate.getDate() + "/" + postDate.getFullYear();

            return <Article info={article} pubDate={pubDate} key={article.title} />;
        });

        return (
            <main>
                <section role="region" aria-live="polite">
                    {articleArray}
                </section>
            </main>

        );
    }
}


//Class created to generate a single result component
class Article extends React.Component {

    constructor(props) {
        super(props);
        this.state = { opacity: "1", display: "block" }
        this.finishedReading = this.finishedReading.bind(this);
        this.deleteArticle = this.deleteArticle.bind(this);
    }

    finishedReading() {
        this.setState({ opacity: "0.4" });
    }

    deleteArticle() {
        this.setState({ display: "none" })
    }

    render() {
        var websiteLink = this.props.info.link;
        var httpPart = websiteLink.substring(0, 4);
        var restOfTheLink = websiteLink.substring(5);
        var websiteLinkHttps = httpPart + "s:" + restOfTheLink;



        //Prints a single card with the title and date of the object which has been passed to it along with a direct interactive view of the website
        return (

            //Note : Each card is made to lazy load ... this is done so that all 20 cards do not load at once and cause the computer/website to crash and to
            //ensure a good user experience as the news articles load only on scroll similar to a method Facebook deploys for theirs news feed section



            <div style={{ width: "100%", margin: "auto", opacity: this.state.opacity, display: this.state.display }}>

                <article role="article" id={this.props.info.date} style={{ opacity: this.state.opacity, display: this.state.display }}>
                    <button className="flat-butt flat-danger-butt" onClick={() => this.setState({ open: !this.state.open })} style={{ width: "100%", height: "100px" }}>
                        {this.props.info.title}
                        <p className="date">
                            <span> {this.props.pubDate} </span>
                        </p>
                    </button>
                </article>

                <Collapse in={this.state.open} style={{ height: "100%" }}>
                    <div>
                        <Well>
                            { /* <ArticleContent linkInfo={this.props.info.link} /> */} 
                            {this.props.info.description}
                            <FinishedReadingButton data={websiteLinkHttps} opacityChanger={this.finishedReading} articleDelete={this.deleteArticle} />

                        </Well>
                    </div>
                </Collapse>
            </div>
        );

    }
}

class ArticleContent extends React.Component {

    constructor(props) {

        super(props);

        var websiteLink = this.props.linkInfo;
        var httpPart = websiteLink.substring(0, 4);
        var restOfTheLink = websiteLink.substring(5);
        var websiteLinkHttps = httpPart + "s:" + restOfTheLink;

        this.state = { htmlCode: "", linkData: websiteLinkHttps };

        this.myCallbackFunction = this.myCallbackFunction.bind(this);


        $.getJSON('http://whateverorigin.org/get?url=' + encodeURIComponent(this.state.linkData) + '&callback=?', this.myCallbackFunction);

    }

    myCallbackFunction(codeReturned) {

        this.setState({ htmlCode: codeReturned });

        var code = this.state.htmlCode.contents;
       

        let cheerio = require('cheerio');
        let $ = cheerio.load(code);

        var content = $('.section1').html();

        this.setState({ contentCode: content });

        var image = $('.highlight').html();
    

        let imageCode = cheerio.load(image);
        var srcPath = imageCode('img').attr('src');

        //console.log("Https Link" + this.state.linkData);

        var link = this.state.linkData;

        //to remove https as you cannot access images with that 
        link = link.substring(8);

        //removing the article id number
        var new_str = link.split("articleshow/")[0];



        //adding the path 
        link = "//" + new_str + "articleshow" + srcPath;


        this.setState({ imgSrc: link });
    }

    render() {

        return (
            <div style={{ height: "100%" }}>



                <img className="descriptionImage" src={this.state.imgSrc} />

                <br />
                <div className="descriptionText">
                    {ReactHtmlParser(this.state.contentCode)}
                </div>

            </div>
        );

    }
}


class ReadLaterButton extends React.Component {

    constructor(props) {

        super(props);

        this.handleClick = this.handleClick.bind(this);

    }

    //Trying to add further interactivity where the user clicks the button and it deletes the element using jquery
    //Currently this feature is not working
    handleClick() {

        this.props.opacityChanger();

    }

    render() {

        return (<button className="btn btn-primary" type="submit" onClick={this.handleClick}> Read Later </button>);
    }

}

class FinishedReadingButton extends React.Component {

    constructor(props) {

        super(props);

        this.handleClick = this.handleClick.bind(this);

    }

    //Trying to add further interactivity where the user clicks the button and it deletes the element using jquery
    //Currently this feature is not working
    handleClick() {

        console.log("Hi there buddy you clicked me", this.props.data.title);

        this.props.articleDelete();

    }

    render() {

        return (<button className="flat-butt flat-danger-butt finishedReading" type="submit" onClick={this.handleClick}> Finished Reading </button>);
    }

}

export default App; //make this class available to other files (e.g., index.js)