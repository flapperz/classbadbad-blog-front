import React, { useEffect, useState } from 'react';
import { withRouter } from "react-router-dom";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import UserImg from "../assets/user.png";
import Post from "../components/Post";

const ROLE = {
  ADMIN: "ADMIN",
  USER: "USER"
}

const Home = ({ history }) => {
  const classes = useStyles();
  const token = JSON.parse(localStorage.getItem('token'));
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const [userRole, setUserRole] = useState('');
  const [allPosts, setAllPosts] = useState([]);

  const getProfile = async () => {
    try {
      const response = await axios.get("http://localhost:3000/profile", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const { userId, username, role } = response.data;
      if (userId) {
        setUserId(userId);
        setUsername(username);
        if (role == 0) {
          setUserRole(ROLE.ADMIN);
        } else {
          setUserRole(ROLE.USER);
        }
      } else {
        console.log("GetProfile Error");
      } 
    } catch (e) {
      console.log("There are something wrong about get profile :(");
    }
  };

  const getAllPosts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/post", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.data) {
        setAllPosts(response.data);
      } else {
        console.log("GetPost Error");
      } 
    } catch (e) {
      console.log("There are something wrong about get post :(");
    }
  };

  useEffect(() => {
    getProfile();
    getAllPosts();
  }, []);

  return (
    <div>
      <div className={classes.navBar}>
        <div style={{ marginRight: 12 }}>{username},</div>
        <Button
          className={classes.logoutButton}
          variant="contained"
          color="primary"
          onClick={() => history.push("/login")}
        >
          Log out
        </Button>
      </div>
      <div className={classes.container}>
        <div className={classes.post}>
          <img 
            className={classes.img}
            src={UserImg}
          />
          <TextField
            className={classes.textField}
            placeholder="Say something, username."
            multiline
            rowsMax={4}
            variant="outlined"
            size="small"
          />
        </div>
        <Button
          className={classes.postButton}
          variant="contained"
          color="primary"
          onClick={() => {
            // history.push("/login")
          }}
        >
          Post
        </Button>
        { allPosts.map((post) => (
          <div style={{ marginBottom: 12 }}> 
            <Post 
              key={post._id}
              content={post.message}
              authorId={post.userId}
              timestamp={post.timestamp} 
              isEdited={post.isEdited}
              comments={post.comments}
              userId={userId}
              userRole={userRole}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexGrow: 1,
    flexDirection: "column",
    padding: "32px 165px",
    backgroundColor: "#F9F9F9",
  },
  navBar: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100vw",
    height: 48,
    boxShadow: "inset 0 0 1px #353736",
  },
  logoutButton: {
    height: 32,
    width: 100,
    color: "white",
    boxShadow: 'none',
    marginRight: 16
  },
  postButton: {
    height: 32,
    width: 80,
    color: "white",
    boxShadow: 'none',
    alignSelf: "flex-end",
    marginTop: 8,
    marginBottom: 24
  },
  img: {
    display: "flex",
    alignSelf: 'flex-start',
    height: 48,
    width: 48,
    marginRight: 16
  },
  textField: {
    width: "100vw",
  },
  post: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  }
});

export default withRouter(Home);
