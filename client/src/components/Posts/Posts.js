import React from 'react';
import { useSelector } from 'react-redux';
import { CircularProgress} from '@material-ui/core';


import MainPost from './MainPost';

const Posts=({setCurrentId}) =>{
    const {posts, isLoading}=useSelector((state)=>state.posts);


    if (!posts.length && !isLoading) return 'No posts';
    
    return (
            isLoading? <CircularProgress />:(   
            <MainPost setCurrentId={setCurrentId}/>
            )
 
  );
}

export default Posts;