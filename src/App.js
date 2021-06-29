import React ,{useEffect,useState} from 'react';
import {Container ,AppBar,Typography,Grow,Grid} from '@material-ui/core'
import {useDispatch} from 'react-redux';
import { fetchUsers } from './actions/users';
import {getPosts} from './actions/posts'
import Posts from './components/Posts/Posts';
import useStyles from './styles';
import Addpost from './components/Forms/Addpost';
import Navbar from './components/Navbar/Navbar';
import Signin from  './components/Forms/Signin' 
import Signup from  './components/Forms/Signup' 
import Home from './components/HomePage/Home';
import {BrowserRouter,Switch,Route } from 'react-router-dom';
import Users from './components/users/Users';
import Messages from './components/messages/Messages';
import Friends from './components/Friends/Friends';



const App =() =>{
    const classes = useStyles();

    const dispatch = useDispatch();
   
    const user= JSON.parse(localStorage.getItem('profile'));
    console.log(user)

       useEffect(() => {
     
    dispatch(getPosts());
   
   
  }, [dispatch]);
    return (
     
      <BrowserRouter> 

       <Container item margin='auto'>
         <div>
        <Navbar/>
     
        <Switch> 
        <Route path="/Signin" exact component ={Signin}/>
        <Route path="/Signup" exact component ={Signup}/>
        <Route path="/users" exact component ={Users}/>
        <Route path="/messages" exact component ={Messages}/>
        <Route path="/friends" exact component ={Friends}/>
          <Route exact path="/" component={Home} />
       
      
      </Switch>
   
      </div>
      </Container>
    </BrowserRouter>
    );
  
}
export default App ;

