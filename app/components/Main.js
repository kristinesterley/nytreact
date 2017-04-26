// Include React
var React = require("react");

// Here we include all of the sub-components
var Search = require("./children/Search");
var Results = require("./children/Results");
var Saved = require("./children/Saved");

var helpers = require("./utils/helpers");

// Creating the Main component
var Main = React.createClass({


  // Here we set a generic state associated with the number of clicks
  // Note how we added in this history state variable
  getInitialState: function() {
    return { 
      searchQuery: "",
      results: [],
      saved: []
    };
  },

  componentDidMount: function() {
    // Get the latest history.
    helpers.getSavedArticles().then(function(response) {
      console.log(response);
      if (response !== this.state.saved) {
        console.log("saved", response.data);
        this.setState({ saved: response.data });
      }
    }.bind(this));
  },

    componentDidUpdate: function(prevProps, prevState) {
    // If we have a new search term, run a new search
    if (prevState.searchQuery !== this.state.searchQuery) {
      console.log("UPDATED");

      helpers.runQuery(this.state.searchQuery).then(function(data) {
        if (data !== this.state.results) {
          console.log(data);
          this.setState({ results: data });
        }
        // This code is necessary to bind the keyword "this" when we say this.setState
        // to actually mean the component itself and not the runQuery function.
      }.bind(this));
    }
  },
  
  // This function allows childrens to update the parent.
  setParent: function(query) {
    this.setState({ 
      searchQuery: query 
    });
  },

  getSavedArticles(){
    helpers.getSavedArticles();
  },

  //in postSavedArticle and in deleteArticle, I added a callback .then function to change the state with data from a new get on the database that
  // is done in the route. In the route, once the specified article is saved or deleted, I do a redirect to the get route and send back the new
  // array of saved articles in response.data.  Once the state changes, react updates the dom!

  postSavedArticle(article){
    //console.log('this is the saved Article', article)
    helpers.postSavedArticle(article).then(function(response){
      this.setState({saved: response.data});
    }.bind(this));
  },


  deleteArticle(article){
    helpers.deleteArticle(article).then(function(response){
      this.setState({saved: response.data});
    }.bind(this));
  },
  // Here we render the function
  render: function() {
    return (
      <div className="container">

        <div className="panel panel-primary">
          <div className="panel-heading">
            <h2 className="text-center">New York Times Article Search</h2>
            <p className="text-center">
              <em>Search for articles below!</em>
            </p>

          </div>
        </div>
          
        <div className="row">
          <div className="col-md-12">
            <Search setParent={this.setParent} />
          </div>
        </div>

        <div className="row">  
          <div className="col-md-12">
            <Results results={this.state.results} postSavedArticle={this.postSavedArticle} />
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <Saved saved={this.state.saved} deleteArticle={this.deleteArticle} />
          </div>  
        </div>
      
      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Main;



