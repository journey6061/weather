import React from "react";

import Movie from "./Movie";
import classes from "./Movies.module.css";

let handleTemp = (temperature) => {
  /* this.setState({
     temperature:temperature
 })  */
 return(<div>{temperature}</div>)
};

const Movies = ({ list }) => {
  let cards = <h3>Loading...</h3>;

  

  if (list) {
    cards = list.map((m, i) => <Movie key={i} item={m} onassFather={e=>this.handleTemp(e)} />);
  }

  return (
    <>
    <div className={classes.Container}>
      <div className={classes.ContainerInner}>{cards}</div>
    </div>
    <div>
    {this.props.weatherinfo}
    </div>
    
    </>
  );
};

export default Movies;
