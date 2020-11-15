import React from 'react';
import Moment from 'react-moment';
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const ROLE = {
  ADMIN: "ADMIN",
  USER: "USER"
}

const Comment = ({ 
  postId,
  postAuthor,
  commentId,
  content,
  isEdited,
  timestamp,
  commentAuthor,
  userId,
  userRole,
  getAllPosts
}) => {
  const classes = useStyles();
  const token = JSON.parse(localStorage.getItem('token'));

  const handleDeleteComment = async () => {
    try {
      const response = await axios.delete("http://localhost:3000/post/comment/"+postId+"/"+commentId, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const { message } = response.data;
      if (message) {
        console.log(message);
        getAllPosts();
      } else {
        console.log("DeleteComment Error");
      } 
    } catch (e) {
      console.log("There are something wrong about delete comment :(");
    }
  };
  
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div className={classes.authorDetail}>
          {/* TODO: get username from get post API */}
          <div className={classes.owner}>Username</div>
          { postAuthor &&
            <div className={classes.postAuthor}>
              <div>Author</div>
            </div>
          }
          <Moment className={classes.time} fromNow>{timestamp}</Moment>
        </div>
        { (userRole === ROLE.ADMIN || userId === commentAuthor) &&
          <div>
            <EditIcon className={classes.icon}/>
            <DeleteIcon 
              className={classes.icon} 
              onClick={() => handleDeleteComment()}
            />
          </div>
        }
        { (userId === postAuthor && userId !== commentAuthor) &&
          <DeleteIcon 
              className={classes.icon} 
              onClick={() => handleDeleteComment()}
            />
        }
      </div>
      <div>{content}</div>
      { isEdited &&
        <div className={classes.edited}>Edited</div>
      }
    </div>
  );
};
  
  const useStyles = makeStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#F3F3F3",
      borderRadius: 10,
      padding: "8px 16px",
      marginBottom: 8
    },
    header: {
      display: "flex",
      justifyContent: "space-between"
    },
    owner:{
      fontWeight: 500,
      marginRight: 8,
    },
    time: {
      fontSize: 12,
      color: "#ADAFA9"
    },
    authorDetail: {
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-end",
      marginBottom: 4
    },
    icon: {
      height: 20,
      width: 20,
      color: "#7F817D",
      marginLeft: 8
    },
    postAuthor: {
      display: "flex",
      justifyContent: "center",
      width: 44,
      height: 16,
      backgroundColor: "#5B5B5C",
      borderRadius: 5,
      color: "white",
      fontSize: 12,
      marginRight: 8
    },
    edited: {
      fontSize: 10,
      color: "#ADAFA9",
      fontStyle: "italic",
      marginTop: 2
    }
  });
  
  export default Comment;
  