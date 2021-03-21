import React from 'react';
import { Link } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import TimelineOutlinedIcon from '@material-ui/icons/TimelineOutlined';
import WbIncandescentTwoToneIcon from '@material-ui/icons/WbIncandescentTwoTone';
import PublishIcon from '@material-ui/icons/Publish';
import { UserContext } from '../../globals';
import LogoWhite from '../../resources/logo11trans-BlackBck-sml.png';
import LogoBlack from '../../resources/logo11trans-whiteBck-sml.png';

export const history = createBrowserHistory();

const useStyles = makeStyles((theme) => ({
  appbar:{
    position: 'static',
    backgroundColor: 'white',
    boxShadow: 'none',
  },
  homeappbar:{
    position: 'static',
    backgroundColor: 'transparent',
    boxShadow: 'none',
  },
  graphButton: {
    marginRight: theme.spacing(2),
    margin: 'auto',
    backgroundColor: 'inherit !important',
  },
  title: {
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
    color: '#FFF',
  },
  linkOther: {
    textDecoration: 'none', 
    color: '#000000',
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const location = useLocation();
  const {loggedIn, _setLoggedIn} = useContext(UserContext);
  let logStatus = 'SIGN IN';

  let url = '/login';
  if (loggedIn) {
    logStatus = 'SIGN OUT';
    url = '/logout';    
  } else {
    logStatus = 'SIGN IN';
    url = '/login';
  }

  return (
    <div className={classes.root}>
      <AppBar className={(location.pathname === '/')? classes.homeappbar : classes.appbar}>
        <Toolbar>
          <Box className={classes.title}>
            <Link to="/" className={(location.pathname === '/')? classes.linkHome : classes.linkOther}>
              {(location.pathname === '/') ? <img src={LogoWhite} /> : <img src={LogoBlack} />}
            </Link>
          </Box>      
          <div className={classes.graphButton}>
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
