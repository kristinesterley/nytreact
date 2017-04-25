// Include React
var React = require("react");


// This is the Saved component. It will be used to show a log of saved articles.
var Saved = React.createClass({
  // Here we describe this component's render method
  render: function() {
    return (
      <div className="panel panel-primary">
        <div className="panel-heading">
          <h3 className="panel-title text-center">Saved Articles</h3>
        </div>
        <div className="panel-body text-left">

              <ul className="list-group">
                {this.props.saved.map( function(search, i){
                  return <div className="resultList" key={i} >
                      <li className="list-group-item" >
                        <p className="info" style={{fontSize: 25}}>{search.title} ({new Date(search.date).getFullYear()})</p>
                        <a style={{dislay:'inline-block'}} target='_blank' href={search.url}>{search.url}</a>
                        <br/>
                      </li>
                    </div>
                  })
                }
              </ul> 
          
        </div>
      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Saved;



