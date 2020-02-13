import React, { Component } from "react";
import axios from "axios";

import classes from "./Movie.module.css";
import { truncStr } from "./utils";
import { search } from "./utils";
import Post from './Post'


class MovieCard extends Component{
  state={
    geo: null,
    geoloading: false,
    geovalue: null,
    coordinate:null,
    location:null,
    weatherinfo:null,
    testopen:null,
  }


 /* 分部axios
 
 getUserAccount() {
    return axios.get('https://api.weather.gov/points/' + this.state.geovalue[0]+','+this.state.geovalue[1]);
  }
  
  getUserPermissions() {
    return axios.get('/user/12345/permissions');
  } */
  
  

  componentDidUpdate () {


    if ( this.state.geoloading ) {
        //if(!this.state.weatherinfo||(this.state.weatherinfo && this.state.weatherinfo[1]!==this.props.item.location.lat)){

          if(this.state.testopen===null||(this.state.testopen && this.props.item.location.lat!==this.state.testopen)){
      /* if  
        (this.state.weatherinfo && 
          this.state.weatherinfo.lat !== this.props.item.location.lat && 
          this.state.weatherinfo.lng !== this.props.item.location.lng){ */


      console.log(this.state.geovalue[0]);
        //if ( !this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.id) ) {
            //axios.get( 'https://api.weather.gov/points/39.7456,-97.0892' )
            axios.get( 'https://api.weather.gov/points/' + this.state.geovalue[0]+','+this.state.geovalue[1])
            //.get( 'https://api.weather.gov/points/' + this.state.geovalue[0]+','+this.state.geovalue[1])
                .then( response => {
                     console.log(response);
                     let secondlink=response.data.properties.forecast;
                     console.log(secondlink)
                     axios.get( secondlink)
                     .then(
                       res=>{
                        console.log(res)
                        this.setState({weatherinfo: res.data.properties.periods[0]})
                        console.log(this.state.weatherinfo)


                        //传给父

                        this.props.onassFather(this.state.weatherinfo.name)

                        //set state here 

                       }
                     )
                    //this.setState( { loadedPost: response.data } );
                } );
        //}

        /* axios.all([getUserAccount(), getUserPermissions()])
    .then(axios.spread(function (acct, perms) {
      // Both requests are now complete
    })); */
    this.setState({testopen:this.state.geovalue[0]})
    }
   
  
}
  }

  //sendWeatherDate = async e => {
    testsendWeatherDate = async e => {
   /*  this.search(e.target.value);
    this.setState({ value: e.target.value }); */
    //console.log(this.props.item.location.lat);
      //this.setState({coordinate: [this.props.item.location.lat, this.props.item.location.lng]})
    //this.setState({ geoloading: true });
    const results = await search(
      `https://api.weather.gov/points/${e.lat},${e.lng}`
      
      //https://api.weather.gov/points/39.7456,-97.0892


      //`https://api.themoviedb.org/3/search/movie?query=${val}&api_key=dbc0a6d62448554c27b6167ef7dabb1b`
      //curl "https://api.geocod.io/v1.4/geocode?q=1109+N+Highland+St%2c+Arlington+VA&api_key=YOUR_API_KEY"

    );
    const geo = results;

    console.log(results);

    //this.setState({ geo, geoloading: false });
    
  };


  search = async val => {
    this.setState({ geoloading: true });
    const results = await search(
      //`https://api.geocod.io/v1.4/geocode?q=${val}&api_key=25de1572225915e7eee55d929d76e4e65e61e62`

      `https://api.weather.gov/points/${val.lat},${val.lng}`

      //`https://api.themoviedb.org/3/search/movie?query=${val}&api_key=dbc0a6d62448554c27b6167ef7dabb1b`
      //curl "https://api.geocod.io/v1.4/geocode?q=1109+N+Highland+St%2c+Arlington+VA&api_key=YOUR_API_KEY"

    );
    /* const movies = results;

    this.setState({ movies, loading: false }); */
    console.log(results)
  };


  /* sendWeatherDate = async e => {
    this.search(e);
   // this.setState({ value: e.target.value });
  }; */

  sendWeatherDate = (test1, test2) => {
    //this.search(e);
   // this.setState({ value: e.target.value });


   this.setState({ geoloading: true });
   this.setState({ geovalue: [test1, test2]});
 
   
  };


  render() {
    const { accuracy_type, location, formatted_address } = this.props.item;


    let posts = <p style={{textAlign: 'center'}}>loading!</p>;
        if (this.state.weatherinfo) {
            /* posts = this.state.weatherinfo.data.properties.periods.map(post => {
                return <Post 
                    key={post.number} 
                    title={post.name} 
                    author={post.temperature}
                     
                    />;
            }); */
            posts = <Post 
                  key={this.state.weatherinfo.number} 
                  title={this.state.weatherinfo.temperature} 
                  author={this.state.weatherinfo.name}
                   
                  />;
        }
    
    /* let posts = location.map(loc => {
      return (
        <>
        <h1>{loc.lat}</h1>
        <div className="">
            <div className="">{loc.lng}</div>
        </div>
        </>
      )
  }); */
  return (
    <>
    <div
      className={classes.Container}
      /* style={{
        backgroundImage:
          poster_path && `url(http://image.tmdb.org/t/p/w185${poster_path})`
      }} */
      //onClick={e => this.sendWeatherDate(e)}
      //onClick={this.sendWeatherDate(this.props.item.location)}
      onClick={()=>this.sendWeatherDate(this.props.item.location.lat, this.props.item.location.lng)}
    >
      <div className={classes.VoteContainer}>
        <span className={classes.Vote}>{formatted_address}</span>
      </div>
      <p>{location.lat}</p>

      <div className={classes.Bottom}>
{/*         <h3 className={classes.Title}>{truncStr(accuracy_type, 19)}</h3>
 */}        <h3 className={classes.Title}>{accuracy_type}</h3>

      </div>
    </div>
    <div>
     {posts}
     </div>
    </>
  );
}
} 


export default MovieCard;
