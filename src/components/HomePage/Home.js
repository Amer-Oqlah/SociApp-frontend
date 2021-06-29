import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Container, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { getPosts } from '../../actions/posts';
import decode from 'jwt-decode';
import Posts from '../Posts/Posts';
import Addpost from '../Forms/Addpost';


const Home = () => {
  const [currentId, setCurrentId] = useState(0);


  
  return (
    
    <Grow in>
    <Container>
      <Grid container justify="space-between" alignItems="stretch" spacing={2}>
        <Grid item xs={12} sm={7}>
          <Posts setCurrentId={setCurrentId} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Addpost currentId={currentId} setCurrentId={setCurrentId} />
        </Grid>
      </Grid>
    </Container>
  </Grow>
  );
};

export default Home;