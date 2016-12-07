const apiKey = 'e3b3008c786d41c0851e15fd23985dab';
const baseApiUrl = 'https://newsapi.org/v1/articles';

//module with functions to download a model from online
var controller = {
    searchData: function(stationID, sortOption) {
        var source = "?source=";
        var sort = "&sortBy=";
        var api = "&apiKey=";
        
        var uri = baseApiUrl+source+stationID+sort+sortOption+api+apiKey;

        // var fetchPromise = fetch();
        // var thenPromise = fetchPromise.then()
        // return thenPromise;


        return fetch(uri)
            .then(function(res) { return res.json()})
    }
}

export default controller;