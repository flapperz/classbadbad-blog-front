import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';

import UserImg from "../assets/user.png";
import Comment from "../components/Comment";

const Post = () => {
  const classes = useStyles();
  
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div className={classes.user}>
          <img 
            className={classes.img}
            src={UserImg}
          />
          <div className={classes.userDetail}>
            <div className={classes.owner}>Username</div>
            <div className={classes.time}>30 mins</div>
          </div>
        </div>
        <div>
          <EditIcon className={classes.icon}/>
          <DeleteIcon className={classes.icon}/>
        </div>
      </div>
      <div>content</div>
      <Divider className={classes.divider}/>
      <Comment/>
      <Comment author={true}/>
      <TextField
        placeholder="Write a comment..."
        variant="outlined"
        size="small"
      />
    </div>
  );
};
  
  const useStyles = makeStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      backgroundColor: "white",
      padding: 16,
      boxShadow: "0.25px 0.5px 2px #DADADA",
      borderRadius: 5
    },
    user: {
      display: "flex",
      flexDirection: "row",
    },
    img: {
      height: 36,
      width: 36,
      marginRight: 8
    },
    userDetail: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between"
    },
    icon: {
      height: 20,
      width: 20,
      color: "#7F817D",
      marginLeft: 8
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 16
    },
    divider: {
      marginTop: 16,
      marginBottom: 16
    },
    owner:{
      fontWeight: 500
    },
    time: {
      fontSize: 12,
      color: "#ADAFA9"
    },
    comment: {
      marginBottom: 8
    }
  });
  
  export default Post;
  