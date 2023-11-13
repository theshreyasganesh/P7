import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter, Route, Switch, Redirect
} from 'react-router-dom';
import {
  Grid, Paper
} from '@mui/material';
import axios from 'axios';
import './styles/main.css';

// import necessary components
import TopBar from './components/topBar/TopBar';
import UserDetail from './components/userDetail/userDetail';
import UserList from './components/userList/userList';
import UserPhotos from './components/userPhotos/userPhotos';
import LoginRegister from './components/loginRegister/LoginRegister';

class PhotoShare extends React.Component {
  constructor(props) {
    super(props);
    this.setLogin = this.setLogin.bind(this);
    this.state = {
      loggedIn: false,
      newPhotoAdded: false
    };
  }

  setLogin = () => {
    this.setState({loggedIn: true});
    console.log("loggedIn: ", this.state.loggedIn);
  };

  setLogout = () => {
    this.setState({loggedIn: false});
    console.log("loggedIn: ", this.state.loggedIn);
  };

  setNewPhotoAdded = (isAdded) => {
    console.log("setnewphotoadded", isAdded);
    this.setState({newPhotoAdded: isAdded});
  };

  componentDidMount() {
    axios.get("http://localhost:3000/admin/loggedin").then((response) => {
      console.log("loggedIn: ", response.data);
      if (response.data === "false"){
        localStorage.removeItem("uid");
      }
      this.setState({ loggedIn: response.data });
    });
  }

  render() {
    return (
      <HashRouter>
      <div>
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <TopBar loggedIn={this.state.loggedIn} setLogin={this.setLogin} setLogout={this.setLogout} setNewPhotoAdded={this.setNewPhotoAdded} newPhotoAdded={this.state.newPhotoAdded}/>
        </Grid>
        <div className="main-topbar-buffer"/>
        <Grid item sm={3}>
          <Paper className="main-grid-item">
            {this.state.loggedIn && <UserList loggedIn={this.state.loggedIn}/>}
          </Paper>
        </Grid>
        <Grid item sm={9}>
          <Paper className="main-grid-item">
            <Switch>
              <Redirect exact path="/" to="/login-register" replace/>
              <Route path="/login-register"
                render={ props => <LoginRegister {...props} setLogin={this.setLogin}/> }
              />
              {
                this.state.loggedIn ? // Change to handle redirect by itself
                  <Route path="/users/:userId" render={ props => <UserDetail {...props} /> }/> 
                  :
                  <Redirect path="/users/:userId" to="/login-register"/>
              }
              {
                this.state.loggedIn ?
                  <Route path="/photos/:userId" render={ props => <UserPhotos {...props} setNewPhotoAdded={this.setNewPhotoAdded} newPhotoAdded={this.state.newPhotoAdded}/> } />
                  :
                  <Redirect path="/photos/:userId" to="/login-register"/>
              }
            </Switch>
          </Paper>
        </Grid>
      </Grid>
      </div>
      </HashRouter>
    );
  }
}


ReactDOM.render(
  <PhotoShare />,
  document.getElementById('photoshareapp'),
);
