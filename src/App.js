import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

const api_login_url = "https://api.edu.chat/v1/api/login/";

const Welcome=React.createClass({
  render:function(){
    return(
      <h1>Welcome to the page {this.props.username}</h1>
    )
  }
});

const Userlogin=React.createClass({

  getInitialState:function(){
    return {
      username:"",
      password:"",
      success:false,
      user:"",
    };
  },

  username:function(e){
    this.setState({username:e.target.value});
  },

  password:function(e){
    this.setState({password:e.target.value});
  },

  onSubmit:function(e){
    const user = axios.post(api_login_url, {username: this.state.username , password: this.state.password, platform: "web"})
    .then((response) =>
    (this.setState({success:true}),
    this.setState({user:response.data.results.user.first_name})))
    .catch(error =>
    {alert("Password Denied to "+this.state.username)
  });
  },

  render:function(){
    if(this.state.success==false){
      return(
        <form onSubmit={this.onSubmit}>
          <br/>Username:<input name="username" placeholder="Username" value={this.state.username} onChange={this.username}/> <br/><br/>
          Password:<input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.password}/> <br/><br/>
          <input type="submit" value="Login"/>
        </form>
    )
  } else {
      return(
        <Welcome username={this.state.user} />
      )
    }
  }
})

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <Userlogin/>

      </div>
    );
  }
}
export default App;
