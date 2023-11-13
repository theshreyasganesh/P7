import React from 'react';
import {
  Divider,
  List,
  ListItem,
  Typography,
}
from '@mui/material';
import { Link } from 'react-router-dom';
import './userList.css';
import axios from 'axios';

/**
 * Define UserList, a React component of project #5
 */
class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: null
    };
  }

  componentDidMount() {
    if (this.props.loggedIn) {
      this.getUsersData();
    }
  }

  componentDidUpdate(prevProps) {
    // If login status changes to logged in, get the logged in user's data
    if (this.props.loggedIn !== prevProps.loggedIn && this.props.loggedIn) {
      this.getUsersData();
    }
  }

  getUsersData() {
    console.log("getUsersData", this.props.loggedIn);
    axios.get("http://localhost:3000/user/list").then((response) => {
      this.setState({ users: response.data });
    });
  }

  render() {
    return (
      <div>
        {this.state.users && (
          <div>
            <Typography variant="h4" sx={{ borderRadius: 8, backgroundColor: '#0077cc', color: 'white', padding: 2, width:'30%' }}>
              Users
            </Typography>
            <List component="nav" className="user-list">
              {this.state.users.map((user) => (
                <div key={user._id}>
                  <ListItem className="user-list-item">
                    <Link to={"/users/" + user._id}>{user.first_name + " " + user.last_name}</Link>
                  </ListItem>
                  <Divider />
                </div>
              ))}
            </List>
          </div>
        )}
      </div>
    );
  }
}

export default UserList;
