const apiKey = 'AIzaSyBjgoSC2NkxZpN0ybu5w5ffqQwCSljkEts';
const baseApiUrl = 'https://www.googleapis.com/youtube/v3';

//module with functions to download a model from online
var controller = {
  searchData: function(query) {
    var resource = '/search'
    var uri = baseApiUrl+resource+'?key='+apiKey+'&q='+query+'&part=snippet';
    return fetch(uri)
      .then(function(res) { return res.json()})
  }
}

export default controller;