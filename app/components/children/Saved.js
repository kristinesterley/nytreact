// Include React
var React = require("react");


// This is the Saved component. It will be used to show a log of  recent searches.
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




           {/* Here we use a map function to loop through an array in JSX */}
         
       {/*   // {this.props.saved.map(function(search, i) {
          //   return (
          //     <p key={i}>{search.title}</p>
          //   );
          // })} 
        */}  
          
        </div>
      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Saved;



// var Chat = React.createClass({

//   // Here we render the component
//   render: function() {

//     return (

//       <div className="container">

//         <div className="row">

//           <div className="col-lg-12">

//             <div className="panel panel-default">
//               <div className="panel-heading">
//                 <h3 className="panel-title">Saved Article</h3>
//               </div>
//               <div className="panel-body">
//                 <p><strong>mjlover:</strong> OMG I LOVE THIS PART!!! </p>
//                 <p><strong>bugsboy:</strong> Best movie of all time.</p>
//                 <p><strong>bigtroll:</strong> Porky needs to go on a diet.</p>
//               </div>
//             </div>

//           </div>

//         </div>

//       </div>
//     );
//   }
// });

// // Export the component back for use in other files
// module.exports = Chat;
