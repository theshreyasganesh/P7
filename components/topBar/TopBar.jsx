import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material';
import './TopBar.css';
import { withRouter } from "react-router";
import axios from 'axios';

/**
 * Define TopBar, a React component of project #5
 */
class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      version: null,
      loggedInUser: null,
      isDialogOpen: false
    };
  }

  componentDidMount() {
    if (this.props.location.pathname.split("/")[2] !== undefined && this.props.loggedIn){
      this.getUserData();
    }
    this.getVersionData();
    this.getLoggedInUser();
  }
  
  componentDidUpdate(prevProps){
    if (this.props.location.pathname !== prevProps.location.pathname && this.props.location.pathname.split("/")[2] !== undefined && this.props.loggedIn){
      this.getUserData();
    }

    // If login status changes to logged in, get the logged in user's data
    if (this.props.loggedIn !== prevProps.loggedIn && this.props.loggedIn){
      this.getLoggedInUser();
    }
  }

  getUserData() {
    axios.get("http://localhost:3000/user/" + this.props.location.pathname.split("/")[2]).then((response) => {
      this.setState({ user: response.data });
    });
  }

  getLoggedInUser() {
    const uid = localStorage.getItem("uid");
    if (uid !== null) {
      axios.get("http://localhost:3000/user/" + uid).then((response) => {
        this.setState({ loggedInUser: response.data });
      });
    }
  }

  getVersionData(){
    axios.get("http://localhost:3000/test/info").then((response) => {
      this.setState({ version: response.data });
    });
  }

  getPath(){
    return this.props.location.pathname.split("/")[1];
  }

  userContext(){
    if (this.getPath() === "photos") {
      return ("Photos of " + this.state.user.first_name + " " + this.state.user.last_name);
    } else if (this.getPath() === "users"){
      return (this.state.user.first_name + " " + this.state.user.last_name + "'s Profile");
    } else {
      return ("");
    }
  }

  handleLogout = e => {
    e.preventDefault();

    axios.post("http://localhost:3000/admin/logout")
    .then(() => {
      localStorage.removeItem("uid");
      this.props.setLogout();
      if (this.props.location.pathname.split("/")[1] !== "login-register"){
        this.props.history.push("/login-register");
      }
    }).catch(() => {
      console.log("Error logging out");
    });

  };

  handleDialogOpen = () => {
    this.setState({isDialogOpen: true});
  };

  handleDialogClose = () => {
    this.setState({isDialogOpen: false});
  };

  handlePhotoUpload = (e) => {
    e.preventDefault();
    if (this.uploadInput.files.length > 0) {
      // Create a DOM form and add the file to it under the name uploadedphoto
      const domForm = new FormData();
      domForm.append('uploadedphoto', this.uploadInput.files[0]);
      axios.post('/photos/new', domForm)
        .then(() => {
          this.props.setNewPhotoAdded(true);
          this.handleDialogClose();
        })
        .catch(err => console.log(`POST ERR: ${err}`));
    }
  };

  render() {
    return (
      <AppBar className="topbar-appBar" position="absolute">
        <Toolbar className="topbar-toolbar">
          <Typography variant="h5" color="inherit">
             STANN&apos;s Photo Sharing App &nbsp; <br/>
          </Typography>
          <Typography className="topbar-user-context" variant="h5">
            {this.state.user && (this.userContext())}
          </Typography>
          {
            (this.props.loggedIn)
            ? (
            <div>
              {this.state.loggedInUser && (
                <div className="topbar-user-container">
                  <Typography className="topbar-logged-in-user" variant="h5">
                    Hóla, {this.state.loggedInUser.first_name}
                  </Typography>
                  <Button variant="contained" className="topbar-add-photo-button" onClick={this.handleDialogOpen}>
                      Upload Photo
                  </Button>
                  <Button variant="contained" className="topbar-logout-button" onClick={this.handleLogout}>
                      Logout
                  </Button>
                </div>
              )}
            </div>
            ) : (
            <div>
              <Typography variant="h5">
                Please log in.
              </Typography>
            </div>
            )
          }

        </Toolbar>
        <Dialog className="photo-dialog" open={this.state.isDialogOpen} onClose={this.handleDialogClose}>
          <DialogTitle>Add a photo</DialogTitle>
          <DialogContent>
            <input type="file" accept="image/*" ref={(domFileRef) => { this.uploadInput = domFileRef; }} />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDialogClose}>Cancel</Button>
            <Button onClick={this.handlePhotoUpload}>Add</Button>
          </DialogActions>
        </Dialog>
      </AppBar>
    );
  }
}

const TopBarComponent = withRouter(TopBar);

export default TopBarComponent;
