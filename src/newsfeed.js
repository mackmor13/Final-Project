import React from 'react';
import firebase from 'firebase';
import { Link, hashHistory } from 'react-router';
//load CSS for this module
import './css/index.css';
import './css/card.css';
import './css/animate.css';
import './css/Flat-UI-master/dist/css/flat-ui.css';
import { Button, Well, Collapse } from 'react-bootstrap';

class NewsFeed extends React.Component {
    render () {
        return ( <div>Hello</div>);
    }
}

class HorizontalNavigation extends React.Component {
    
    constructor(props) {

        super(props)

        this.state = {};

    }
    
    render() {
        return (
            <div>
                            <button type="button" className="hamburger is-closed" data-toggle="offcanvas">
                            <div className="hamburgerSize">
                            <span className="hamb-top" />
                            <span className="hamb-middle" />
                            <span className="hamb-bottom" />
                            </div>
                            </button>

                            <div className="drop_down_menu">
                            <span className = "selectCategory"> 

                            <span>

                            <button className = "flat-butt flat-butt-category" onClick={() => this.setState({ categoriesopen: !this.state.categoriesopen })}> 
                            General <i className="fa fa-sort-desc" aria-hidden="true"></i>
                            </button>

                            <Collapse in={this.state.categoriesopen} className="dropDownOptions scroller">

                            <div className="dropDownCategoryTitle">

                            <div className="categoryList">Categories </div> 
                            <div>
                              <ul>
                              <li>General</li>
                              <li>Sports</li>
                              <li>Technology</li>
                              <li>Entertainment</li>
                              <li>Music</li>
                              <li>Science and Nature</li>
                              </ul>
                            </div>
                            <div className="categoryList">Location</div> 
                            <div>
                              <ul >
                              <li>Australia</li>
                              <li>India</li>
                              <li>Germany</li>
                              <li>Italy</li>
                              <li>United Kingdom</li>
                              <li>United States</li>
                              </ul>
                            </div>



                            </div>
                            </Collapse>

                            <button className = "flat-butt flat-butt-category" onClick={() => this.setState({ feedNamesopen: !this.state.feedNamesopen })}> 
                            BBC <i className="fa fa-sort-desc" aria-hidden="true"></i>
                            </button>

                            <Collapse in={this.state.feedNamesopen} className="dropDownOptions scroller">

                            <div className="dropDownCategoryTitle">

                            FeedNames 

                            <div></div>

                            </div>
                            </Collapse>

                            </span>
                            </span> 
                        
                            </div>
            </div>

        );
    }
}

export default NewsFeed; 