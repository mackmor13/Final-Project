import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import 'whatwg-fetch';

// Sets the basic uri's for the API's
const baseApiUrl = "https://congress.api.sunlightfoundation.com/";
const baseImageUrl = "https://theunitedstates.io/images/congress/225x275/";

// Object that can be exported to other pages for data
var controller = {
    
    // Gets the Congress Contact form
   CongressInfo: function(zip) {
        var senate = 'legislators/locate?zip=' + zip;
        var congress = 'districts/locate?zip=' + zip
        var uri = baseApiUrl + senate;
            return fetch(uri)
            .then(function(res) {
                var congressForm = res.json();
                return congressForm;
            })
        },
    
    //Gets the pokemon's picture'
    GetPictureUrl: function(id){    
      if(id != undefined){
          return baseImageUrl + id.bioguide_id + ".jpg";
      }
    },      
  }

export default controller; 