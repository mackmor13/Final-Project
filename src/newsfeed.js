import React from 'react';
import firebase from 'firebase';
import { Link, hashHistory } from 'react-router';
//load CSS for this module
import './css/index.css';
import './css/card.css';
import './css/animate.css';
import './css/Flat-UI-master/dist/css/flat-ui.css';
import Select from 'react-select';
import './css/selection.css';
import NewsFeedController from './newsFeedDataController.js';


//import require bootstrap components such as button, well, collapse
import { Button, Well, Collapse } from 'react-bootstrap';

class NewsFeed extends React.Component {
    
    constructor(props) {

        super(props)

            // Set the state to hold the following Information
            // feedData is set to null as it yet has to be called from the data controller
            // feedNamesForSelectedCategory are the set of feeds available for the selected category
            // moodSelected is set to all as default

            this.state = {feedData:[], categorySelected: null,feedSelected:null , moodSelected: "all", newFeedData: []};

            this.changeCategory = this.changeCategory.bind(this);

            this.changeFeed = this.changeFeed.bind(this);

            this.fetchData= this.fetchData.bind(this);
            
            // this.changeMood= this.changeMood.bind(this);

            

            //fetchData ();
            
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
                this.fetchData ("abc-news-au",["top"]);

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
                thisComponent.addArticlesToFirebase(data.articles);
                //console.log (data);
                //console.log (data.articles);
            })
            //.catch((err) => this.setState({ newFeedData: []},  ));
            //console.log(this.state.feed);

    }


    addArticlesToFirebase (articles) {


        var articleUniqueIDsRef = firebase.database().ref('articleUniqueIDs/').once('value').then((snapshot) => {
                var abc = snapshot.val();
                //console.log (abc);
                abc.bye = "bye"
                //console.log(abc);
                return abc;
                //console.log(user.uid);
                //console.log (snapshot.val());
        });

        
        console.log(articleUniqueIDsRef);

      for (var oneArticle in articles ) {

        var title = oneArticle.title;
        title = title.replace(/\s/g, "_");
         
        

        
        //      //combine the date and title together and remove all special characters
        //     //check if that reference already exists in our articleUniqueIDs array
        //     //add that reference immidietely in our articleUniqueIDs array

        //     //if it is a new article push it to the array for the source selected else dont do anything 
        //     //(remember to add keys - happy,sad,angry,wow,neutral)



      }
                    
        //Set the feedData state to load articles from firebase


    }



    render () {

        //console.log (this.state.feedNamesForSelectedCategory)
        
        return (<main>
                    <HorizontalNavigation selectedCategory= {this.categorySelected} selectedFeed = {this.feedSelected} changeCategory={this.changeCategory} changeFeed = {this.changeCategory} />
                </main>
                );
    }
}

class HorizontalNavigation extends React.Component {
    
    constructor(props) {

        super(props)

        this.state = {};

    }


    render () {

        var Select = require('react-select');
        
        // First get categories from firebase

        var categories =null;
        //console.log (categories);

        for (var key in categories) {
            
            
        
        }

        // Next get feeds for that category from firebase
        
        // Next make the value displayed for category and feed the selected category and feed



        return (
            <div className="horizontal_nav_menu">




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
        return (null);
    }
} 


export default NewsFeed; 