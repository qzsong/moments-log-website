import React , {useState} from 'react';
import {Grow,Grid} from '@material-ui/core';
import {useLocation } from 'react-router-dom';

import Pagination from '../Pagination';
import Posts from '../Posts/Posts';


import useStyles from "./styles";


function useQuery(){
    return new URLSearchParams(useLocation().search);
}


const Home =()=>{
    const [currentId, setCurrentId] = useState(0);
    const query=useQuery();
    const page=query.get('page') || 1;
    const searchQuery=query.get('searchQuery');

    const classes=useStyles();
    const [tags, setTags]=useState([]);

    return (
        <Grow in>
                {/* <Container maxWidth='xl'> */}
                    <Grid container  justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
                        <Grid item xs={12} sm={12} md={12}> 
                            <Posts setCurrentId={setCurrentId}/>
                            {(!searchQuery && !tags.length) && (
                               
                                <div className={classes.pagination}>
                                    <Pagination className={classes.pagination} page={page}/>
                                </div>
                                
                            )}
                        </Grid> 
                    </Grid>
                {/* </Container> */}
            </Grow>
    );
}

export default Home;



