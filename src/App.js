//This interactive website is to have users to search a key word, find related artists, and try one of their songs randomly. 

'use strict';

//import neccessary materials
import React, { Component } from 'react';
import ReactMDL from 'react-mdl';
import ReactPlayer from 'react-player';

import { Form, FormControl, InputGroup, Button, Glyphicon, Image } from 'react-bootstrap';
import { Dialog, DialogTitle, DialogActions, DialogContent } from 'react-mdl';
import DataController from './DataController';



//a "root" component
class App extends React.Component {
  //how to display this component
  constructor(props) {
    super(props);
    this.state = { artists: [], totalResults: 0, };
    this.fetchData = this.fetchData.bind(this);
    this.fetchData("Bruno Mars");
  }

  //get information about related artists from api
  fetchData(searchTerm) {
    var thisComponent = this;
    DataController.searchArtist(searchTerm)
      .then(function (data) {
        if (data.artists !== undefined) {
          thisComponent.setState({
            artists: data.artists.items,
            totalResults: data.artists.total
          })
        }
      }).catch((err) => this.setState({ artists: [], totalResults: 0 }));
  }

  render() {
    const style={
      "font-family": "Blippo, fantasy"
    };
    return (
      <div className="container">
        <header>
          <h1 style={style}>A Chance to Like a New Artist</h1>
        </header>
        <SearchForm searchFunction={this.fetchData} artistsFound={this.state.totalResults} />
        <main>
          <ArtistsTable artists={this.state.artists} />
        </main>
      </div>
    );
  }
}

//This class sets up a table of artists and their related information (followers, genres, and one random track)
class ArtistsTable extends React.Component {
  render() {
    var artistRows = this.props.artists.map(function (artist) {
      return <ArtistRow artist={artist} key={artist.id} />;
    })

    return (
      <table className="table table-condensed table-striped">
        <thead>
          <tr><th className="col-xs-1" aria-label="Poster">Poster</th><th className="col-xs-2" aria-label="Name">Artist Name</th>
            <th className="col-xs-2" aria-label="Followers">Followers</th>
            <th className="col-xs-3" aria-label="Genres">Genres</th>
            <th aria-label="Sample Songs">Random Preview</th></tr>
        </thead>
        <tbody>
          {artistRows}
        </tbody>
      </table>
    );
  }
}

class ArtistRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = { preview: '', playSong: false, poster: '' };
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.fetchUrl = this.fetchUrl.bind(this);
  }

  fetchUrl(){
    var thisComponent = this;
    DataController.getTopTracks(thisComponent.props.artist)
      .then(function(data){
        if(data.tracks.length > 0){
          var chosen = data.tracks[Math.floor(Math.random() * data.tracks.length)];
          thisComponent.setState({preview : chosen.preview_url, poster : chosen.album.images[1].url})
        }
      })
  }
  //to call out modal when clicked on button
  handleOpenDialog() {
    this.setState({
      openDialog: true
    });
    this.fetchUrl();
  }

  //to close modal when clicked on button
  handleCloseDialog() {
    this.setState({
      openDialog: false,
      preview: ''
    });
  }

  render() {
    const style= {
      "margin-top" : '1.8em',
      "width": '55%',
       "word-wrap": "break-word"
     }

    return (
      //uses react-MDL package and its Dialog to make a pop-out window for mp3 player that is from react player packages
      <tr>
        <td><Image thumbnail responsive src={DataController.getImage(this.props.artist)} alt="Poster" aria-label="Poster" /></td>
        <td>{this.props.artist.name}</td>
        <td>{this.props.artist.followers.total}</td>
        <td>{this.props.artist.genres.toString()}</td>
        <td>
            <Button responsive bsStyle="success" style={style} onClick={this.handleOpenDialog}>
              <Glyphicon glyph="headphones"/>    Preview
            </Button>
            <Dialog open={this.state.openDialog} onCancel={this.handleCloseDialog}>
              <DialogTitle>30s Preview</DialogTitle>
              <DialogContent>
                <Image thumbnail responsive src={this.state.poster} />
                <ReactPlayer url={this.state.preview} controls height="50" width="310"/> 
              </DialogContent>
              <DialogActions>
                <Button type='button' bsStyle="primary" onClick={this.fetchUrl} block>What's Next</Button>
                <Button type='button' data-dismiss="modal" onClick={this.handleCloseDialog} block>Close</Button>
              </DialogActions>
            </Dialog>
        </td>
      </tr>
    );
  }
}

//create a search bar that takes in user input of key word
class SearchForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { searchValue: '' };
    this.handleClick = this.handleClick.bind(this);
    this.handleTyping = this.handleTyping.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  //change user input into state
  handleTyping(event) {
    console.log("the user has typed in:", event.target.value);
    this.setState({ searchValue: event.target.value })
  }

  //search when click
  handleClick(event) {
    this.props.searchFunction(this.state.searchValue);
  }

  //search when hit enter
  onSubmit(event){
    event.preventDefault();
    this.handleClick();
  }

  //make an input bar for search
  render() {
    return (
      <Form inline onSubmit={this.onSubmit}>
        <InputGroup className="col-lg-3" aria-label="Input">
          <InputGroup.Button >
            <Button onClick={this.handleClick}>
              <Glyphicon glyph="search" aria-label="Search" />
            </Button>
          </InputGroup.Button>
          <FormControl type="text" placeholder="Name an Artist..." onChange={this.handleTyping} />
          <InputGroup.Addon> {this.props.artistsFound} results </InputGroup.Addon>
        </InputGroup>
      </Form>
    )
  }
}


export default App; //make this class available to other files (e.g., index.js)