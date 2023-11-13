import React from 'react';
import './LoginRegister.css';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';

class LoginRegister extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      login_name: "",
      login_password: "",
      login_error_message: "",
      register_username: "",
      register_first_name: "",
      register_last_name: "",
      register_location: "",
      register_description: "",
      register_occupation: "",
      register_password1: "",
      register_password2: "",
      register_error_message: "",
      show_login: true
    };
  }

  setLoginName = e => {
    this.setState({login_name: e.target.value});
  };

  setLoginPassword = e => {
    this.setState({login_password: e.target.value});
  };

  setRegisterUsername = e => {
    this.setState({register_username: e.target.value});
  };

  setRegisterFirstName = e => {
    this.setState({register_first_name: e.target.value});
  };

  setRegisterLastName = e => {
    this.setState({register_last_name: e.target.value});
  };

  setRegisterLocation = e => {
    this.setState({register_location: e.target.value});
  };

  setRegisterDescription = e => {
    this.setState({register_description: e.target.value});
  };

  setRegisterOccupation = e => {
    this.setState({register_occupation: e.target.value});
  };

  setRegisterPassword1 = e => {
    this.setState({register_password1: e.target.value});
  };

  setRegisterPassword2 = e => {
    this.setState({register_password2: e.target.value});
  };

  setShowLogin = (showLogin) => {
    this.setState({show_login: showLogin});
  };

  handleLogin = e => {
    e.preventDefault();

    console.log("username", this.state.login_name);
    console.log("password", this.state.login_password);
    
    axios.post("http://localhost:3000/admin/login", {
      login_name: this.state.login_name,
      password: this.state.login_password
    }).then((response) => {
      console.log(response);
      const uid = response.data._id;

      this.setState({login_error_message: ""});
      localStorage.setItem("uid", uid); // Keep logged in user's uid in localStorage to persist login on refresh, etc

      this.props.setLogin();
      this.props.history.push("/users/" + uid);
    }).catch(() => {
      this.setState({login_error_message: "Incorrect username or password"});
    });
  };

  handleRegister = e => {
    e.preventDefault();

    // Validate fields
    this.setState({register_error_message: ""});

    if (this.state.register_username === "") {
      this.setState({register_error_message: "Username cannot be empty."});
      return;
    } else if (this.state.register_first_name === "") {
      this.setState({register_error_message: "First name cannot be empty."});
      return;
    } else if (this.state.register_last_name === "") {
      this.setState({register_error_message: "Last name cannot be empty."});
      return;
    } else if (this.state.register_password1 === "") {
      this.setState({register_error_message: "Password cannot be empty."});
      return;
    } else if (this.state.register_password2 === "") {
      this.setState({register_error_message: "Password verification cannot be empty."});
      return;
    }

    if (this.state.register_password1 !== this.state.register_password2) {
      this.setState({register_error_message: "Passwords do not match."});
      return;
    }

    // console.log("username", this.state.register_username);
    // console.log("first name", this.state.register_first_name);
    // console.log("last name", this.state.register_last_name);
    // console.log("location", this.state.register_location);
    // console.log("description", this.state.register_description);
    // console.log("occupation", this.state.register_occupation);
    // console.log("password", this.state.register_password1);
    // console.log("verify password", this.state.register_password2);

    axios.post("http://localhost:3000/user", {
      login_name: this.state.register_username,
      first_name: this.state.register_first_name,
      last_name: this.state.register_last_name,
      location: this.state.register_location,
      description: this.state.register_description,
      occupation: this.state.register_occupation,
      password: this.state.register_password1
    }).then((response) => {
      console.log(response);
      const uid = response.data._id;

      this.setState({register_error_message: ""});
      localStorage.setItem("uid", uid); // Keep logged in user's uid in localStorage to persist login on refresh, etc

      this.props.setLogin();
      this.props.history.push("/users/" + uid);
    }).catch((error) => {
      if (error.response) {
        this.setState({register_error_message: error.response.data});
      }
      
    });

  };

  render() {
    return (
      <div className="login-register">
        {this.state.show_login ? (
        <Box component="form" className="login-box" sx={{ boxShadow: 3 }}>
          <Typography component="h1" className="login-header">Sign In</Typography>
          <TextField label="Username" variant="standard" value={this.state.login_name} onChange={this.setLoginName} className="login-login-name"/>
          <TextField label="Password" variant="standard" value={this.state.login_password} onChange={this.setLoginPassword} className="login-password" type="password"/>
          <Button type="submit" variant="contained" className="login-button" onClick={this.handleLogin}>Login</Button>
          <Button className="login-register-button" onClick={() => this.setShowLogin(false)}>Are you a new user? Create a new account here!</Button>
          {this.state.login_error_message !== "" && <Typography component="h1" className="login-error">{this.state.login_error_message}</Typography>}
        </Box>
        ) : (
        <Box component="form" className="register-box" sx={{ boxShadow: 3 }}>
          <Typography component="h1" className="register-header">Register</Typography>
          <Grid container className="register-field-container">
            <Grid item xs={6}>
              <TextField label="Username" variant="standard" value={this.state.register_username} onChange={this.setRegisterUsername} className="register-field"/>
            </Grid>
            <Grid item xs={6}>
              <TextField label="First name" variant="standard" value={this.state.register_first_name} onChange={this.setRegisterFirstName} className="register-field"/>
            </Grid>
            <Grid item xs={6}>
              <TextField label="Last name" variant="standard" value={this.state.register_last_name} onChange={this.setRegisterLastName} className="register-field"/>
            </Grid>
            <Grid item xs={6}>
              <TextField label="Location" variant="standard" value={this.state.register_location} onChange={this.setRegisterLocation} className="register-field"/>
            </Grid>
            <Grid item xs={6}>
              <TextField label="Description" variant="standard" value={this.state.register_description} onChange={this.setRegisterDescription} className="register-field"/>
            </Grid>
            <Grid item xs={6}>
              <TextField label="Occupation" variant="standard" value={this.state.register_occupation} onChange={this.setRegisterOccupation} className="register-field"/>
            </Grid>
            <Grid item xs={6}>
              <TextField label="Password" variant="standard" value={this.state.register_password1} onChange={this.setRegisterPassword1} className="register-field" type="password"/>
            </Grid>
            <Grid item xs={6}>
              <TextField label="Verify Password" variant="standard" value={this.state.register_password2} onChange={this.setRegisterPassword2} className="register-field" type="password"/>
            </Grid>
          </Grid>
          <Grid container className="register-button-container">
            <Grid item xs={6}>
              <Button variant="contained" className="register-login-button" onClick={() => this.setShowLogin(true)}>Go to Login</Button>
            </Grid>
            <Grid item xs={6}>
              <Button type="submit" variant="contained" className="register-button" onClick={this.handleRegister}>Register Me</Button>
            </Grid>
          </Grid>
          {this.state.register_error_message !== "" && <Typography component="h1" className="register-error">{this.state.register_error_message}</Typography>}
        </Box>
        )}
      </div>
    );
  }
}

export default LoginRegister;