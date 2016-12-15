import React from 'react';
import firebase from 'firebase';
import { Link, hashHistory } from 'react-router';
import Select from 'react-select';
import NewsFeedController from './newsFeedDataController.js';
import { Well, Collapse } from 'react-bootstrap';
import { Card, CardActions, CardMenu, CardText, CardTitle, Grid, Cell, IconButton, Button } from 'react-mdl';
import EmailButton from "./EmailButton.js";
import 'bootstrap/dist/css/bootstrap.css';
import "./card.css";
import _ from 'lodash';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.css';
import _NEWS_FEEDS_INFORMATION from 'newsFeedsInformation';
import _SELECT_OPTIONS from 'optionsSelect';


// updates news to firebase. record selected categories
class NewsFeed extends React.Component {

    constructor(props) {

        super(props)

        // Set the state to hold the following Information
        // feedData is set to null as it yet has to be called from the data controller
        // feedNamesForSelectedCategory are the set of feeds available for the selected category
        // moodSelected is set to all as default

        this.state = { feedData: [], categorySelected: null, feedSelected: null, moodSelected: "all" };

        this.changeCategory = this.changeCategory.bind(this);

        this.changeFeed = this.changeFeed.bind(this);

        this.fetchData = this.fetchData.bind(this);

    }

    componentDidMount() {

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                //USER HAS LOGGED IN

                firebase.database().ref("users/" + user.uid).once('value').then((snapshot) => {

                    var userPreferrences = snapshot.val(); //an object

                    this.setState({ categorySelected: userPreferrences.preferredCategory, feedSelected: userPreferrences.preferredFeed });

                    var feedSelected = this.state.feedSelected;
                    this.fetchData(feedSelected);

                });

            }
            else {
                //HAS LOGGED OUT
                hashHistory.push("/login")
            }
        })


    }

    //Should change the list of values in the drop down menu
    changeCategory(categoryValue) {


        this.setState({ categorySelected: categoryValue });


    }


    //Should change the article feed in the card groups
    changeFeed(stationID, sortByOptions) {

        //Go through each article one by one in a loop
        //in the loop 

        //combine the date and title together and remove all special characters
        //check if that reference already exists in our articleUniqueIDs array
        //add that reference immidietely in our articleUniqueIDs array

        //if it is a new article push it to the array for the source selected else dont do anything 
        //(remember to add keys - happy,sad,angry,wow,neutral)

        //Set the feedData state to load articles

    }

    //Function to fetch data for the selected news feed
    fetchData(stationID) {

        var thisComponent = this; //work around for scope!

        NewsFeedController.searchData(stationID)

            .then(function(data) {
                thisComponent.addArticlesToFirebase(data);
            })

    }

    //Function to test if articles already exist in firebase and to add them if they dont 
    //articles data is the data about the articles returned to us for a particular news feed
    addArticlesToFirebase(articlesData) {


        //Set the feedData state to load articles from firebase
        var articlesRef = firebase.database().ref('articles');
        var articlesArray = [];
        articlesRef.on('value', (snapshot) => {
            snapshot.forEach(function(child) {
                var article = child.val();
                article.key = child.key;
                articlesArray.push(article)
            });
        })
        var articlesHad = Object.keys(articlesArray);

        var articles = articlesData.articles;

        Object.keys(articles).forEach(function(index) {
            var url = articles[index].url;
            var urlId = JSON.stringify(url).replace(/\W/g, '');
            if (articlesHad.indexOf(urlId) == -1) {
                var articlesRef = firebase.database().ref('articles/' + urlId);
                articles[index].station = articlesData.source;
                articlesRef.update(articles[index]);
            }
        })


    }

    // handleClick(event) {
    //   this.props.NewsFeed(this.state.)
    // }

    render() {

        return (<main>
            <HorizontalNavigation selectedCategory={this.state.categorySelected} selectedFeed={this.state.feedSelected} changeCategory={this.state.changeCategory} changeFeed={this.state.changeCategory} fetchData={this.fetchData} />
        </main>
        );
    }
}

// provides two select dropdown menus and news cards
class HorizontalNavigation extends React.Component {

    constructor(props) {

        super(props)

        this.state = { categorySelected: '', feedSelected: '', search: false, articles: [] };

        this.changeCategory = this.changeCategory.bind(this);

        this.changeFeed = this.changeFeed.bind(this);

        this.submit = this.submit.bind(this);
    }

    changeFeed(selectedFeed) {
        this.setState({ feedSelected: selectedFeed.value });
    }

    changeCategory(selectedCategory) {

        var options = [];
        this.setState({ categorySelected: selectedCategory.value });

        var names = Object.keys(_NEWS_FEEDS_INFORMATION.categories[selectedCategory.value])

        var options = [];
        names.forEach(function(name) {
            options.push({ value: _NEWS_FEEDS_INFORMATION.categories[selectedCategory.value][name], label: name })
        })
        this.setState({ feedsForCategory: options })
    }

    // click on filter, then it takes data from firebase and form cards
    submit(event) {
        event.preventDefault();
        this.props.fetchData(this.state.feedSelected);
        var articlesRef = firebase.database().ref('articles');
        articlesRef.on('value', (snapshot) => {
            var articlesArray = [];
            snapshot.forEach(function(child) {
                var article = child.val();
                article.key = child.key;
                articlesArray.push(article)
            });
            articlesArray = articlesArray.filter((article) => {
                return article.station == this.state.feedSelected;
            });
            // articlesArray = _.shuffle(articlesArray);
            articlesArray = articlesArray.splice(0, 15);
            this.setState({ articles: articlesArray });
        })
        this.setState({ search: true });
    }




    render() {
        var articleCards = this.state.articles.map((article) => {
            return <Cell col={4}><CardItem article={article} key={article.key} />
            </Cell>
        })


        return (
            <div className="horizontal_nav_menu">
                <div className="selectCategory">

                    <Select aria-lable="Choose Category" aria-role="dropdown" className="selectForm select" name="form-field-name" resetValue='' placeholder="Choose a city or a category..." value={this.state.categorySelected} options={_SELECT_OPTIONS.categories} onChange={this.changeCategory} />

                    <Select aria-lable="Choose Feed" aria-role="dropdown" className="selectForm selector" name="form-field-names" resetValue='' placeholder="Then select a news feed here..." value={this.state.feedSelected} options={this.state.feedsForCategory} onChange={this.changeFeed} />

                    <Button aria-lable="Filter Articles" aria-role="button" className="mdl-button" raised onClick={this.submit}>Filter</Button>
                </div>
                {this.state.search &&
                    <Grid >
                        {articleCards}
                    </Grid>
                }

            </div>
        );
    }
}

// forms individual card items
class CardItem extends React.Component {
    constructor(props) {
        super(props);

        var userId = firebase.auth().currentUser.uid;
        this.state = { userId: userId }

        this.wow = this.wow.bind(this);
        this.happy = this.happy.bind(this);
        this.neutral = this.neutral.bind(this);
        this.angry = this.angry.bind(this);
        this.sad = this.sad.bind(this);
    }

    wow() {
        var articleWowRef = firebase.database().ref('articles/' + this.props.article.key + '/wows');

        //toggle logic
        var userId = this.state.userId;
        var wowObj = this.props.article.wows || {};
        if (wowObj && wowObj[userId]) { //in likes list already
            wowObj[userId] = null; //remove
        }
        else { //add my like
            wowObj[userId] = true; //just make it true so we have a key
        }

        articleWowRef.set(wowObj) //update the likes!
    }

    happy() {
        var articleHappyRef = firebase.database().ref('articles/' + this.props.article.key + '/happies');

        //toggle logic
        var userId = this.state.userId;
        var happyObj = this.props.article.happies || {};
        if (happyObj && happyObj[userId]) { //in likes list already
            happyObj[userId] = null; //remove
        }
        else { //add my like
            happyObj[userId] = true; //just make it true so we have a key
        }

        articleHappyRef.set(happyObj) //update the likes!
    }

    neutral() {
        var articleNeutralRef = firebase.database().ref('articles/' + this.props.article.key + '/neutrals');

        //toggle logic
        var userId = this.state.userId;
        var neutralObj = this.props.article.neutrals || {};
        if (neutralObj && neutralObj[userId]) { //in likes list already
            neutralObj[userId] = null; //remove
        }
        else { //add my like
            neutralObj[userId] = true; //just make it true so we have a key
        }

        articleNeutralRef.set(neutralObj) //update the likes!
    }

    angry() {
        var articleAngryRef = firebase.database().ref('articles/' + this.props.article.key + '/angries');

        //toggle logic
        var userId = this.state.userId;
        var angryObj = this.props.article.angries || {};
        if (angryObj && angryObj[userId]) { //in likes list already
            angryObj[userId] = null; //remove
        }
        else { //add my like
            angryObj[userId] = true; //just make it true so we have a key
        }
        articleAngryRef.set(angryObj) //update the likes!
    }

    sad() {
        var articleSadRef = firebase.database().ref('articles/' + this.props.article.key + '/sads');

        //toggle logic
        var userId = this.state.userId;
        var sadObj = this.props.article.sads || {};
        if (sadObj && sadObj[userId]) { //in likes list already
            sadObj[userId] = null; //remove
        }
        else { //add my like
            sadObj[userId] = true; //just make it true so we have a key
        }

        articleSadRef.set(sadObj) //update the likes!
    }

    render() {
        const style = {
            color: '#fff',
            height: '176px',
            background: 'url(' + this.props.article.urlToImage + ') center / cover'
        }

        var userId = this.state.userId;
        var iWow = false;
        var wowCount = 0;
        if (this.props.article.wows) {
            wowCount = Object.keys(this.props.article.wows).length;
            if (this.props.article.wows[userId])
                iWow = true;
        }
        var iHappy = false;
        var happyCount = 0;
        if (this.props.article.happies) {
            happyCount = Object.keys(this.props.article.happies).length;
            if (this.props.article.happies[userId])
                iHappy = true;
        }
        var iNeutral = false;
        var neutralCount = 0;
        if (this.props.article.neutrals) {
            neutralCount = Object.keys(this.props.article.neutrals).length;
            if (this.props.article.neutrals[userId])
                iNeutral = true;
        }
        var iAngry = false;
        var angryCount = 0;
        if (this.props.article.angries) {
            angryCount = Object.keys(this.props.article.angries).length;
            if (this.props.article.angries[userId])
                iAngry = true;
        }
        var iSad = false;
        var sadCount = 0;
        if (this.props.article.sads) {
            sadCount = Object.keys(this.props.article.sads).length;
            if (this.props.article.sads[userId])
                iSad = true;
        }

        var color = '';
        var chooseColor = {
            wow: { color: 'card_wow', count: wowCount },
            happy: { color: 'card_happy', count: happyCount },
            neutral: { color: 'card_neutral', count: neutralCount },
            sad: { color: 'card_sad', count: sadCount },
            angry: { color: 'card_angry', count: angryCount }
        }
        var max = 0;
        var most = '';
        Object.keys(chooseColor).forEach(function(emotion) {
            if (chooseColor[emotion].count > max) {
                color = chooseColor[emotion].color;
                max = chooseColor[emotion].count;
                most = emotion;
            } else if (chooseColor[emotion].count == max) {
                color = 'card_neutral';
            }
        })
        var mostEmotionRef = firebase.database().ref('articles/' + this.props.article.key + "/emotion")
        mostEmotionRef.set(most);
        var time = moment(this.props.article.publishedAt).format("MM-DD-YYYY");




        return (
            <article role="article">
                <div className={"card " + color}>
                    <div className="card_image" style={style}>
                    </div>
                    <div className="card_text_content">

                        <div className="card__share">
                            <div className="card__social">
                                <a className="share-icon facebook" id="shareBtn" href="#https://developers.facebook.com/docs/sharing/reference/share-dialog"><span className="fa fa-facebook" /></a>
                                <a className="share-icon twitter" href="#"><span className="fa fa-twitter" /></a>
                                <a className="share-icon googleplus" href="#"><span className="fa fa-google-plus" /></a>
                            </div>
                            <EmailButton aria-lable="Email Representatives" aria-role="button" article={this.props.article} />
                        </div>
                        <div className="card_title">
                            <strong><a aria-lable="Article Source Website" href={this.props.article.url} target="_blank" className='linkArticle whiteLink'>{this.props.article.title}</a></strong>
                        </div>
                        <div>
                            {time}
                        </div>
                        <div className="card_description scroller">
                            {this.props.article.description}
                        </div>

                        <div className="card_details">


                        </div>

                        <div className="card_reactions">

                            <div className="card_reaction">
                                <div className={"reaction_icon " + (iWow ? 'user-clicked' : '')}>
                                    <span aria-lable="Wow" aria-role="button" onClick={() => this.wow()} className="emj" data-toggle="tooltip" data-placement="bottom" title="Wow!">
                                        😮
                            </span>
                                </div>
                                <div className="reaction_value">
                                    {wowCount}
                                </div>
                            </div>

                            <div className="card_reaction">
                                <div className={"reaction_icon " + (iHappy ? 'user-clicked' : '')}>
                                    {/*'fa fa-heart ' + (iLike ? 'user-liked' : '')*/}
                                    <span aria-lable="Happy" aria-role="button" onClick={() => this.happy()} className="emj" data-toggle="tooltip" data-placement="bottom" title="Happy!">
                                        😃
                            </span>
                                </div>
                                <div className="reaction_value">
                                    {happyCount}
                                </div>
                            </div>

                            <div className="card_reaction">
                                <div className={"reaction_icon " + (iNeutral ? 'user-clicked' : '')}>
                                    <span aria-lable="Neutral" aria-role="button" onClick={() => this.neutral()} className="emj" data-toggle="tooltip" data-placement="bottom" title="Neutral">
                                        😐
                            </span>
                                </div>
                                <div className="reaction_value">
                                    {neutralCount}
                                </div>
                            </div>

                            <div className="card_reaction">
                                <div className={"reaction_icon " + (iAngry ? 'user-clicked' : '')}>
                                    <span aria-lable="angry" aria-role="button" onClick={() => this.angry()} className="emj" data-toggle="tooltip" data-placement="bottom" title="Angry!">
                                        😠
                            </span>
                                </div>
                                <div className="reaction_value">
                                    {angryCount}
                                </div>
                            </div>

                            <div className="card_reaction">
                                <div className={"reaction_icon " + (iSad ? 'user-clicked' : '')}>
                                    <span aria-lable="Sad" aria-role="button" onClick={() => this.sad()} className="emj" data-toggle="tooltip" data-placement="bottom" title="Sad!">
                                        😦
                            </span>
                                </div>
                                <div className="reaction_value">
                                    {sadCount}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </article>)
    }
}


export default NewsFeed; 