'use strict';

import 'whatwg-fetch'; 


var apiKey = "d54e68d87dd145c48d26c2a6287b4e89";
var baseApiUrl = "https://api.spotify.com/";

var controller = {

  //download data from the url
  searchArtist: function (searchQuery) {
    //construct URL
    var resource = 'v1/search';
    var uri = baseApiUrl + resource + '?q=' + searchQuery + '&type=artist&api_key=' + apiKey;
    console.log('fetching from', uri);

    return fetch(uri) 
      .then(function (result) { return result.json(); })
  },

  //get artist images
  getImage: function (artist) {
    if (artist.images.length > 0) {
      if (artist.images[0].url) {
        return artist.images[0].url;
      }
    } else {
      return "http://static1.squarespace.com/static/53c8d09ae4b006756b6ed7f2/t/54f990ede4b05bc84f3a4fb0/1425641711130/questionmark2.jpg";
    }
  },

  //get the top tracks of an artists
  getTopTracks: function (artist) {
    var resource = "v1/artists/";
    var uri = baseApiUrl + resource + artist.id + "/top-tracks?country=US&api_key=" + apiKey;
    return fetch(uri)
      .then(function (result) {
        var promise = result.json();
        return promise;
      })
  },
};

export default controller;