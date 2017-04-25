// Include React
var React = require("react");

// Here we include all of the sub-components
var Search = require("./children/Search");
var Results = require("./children/Results");
var Saved = require("./children/Saved");

var helpers = require("./utils/helpers");

// Creating the Main component
var Main = React.createClass({




  // getInitialState: function() {
  //   return { searchTerm: "", results: "" };
  // },

  // // componentDidUpdate is a lifecycle method that will get run every time the component updates it's
  // // props or state
  // componentDidUpdate: function(prevProps, prevState) {
  //   // If we have a new search term, run a new search
  //   if (prevState.searchTerm !== this.state.searchTerm) {
  //     console.log("UPDATED");

  //     helpers.runQuery(this.state.searchTerm).then(function(data) {
  //       if (data !== this.state.results) {
  //         console.log(data);
  //         this.setState({ results: data });
  //       }
  //       // This code is necessary to bind the keyword "this" when we say this.setState
  //       // to actually mean the component itself and not the runQuery function.
  //     }.bind(this));
  //   }
  // },
  // setTerm: function(term) {
  //   this.setState({ searchTerm: term });
  // },


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

  // The moment the page renders get the History
  // componentDidMount: function() {

  //   //not right here
  //   // Get the latest history.
  //   // helpers.getHistory().then(function(response) {
  //   //   console.log(response);
  //   //   if (response !== this.state.history) {
  //   //     console.log("History", response.data);
  //   //     this.setState({ history: response.data });
  //   //   }
  //   // }.bind(this));
  // },

  // // If the component changes (i.e. if a search is entered)...
  // componentDidUpdate: function(prevProps, prevState) {
  //   if (prevState.searchQuery !== this.state.searchQuery){
  //   // Run the query for the address
  //       helpers.runQuery(this.state.searchQuery).then(function(data) {
  //     //if (data !== this.state.results) {
  //       console.log("back in main");
  //       console.log(data);

  //       // this.setState({ results: data }); this causes runQuery to execute again.
  //       

  //       // After we've received the result... then post the search term to our history.
  //       helpers.postHistory(this.state.searchTerm).then(function() {
  //         console.log("Updated!");
  //         // After we've done the post... then get the updated history
  //         helpers.getHistory().then(function(response) {
  //           console.log("Current History", response.data);
  //           console.log("History", response.data);
  //           this.setState({ history: response.data });
  //         }.bind(this));
  //       }.bind(this));
        
  //     //}
  //   }.bind(this));
  // },

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

  postSavedArticle(article){
    //console.log('this is the saved Article', article)
    helpers.postSavedArticle(article);
  },

  getSavedArticles(){
    helpers.getSavedArticles();
  },

  deleteArticle(article){
    helpers.deleteArticle(article);
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


// var Main = React.createClass({

//   // Here we render the component
//   render: function() {

//     return (
//       <div className="container">

//         <div className="row">

//           <div className="jumbotron">
//             <h1>React Router</h1>
//             <p><em>Because we can't afford to miss a minute of this video! #flylikeaneagle</em></p>
//             <a href="#/info"><button className="btn btn-default">Info</button></a>
//             <a href="#/chat"><button className="btn btn-default">Comments</button></a>
//           </div>

//           <div className="row">
//             <div className="text-center">
//               <iframe
//                 width="640"
//                 height="360"
//                 src="https://www.youtube.com/embed/K1lKk5IU4ZE?rel=0&amp;controls=0&amp;showinfo=0"
//               >
//               </iframe>
//             </div>
//           </div>

//           <div className="container">

//             {/* Added this.props.children to dump all of the child components into place */}
//             {this.props.children}

//           </div>
//         </div>

//       </div>
//     );
//   }
// });

// // Export the component back for use in other files
// module.exports = Main;
