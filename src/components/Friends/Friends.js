import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { AppBar, Typography, Toolbar, Avatar, Button ,Box} from '@material-ui/core';
import { borders } from '@material-ui/system';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import { useSelector } from 'react-redux';
import {fetchUsers} from '../../actions/users';



const Friends = () => {

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
        return friends.includes(user._id) 
      })

  useEffect(() => {
     
      dispatch(fetchUsers());
      
    },[location,dispatch]);
    
    
    const defaultProps = {
        bgcolor: 'background.paper',
        borderColor: 'text.primary',
        m: 1,
        border: 1,
        style: { width: '20rem', height: '5rem' },
        flexDirection: 'column',
       
      };

    return (
        

        
        <div className={classes.brandContainer}>
             <Typography className={classes.userName} variant="h6">You Got {friends.length>0?friends.length:"no"} Friends </Typography>
           {filterusers.map((user)=>
          <Box display="flex" justifyContent="center" borderRadius={16} {...defaultProps}>    
    <Toolbar className={classes.toolbar}>
        
         
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user.name} src={user.imageUrl}>{user.name.charAt(0)}</Avatar>
         
            <Typography className={classes.userName} variant="h6">{user.name}</Typography>
           
          </div>
        
    </Toolbar>
           
    </Box>           
                    
           
           )} 

        </div>
    )
}

export default Friends