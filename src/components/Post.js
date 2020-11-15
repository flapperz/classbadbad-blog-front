import React, { useState } from 'react';
import Moment from 'react-moment';
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';

import UserImg from "../assets/user.png";
import Comment from "../components/Comment";

const ROLE = {
  ADMIN: "ADMIN",
  USER: "USER"
}

const Post = ({
  postId,
  content,
  authorId,
  authorName,
  timestamp, 
  isEdited, 
  comments,
  userId,
  userRole,
  getAllPosts
}) => {
  const classes = useStyles();
  const token = JSON.parse(localStorage.getItem('token'));
  const [commentContent, setCommentContent] = useState('');

  const handleCreateComment = async () => {
    try {
      const response = await axios.post("http://localhost:3000/post/comment/"+postId, {
        commentMsg: commentContent
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const { message } = response.data;
      if (message) {
        console.log(message);
        setCommentContent('');
        getAllPosts();
      } else {
        console.log("CreateComment Error");
      } 
    } catch (e) {
      console.log("There are something wrong about create comment :(");
    }
  };

  const onTextFiledPressEnter = (e) => {
    if (e.keyCode === 13) {
      handleCreateComment();
    }
  };

  const handleDeletePost = async () => {
    try {
      const response = await axios.delete("http://localhost:3000/post/"+postId, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const { message } = response.data;
      if (message) {
        console.log(message);
        getAllPosts();
      } else {
        console.log("DeletePost Error");
      } 
    } catch (e) {
      console.log("There are something wrong about delete post :(");
    }
  };
  
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div className={classes.user}>
          <img 
            className={classes.img}
            src={UserImg}
          />
          <div className={classes.userDetail}>
            <div className={classes.owner}>{authorName}</div>
            <Moment className={classes.time} fromNow>{timestamp}</Moment>
          </div>
        </div>
        { (userRole === ROLE.ADMIN || userId === authorId) &&
          <div>
            <EditIcon className={classes.icon}/>
            <DeleteIcon 
              className={classes.icon} 
              onClick={() => handleDeletePost()}
            />
          </div>
        }
      </div>
      <div>{content}</div>
      { isEdited &&
        <div className={classes.edited}>Edited</div>
      }
      <Divider className={classes.divider}/>
      { comments.map((comment) => (
        <Comment
          key={comment._id}
          postId={postId}
          postAuthor={authorId}
          commentId={comment._id} 
          content={comment.commentMsg}
          isEdited={comment.isEdited}
          timestamp={comment.timestamp}
          commentAuthor={comment.userId}
          commentAuthorName={comment.username}
          userId={userId}
          userRole={userRole}
          getAllPosts={getAllPosts}
        />
      ))}
      <TextField
        placeholder="Write a comment..."
        variant="outlined"
        size="small"
        value={commentContent}
        onChange={e => setCommentContent(e.target.value)}
        onKeyDown={onTextFiledPressEnter}
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
    },
    edited: {
      fontSize: 10,
      color: "#ADAFA9",
      fontStyle: "italic",
      marginTop: 2
    }
  });
  
  export default Post;
  