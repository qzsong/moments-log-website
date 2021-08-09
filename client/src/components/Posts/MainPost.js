import React from 'react';
import { useSelector } from 'react-redux';
import { Grid} from '@material-ui/core';

import useStyles from './styles';
import Post from './Post/Post';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';




const MainPost=({setCurrentId}) =>{
    const {posts}=useSelector((state)=>state.posts);
    const classes =useStyles();

    const post= posts[Math.floor(Math.random()*posts.length)];

    return (
      
    <React.Fragment>   

    <Paper className={classes.mainFeaturedPost} style={{ backgroundImage: (post.selectedFile.length>0?`url(${post.selectedFile}`:`url('https://source.unsplash.com/random')`)  }}>
      <div className={classes.overlay} />
      <Grid container>
        <Grid item md={6}>
          <div className={classes.mainFeaturedPostContent}>
            <Typography component="h2" variant="h3" color="inherit" gutterBottom>
              {post.title}
            </Typography>
            <Typography variant="h6" color="inherit" paragraph>
              {post.message.split(' ').splice(0, 20).join(' ')} ...
            </Typography>
            
          </div>
        </Grid>
      </Grid>
    </Paper>

    <Grid className={classes.mainContainer} container alignItems="stretch" spacing={3}>
         {posts.map((post)=>(
           <Grid key ={post._id} item xs={12} sm={12} md={6} lg={3}>
                 <Post post={post} setCurrentId={setCurrentId}/>
             </Grid>
         ))}
    </Grid>
    </React.Fragment>
       
  );

}

export default MainPost;