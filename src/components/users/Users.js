
import { Grid, CircularProgress } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import useStyles from './styles';
import {fetchUsers} from '../../actions/users';
import {useDispatch} from 'react-redux';
import { Card, CardActions, CardContent, CardMedia,  } from '@material-ui/core/';
import { Container, Grow } from '@material-ui/core';
import {friendsReq} from '../../actions/users';
import AlertDialog from './popup';



const Users = () => {
    const dispatch = useDispatch();
   const users = useSelector((state) => state.users) || [];
  const classes = useStyles();
  const [searchString,setSearch]= useState("");
  const history = useHistory();
  const User = JSON.parse(localStorage.getItem('profile'));
  
  let filteresSearch =users;
  
    

     useEffect(() => {
     
      dispatch(fetchUsers());

   
    },[dispatch]);
  
 
  const sendReqquestTo = async (e,userID,name) => {
    // dispatch update message  action from controller
    e.preventDefault();
    if(User.result.friendsRequest.includes(userID)){
      alert("you have already a friend request from this user ")
      history.push('/messages')
    }
    else{
    dispatch(friendsReq(userID))
    alert("Friend request been sent ")
    }
  }
  
 if(users.length){
filteresSearch = users.filter(user=>{
  return user.name.toLowerCase().includes(searchString.toLowerCase())
  && (user.name!==User?.result.name) && (user?.friendsRequest.indexOf(User.result._id)==-1)
  && (user?.friends.indexOf(User.result._id)==-1)
})
}
if (!User?.result?.name) {
  return (
    
    <Paper className={classes.paper}>
      <Typography variant="h6" align="center">
        Please Sign In to search users
      </Typography>
  
    </Paper>
  
 
  );
}

     return  (
    <Grid>
        <div margin="auto">
  
    <form autoComplete="off" noValidate align="center">
    <TextField label ="search users"variant="outlined" name="search"  margin="normal" value ={searchString} onChange={e => setSearch(e.target.value)} />

</form>
</div> 
<Container item margin='auto'>  
  <div align="center" style={{padding:'25px'}}> 
     <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        
           {
           filteresSearch.map((user) => (
            <div align="center"> 
<Grid key={user._id} item xs={6} sm={6} md={8} >
      <Card className={classes.card} >
       <CardMedia className={classes.media} />
        <Typography className={classes.title} gutterBottom variant="h5" component="h5"></Typography>
        <CardContent>
         <Typography  variant="body2" color="textSecondary" component="p"></Typography>
       </CardContent>
       <CardActions className={classes.cardActions}>
         <Button  size="medium" color="textPrimary" onClick={ (e) => sendReqquestTo(e,user._id,user.name) }>Send @{user.name}</Button>
        </CardActions> 
      </Card>
 </Grid>
 </div>                                  )                  
                                         )                            
                                            }
                                         
         </Grid>                          
      
       </div>
           
       </Container>
         </Grid>
  )
  
};

export default Users;





