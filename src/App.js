import React, { Component} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

const api_login_url = "https://api.edu.chat/v1/api/login/";
class Welcome extends Component{
  render(){
    return(
      <h1>Welcome to the page {this.props.username}</h1>
    )
  }
}

class Userlogin extends Component{
  state={
      username:"",
      password:"",
      success:false,
      user:"",
  };

  username=(e)=>{
    this.setState({username:e.target.value});
  };

  password=(e)=>{
    this.setState({password:e.target.value});
  };

  onSubmit=(e)=>{
    const user = axios.post(api_login_url, {username: this.state.username , password: this.state.password, platform: "web"})
    .then((response) =>
    (this.setState({success:true}),
    this.setState({user:response.data.results.user.first_name})
))
    .catch(error =>
    {alert("Password Denied to "+this.state.username)
  });
};

  render(){
    if(this.state.success===false){
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
}

export default class App extends Component {
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
