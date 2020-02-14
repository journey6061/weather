import React, {Component} from "react";

import Movie from "./Movie";
import classes from "./Movies.module.css";


/* const Movies = ({ list }) => {
  let cards = <h3>Loading...</h3>;


  if (list) {
    cards = list.map((m, i) => <Movie key={i} item={m} 
    onassFather={this.testapp}
    />);
  }

  return (
    <>
    <div className={classes.Container}>
      <div className={classes.ContainerInner}>{cards}</div>
    </div>
    <div>

 
  </div>
    
    </>
  );
}; */

class Movies extends Component {
  state={
    testdata:null
  }

  testapp=(ee)=>{
    
    this.setState({testdata:ee});
    console.log(this.state.testdata);
  }

  render(){
    let cards=<h3>Loading...</h3>;
    if (this.props.list) {
      cards = this.props.list.map((m, i) => <Movie key={i} item={m} 
      onassFather={this.testapp}
      />);
    }

    return(
      <>
    <div className={classes.Container}>
      <div className={classes.ContainerInner}>{cards}</div>
    </div>

    <div>
      {this.state.testdata}
    </div>
    
    
    </>
    )
  }
}

export default Movies;
