import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import { fetchUsers } from '../../actions/users';




const Navbar = () => {

  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  let f_requests= user?.result?.friendsRequest?.length;
  let friends=user?.result?.friends?.length;

  if(user){
  
       if( f_requests==0) {f_requests="No";}
       if(friends==0){friends="No"}
  } 
   
  const showFriends =()=>{
    history.push('/friends')
  }

  const showMessages = () => {
  
  history.push('/messages')
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });

    history.push('/');

    setUser(null);
  };


  useEffect(() => {
    const token = user?.token;
     dispatch(fetchUsers())
    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
            
    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);
 

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">SociApp</Typography>
        {/* <img className={classes.image} src={memories} alt="icon" height="60" /> */}
      </div>
      <Toolbar className={classes.toolbar}>
        {user?.result ? (
         
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result?.name?.charAt(0)}</Avatar>
         
            <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
           
            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
            <Button variant="contained" size={'small'} color="primary" onClick={showMessages}>{f_requests} Request </Button>
            <Button variant="contained" size={'small'} color="primary" onClick={showFriends}>{friends} Friends</Button>
          </div>
        ) : (
          <Button component={Link} to="/signin" variant="contained" color="primary">Sign In</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;