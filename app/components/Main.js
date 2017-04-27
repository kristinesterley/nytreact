// Include React
var React = require("react");

// Here we include all of the sub-components
var Search = require("./children/Search");
var Results = require("./children/Results");
var Saved = require("./children/Saved");

var helpers = require("./utils/helpers");

// Creating the Main component
var Main = React.createClass({





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
          <p>
            <a href="#/Search" className="btn btn-primary btn-lg">Search</a>
            <a href="#/Saved" className="btn btn-primary btn-lg">Saved Articles</a>
          </p>
          </div>
        </div>
          
        <div className="row">
          <div className="col-md-12">
                  {this.props.children}
            
          </div>
        </div>

        
      
      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Main;



