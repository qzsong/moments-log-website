import React , {useState} from 'react';
import {AppBar,TextField,Button} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import {getPostsBySearch} from '../../actions/posts';
import { useHistory,useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import useStyles from "../Home/styles";

function useQuery(){
    return new URLSearchParams(useLocation().search);
}


const Search =()=>{
    const dispatch=useDispatch();
    const query=useQuery();
    const history=useHistory();

    const classes=useStyles();
    const [search, setSearch]=useState('');
    const [tags, setTags]=useState([]);


    const searchPost=()=>{
        if(search.trim() || tags){
            dispatch(getPostsBySearch({search,tags:tags.join(',')}));
            history.push(`./posts/search?searchQuery=${search} || 'none'}&tags=${tags.join(',')}`);

        }else{
            history.push('/');
        }
    }

    const handleKeyPress =(e)=>{
        if(e.keyCode===13){
            //press enter and search
            searchPost();
        }
    };

    const handleAdd =(tag) =>setTags([...tags,tag]);

    const handleDelete=(tagToDelete)=>setTags(tags.filter((tag)=>tag!==tagToDelete));

    

    return (
            <AppBar className={classes.appBarSearch} position="static" color="inherit" elevation={0}>
                            <TextField 
                            name="search" 
                            variant="outlined"
                            label="Search Memories"
                            onKeyPress={handleKeyPress}
                            fullWidth
                            value={search}
                            onChange={(e)=>setSearch(e.target.value)} />
                        <ChipInput
                        style={{margin:'10px 0'}}
                        value={tags}
                        onAdd={handleAdd}
                        onDelete={handleDelete}
                        label="Search Tags"
                        variant="outlined"
                        />
                        <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">Search</Button>
                        </AppBar>
 
    );
}

export default Search;


