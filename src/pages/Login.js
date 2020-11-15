import React, { useState } from 'react';
import { withRouter } from "react-router-dom";
import axios from "axios";

import backend from "../ip";

import { makeStyles } from "@material-ui/core/styles";
import InputBase from '@material-ui/core/InputBase';
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';

const Login = ({ history, handleLogin }) => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    try {
      const response = await axios.post(backend+"/auth/login", { 
        username, 
        password 
      });
      const { access_token } = response.data;
      if (access_token) {
        handleLogin(access_token);
        history.push("/home");
      } else {
        console.log("Error");
      } 
    } catch (e) {
      console.log("There are something wrong :(");
    }
  };

  return (
    <div className={classes.container}>
      <h1 style={{ marginBottom: 60 }}>Welcome,</h1>
      <div className={classes.textFieldContainer}>
        <InputBase
          className={classes.textField}
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      </div>
      <div className={classes.textFieldContainer}>
        <InputBase
          className={classes.textField}
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                style={{ width:30, height:30 }}
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              >
                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            </InputAdornment>
          }
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        onClick={() => login()}
      >
        Log in
      </Button>
    </div>
  );
};

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    marginTop: -60
  },
  textFieldContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 348,
    backgroundColor: "#E8EBE6",
    borderRadius: 4,
    marginBottom: 12
  },
  textField: {
    height: 30,
    width: 320
  },
  button: {
    height: 36,
    width: 120,
    color: "white",
    boxShadow: 'none',
    marginTop: 20
  }
});

export default withRouter(Login);
