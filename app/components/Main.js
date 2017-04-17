// Include React
var React = require("react");

var Main = React.createClass({

  // Here we render the component
  render: function() {

    return (
      <div className="container">

        <div className="row">

          <div className="jumbotron">
            <h1>React Router</h1>
            <p><em>Because we can't afford to miss a minute of this video! #flylikeaneagle</em></p>
            <a href="#/info"><button className="btn btn-default">Info</button></a>
            <a href="#/chat"><button className="btn btn-default">Comments</button></a>
          </div>

          <div className="row">
            <div className="text-center">
              <iframe
                width="640"
                height="360"
                src="https://www.youtube.com/embed/K1lKk5IU4ZE?rel=0&amp;controls=0&amp;showinfo=0"
              >
              </iframe>
            </div>
          </div>

          <div className="container">

            {/* Added this.props.children to dump all of the child components into place */}
            {this.props.children}

          </div>
        </div>

      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Main;
