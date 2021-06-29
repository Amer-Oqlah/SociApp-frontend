import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Post from './Post/Post';
import useStyles from './styles';

const Posts = () => {
  const posts = useSelector((state) => state.posts);
  const classes = useStyles();
  const user= JSON.parse(localStorage.getItem('profile'))
  console.log(user)
  return (
    posts.length ? (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {posts.map(function(post) {
          if(user)
          if(post.creator==user.result._id || user.result.friends.includes(post.creator))
        return (
          
          <Grid key={post._id} item xs={6} sm={12} md={6}>
            <Post post={post}/>
          </Grid>
        )})}
      </Grid>
    ):(
         <div></div>
    )
  );
};

export default Posts;