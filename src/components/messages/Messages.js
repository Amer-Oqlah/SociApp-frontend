import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { AppBar, Typography, Toolbar, Avatar, Button ,Box} from '@material-ui/core';
import { borders } from '@material-ui/system';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import { useSelector } from 'react-redux';
import {fetchUsers,friendsAcc,friendsRef} from '../../actions/users';



const Messages = () => {

    const classes = useStyles();
    const [seavalue, setValue] = useState("");
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    

    const  users = useSelector((state) => state.users) || [];
    let f_requests= user?.result?.friendsRequest;
    let friends= user?.result.friends;
       
   let   filterusers= users?.filter(user=>{
        return f_requests.includes(user._id) && !friends.includes(user._id) 
      })
  console.log(friends)
  useEffect(() => {
     
      dispatch(fetchUsers());
      
    },[location,dispatch]);
    
    const Accept  =  async (e,userID,name) => {
        e.preventDefault();

        await  dispatch(friendsAcc(userID));

     setUser(JSON.parse(localStorage.getItem('profile')))
       history.push("/messages")
    
    }

    const Refuse  =  async  (e,userID,name) => {
        e.preventDefault();
        await  dispatch(friendsRef(userID)); 
        setUser(JSON.parse(localStorage.getItem('profile')))
        history.push("/messages")
        console.log(userID)
    }
    const defaultProps = {
        bgcolor: 'background.paper',
        borderColor: 'text.primary',
        m: 1,
        border: 1,
        style: { width: '30rem', height: '5rem' },
        flexDirection: 'column',
      
      };

    return (
        

        
        <div className={classes.brandContainer}>
             <Typography className={classes.userName} variant="h6">You Got {f_requests.length>0?f_requests.length:"no"} Friend Requests</Typography>
           {filterusers.map((user)=>
          <Box display="flex" justifyContent="center" borderRadius={16} {...defaultProps}>    
    <Toolbar className={classes.toolbar}>
        
         
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user.name} src={user.imageUrl}>{user.name.charAt(0)}</Avatar>
         
            <Typography className={classes.userName} variant="h6">{user.name}</Typography>
           
            <Button variant="contained" className={classes.logout} color="secondary" onClick={(e)=>Refuse(e,user._id)}>Refuse</Button>
            <Button variant="contained" size={'small'} color="primary" onClick={(e)=>Accept(e,user._id)}> Accept</Button>
          </div>
        
    </Toolbar>
           
    </Box>           
                    
           
           )} 

        </div>
    )
}

export default Messages
