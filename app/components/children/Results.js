// Include React
var React = require("react");

// This is the Results component. It will be used to show articles resulting from the search.
var Results = React.createClass({

  saveClick: function(index) {
    var {results} = this.props;
    var selected = results[index];

    var article = {
      title: selected.headline.main,
      url: selected.web_url,
      date: selected.pub_date

    }
    // console.log("%%%%%%%%%%%%%%");
    // console.log(article);

    this.props.postSavedArticle(article);

  },
  // Here we describe this component's render method
  
  render: function() {
    return (
      <div className="panel panel-primary">
        <div className="panel-heading">
          <h3 className="panel-title text-center">Search Results</h3>
        </div>
        <div className="panel-body text-left">

              <ul className="list-group">
                {this.props.results.map( function(results, index){
                  // console.log("_id", results._id, index)
                  return <div className="resultList" key={results._id} >
                      <li className="list-group-item" >
                        <p className="info" style={{fontSize: 25}}>{results.headline.main} ({new Date(results.pub_date).toDateString()})</p>
                        <p>{results.snippet}</p>
                        <a style={{dislay:'inline-block'}} target='_blank' href={results.web_url}>{results.web_url}</a>
                        <br/>
                        <button type="button" className="btn btn-default" style={{marginTop: 15}} onClick={()=>this.saveClick(index)} value={index}>Save</button>
                      </li>
                    </div>
                  }.bind(this))
                }
              </ul>
       
                 
        </div>
      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Results;