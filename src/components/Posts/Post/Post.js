import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';

import useStyles from './styles';

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    
  
     <Card className={classes.card}>
      <CardMedia className={classes.media}  title={post.title} />
     <div className={classes.overlay}>
     <Typography variant="h6">{post.name}</Typography>
    <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
      </div>
       <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
       <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" ><ThumbUpAltIcon fontSize="small" /> Like {post.likeCount} </Button>
     
       </CardActions> 
     </Card>
  )
};

export default Post;