// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require("axios");

// ny times api key
// var authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";
var authKey = "48b8bf0add7440d29814f6e7c9ab194a";
var beginQueryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key="+authKey;


// Helper functions for making API Calls
var helpers = {

  // This function serves our purpose of running the query to geolocate.
  runQuery: function(endQueryURL) {
    console.log("endQueryURL");
    console.log(endQueryURL);

    // create queryURL
    var queryURL = beginQueryURL+endQueryURL
    return axios.get(queryURL).then(function(response) {
      // console.log("axios get(queryURL) response");
      // console.log(response.data.response.docs);

      if (response.data.response.docs) {

        return response.data.response.docs;

      }
      // If we don't get any results, return an empty string
      console.log("error")
      return "";
    });
  },

  // This function hits our own server to retrieve the record of query results
  getSavedArticles: function() {
    return axios.get("/api")
                .then(function(res){
                  return res
                })
  },

  // This function posts new searches to our database.
  postSavedArticle: function(article) {
    // console.log("article passed in to helpers.postSavedArticle");
    // console.log(article);
    return axios.post("/api", article);
  },

    // This function posts new searches to our database.
  deleteArticle: function(article) {
    // console.log("article passed in to helpers.postSavedArticle");
    // console.log(article);
    return axios.post("/api/delete", article);
  }

};

// We export the API helper
module.exports = helpers;
