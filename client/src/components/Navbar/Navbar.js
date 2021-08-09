import React,{useState,useEffect} from 'react';
import {Link,useHistory,useLocation} from 'react-router-dom';
import {Button,Toolbar,Typography} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';



import useStyles from './styles';
import momentsLogo from '../../images/Moments-logo.png';

//new
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import {Modal} from 'react-bootstrap';
import Search from '../Search/Search';
import AddBoxIcon from '@material-ui/icons/AddBox';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Form from '../Form/Form';





const Navbar=() =>{
    const classes=useStyles();
    const [user,setUser]=useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch=useDispatch();
    const history=useHistory();
    const location=useLocation();
    const [currentId, setCurrentId] = useState(0);

   const logout=()=>{
        dispatch({type:'LOGOUT'});
        history.push('/');
        setUser(null);
   }

    useEffect(()=>{
        const token=user?.token;

        if(token){
            const decodedToken=decode(token);

            if(decodedToken.exp * 1000 <new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    },[location]);

    //new 
  const [searchShow, setSearchShow] = useState(false);

  const handleSearchShow = () =>{
    setSearchShow(true);
  } 
  const handleSearchClose= () => setSearchShow(false);


//new
 const [composeShow, setComposeShow] = useState(false);

 const handleComposeShow = () =>{
         setComposeShow((prevShow)=>!prevShow);
 }
 const handleComposeClose= () => setComposeShow(false);

    return (
    <React.Fragment>
        <Toolbar className={classes.toolbar} position ="static" color ="inherit">
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="left"
          noWrap
          className={classes.toolbarTitle}
        >
          <Link to="/" >
                <img src={momentsLogo} alt='icon' height="50px"/>
          </Link>
        </Typography>
    
            <Toolbar className={classes.toolbarLogin}>
                {user ? (
                    <div className={classes.profile}>
                        {/* <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar> */}
                        <Typography className={classes.userName} variant="body1">{user.result.name}</Typography>
                        <IconButton onClick={logout}>
                            <ExitToAppIcon variant="outlined" size="small" className={classes.logout} color="secondary" />
                        </IconButton>
                        
                    
                        <IconButton onClick={handleComposeShow} >
                            <AddBoxIcon color="primary"/>
                        </IconButton>
                        <Modal show={composeShow} onClose={setComposeShow}>
                            <Form currentId={currentId} setCurrentId={setCurrentId}/>

                        <IconButton onClick={handleComposeClose} >
                            <CloseIcon variant="contained" color="default" size="small"/>
                        </IconButton>
                        </Modal>

                    </div>
                ):(
                        <Button component={Link} to="/auth" variant="outlined" size="small" color="primary">Sign in</Button>
                )}
            </Toolbar>
                
        <IconButton onClick={handleSearchShow}>
          <SearchIcon />
        </IconButton>

        {searchShow? (

        <Modal show={searchShow} onClose={handleSearchClose}>
            <Search />
        <IconButton onClick={handleSearchClose} >
            <CloseIcon variant="contained" color="default"/>
        </IconButton>
        </Modal>

        ):null
          }
        
    </Toolbar>
    </React.Fragment>
 
    );
}

export default Navbar;

