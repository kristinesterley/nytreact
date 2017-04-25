// Include React
var React = require("react");


// This is the Saved component. It will be used to show a log of saved articles.
var Saved = React.createClass({

  deleteClick: function(index) {
    var {saved} = this.props;
    // console.log("Here");
    // console.log(this.props);
    var selected = saved[index];

    var article = {
      title: selected.title
    }


    this.props.deleteArticle(article);

  },

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
                        <p className="info" style={{fontSize: 25}}>{search.title} ({new Date(search.date).toDateString()})</p>
                        <a style={{dislay:'inline-block'}} target='_blank' href={search.url}>{search.url}</a>
                        <br/>
                          <button type="button" className="btn btn-default" style={{marginTop: 15}} onClick={()=>this.deleteClick(i)} value={i}>Delete from Saved</button>
                        <br/>
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
module.exports = Saved;



