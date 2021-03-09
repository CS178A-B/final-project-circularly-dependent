import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
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

export const history = createBrowserHistory();

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
  },
  appbar:{
    position: 'static',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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

  },
  button : {
    color: '#FFF',
    fontFamily: 'Maven Pro',
    fontWeight: 400, 

  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const {loggedIn, setLoggedIn} = useContext(UserContext);
  let logStatus = 'SIGN IN'

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
      <AppBar className={classes.appbar} >
        <Toolbar>
          <Typography variant="h5" className={classes.title}>
            <Link to="/" style={{ textDecoration: 'none', color: '#FFF'  }}>
            {/* <Link to="/" style={{ textDecoration: 'none', color: '#1a063d'  }}> */}
              {/* <Button className={classes.button}> */}
                Capitalizer
              {/* </Button> */}
            </Link>
          </Typography>      
          <div className={classes.graphButton}>
            {/* <Link to="/dashboard" style={{ textDecoration: 'none', color: '#14173d'  }}> */}
            <Link to="/dashboard" style={{ textDecoration: 'none', color: '#FFF'  }}>

              <IconButton  color="inherit" aria-label="menu">
                <TimelineOutlinedIcon />
              </IconButton>
            </Link>

            <Link to="/upload" style={{ textDecoration: 'none', color: '#FFF'  }}>
              <IconButton  color="inherit" aria-label="menu">
                <PublishIcon />
              </IconButton>
            </Link>
            
            <Link to="/aboutUs" style={{ textDecoration: 'none', color: '#FFF'  }}>
              <IconButton  color="inherit" aria-label="menu">
                <WbIncandescentTwoToneIcon />
              </IconButton>
            </Link>
          </div>    

          <Link to={url} style={{ textDecoration: 'none' }}>
            <Button className={classes.button} color="inherit">{logStatus}</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}
