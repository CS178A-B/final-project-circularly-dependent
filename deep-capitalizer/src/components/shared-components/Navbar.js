import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import MenuIcon from '@material-ui/icons/Menu';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import TimelineOutlinedIcon from '@material-ui/icons/TimelineOutlined';
import { createBrowserHistory } from 'history';
import { Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../globals'
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import WbIncandescentTwoToneIcon from '@material-ui/icons/WbIncandescentTwoTone';
import InsertChartIcon from '@material-ui/icons/InsertChart';
import PublishIcon from '@material-ui/icons/Publish';
import { useLocation } from 'react-router-dom';
import LogoWhite from '../../resources/logo11trans-BlackBck-sml.png';
import LogoBlack from '../../resources/logo11trans-whiteBck-sml.png';

export const history = createBrowserHistory();

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
  },
  appbar:{
    position: 'static',
    backgroundColor: 'white',
    //backgroundColor: 'rgba(0, 0, 0, 1)',
    // opacity: 0.5,
    boxShadow: 'none',
  },
  homeappbar:{
    position: 'static',
    backgroundColor: 'transparent',
    // opacity: 0.5,
    boxShadow: 'none',
  },
  graphButton: {
    marginRight: theme.spacing(2),
    margin: 'auto',
    backgroundColor: 'inherit !important',
  },
  title: {
    // flexGrow: 1,
    fontFamily: 'Maven Pro', 
    fontWeight: 700, 
    marginTop: 7,
    marginLeft: 5,
  },
  loginHome: {
    color: '#FFF',
    fontFamily: 'Maven Pro',
    fontWeight: 400, 
    textDecoration: 'none', 
  }, 
  loginOther: {
    color: '#000000',
    fontFamily: 'Maven Pro',
    fontWeight: 400, 
    textDecoration: 'none', 
  }, 
  linkHome: {
    textDecoration: 'none', 
    color: '#FFF'  
  },
  linkOther: {
    textDecoration: 'none', 
    color: '#000000'  
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const {loggedIn, setLoggedIn} = useContext(UserContext);
  const location = useLocation();
  let logStatus = 'SIGN IN';

  let url = '/login'
  if (loggedIn) {
    logStatus = 'SIGN OUT'
    url = '/logout'    
  } else {
    logStatus = 'SIGN IN'
    url = '/login'
  }

  return (
    <div className={classes.root}>
      <AppBar className={(location.pathname === '/')? classes.homeappbar : classes.appbar} >
        <Toolbar>
          <Box className={classes.title}>
            <Link to="/" className={(location.pathname === '/')? classes.linkHome : classes.linkOther}>
              {(location.pathname === '/') ? <img src={LogoWhite} /> : <img src={LogoBlack} />}
            </Link>
          </Box>      
          <div className={classes.graphButton}>
            {/* <Link to="/dashboard" style={{ textDecoration: 'none', color: '#14173d'  }}> */}
            <Link to="/dashboard" className={(location.pathname === '/')? classes.linkHome : classes.linkOther}>

              <IconButton  color="inherit" aria-label="menu">
                <TimelineOutlinedIcon />
              </IconButton>
            </Link>

            <Link to="/upload" className={(location.pathname === '/')? classes.linkHome : classes.linkOther}>
              <IconButton  color="inherit" aria-label="menu">
                <PublishIcon />
              </IconButton>
            </Link>
            
            <Link to="/aboutUs" className={(location.pathname === '/')? classes.linkHome : classes.linkOther}>
              <IconButton  color="inherit" aria-label="menu">
                <WbIncandescentTwoToneIcon />
              </IconButton>
            </Link>
          </div>    

          <Link to={url} className={(location.pathname === '/')? classes.loginHome : classes.loginOther}>
            <Button className={classes.button} color="inherit">{logStatus}</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}
