
import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom';

import { createPost} from '../../actions/posts';
import useStyles from './styles';
import Search from '@material-ui/icons/Search';

const Addpost = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: '' });
  const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));
  const [searchString,setSearch]=useState("");
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));
  const posts=useSelector((state)=>(state.posts))
  const history = useHistory();

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    setCurrentId(0);
    setPostData({ title: '', message: '', tags: '', selectedFile: '' });
  };
  const search =  e => {
    e.preventDefault();

     history.push('/users')
  
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

      if(!postData.title ||!postData.message ) {
        alert("please fill the message ")
      }
      else {
      dispatch(createPost({ ...postData, name: user?.result?.name }));}
      clear();
  
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to create post
        </Typography>
      </Paper>
    );
  }

  return (
    <container>
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Editing "${post.title}"` : 'Add a post'}</Typography>
        <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
        <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
        
        
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        {/* <Button variant="contained" color="primary" size="small" onClick={clear} fullWidth>Clear</Button> */}
      </form>
     
    </Paper>
     
      <Paper className={classes.paper}>
        <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} >
    {/* <TextField name="search " variant="outlined" label="search users ..." fullWidth value ={searchString} onChange={e => setSearch(e.target.value)} /> */}
    <Button type="submit" variant="contained" color="primary" size="small" fullWidth  onClick={search}>Search users </Button>
    </form>
    </Paper>
    </container>
  ) 
};

export default Addpost;



