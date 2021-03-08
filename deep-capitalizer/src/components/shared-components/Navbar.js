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
export const history = createBrowserHistory();

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  graphButton: {
    // marginRight: theme.spacing(2),
    margin: 'auto',
    backgroundColor: 'inherit !important',
  },
  title: {
    flexGrow: 1,
    fontFamily : 'Verdana'
  },
  button : {
    color: 'white',
    fontFamily : 'Verdana'

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
      <AppBar position="static">
        <Toolbar>
          <Link to="/dashboard" style={{ textDecoration: 'none', color: '#FFF'  }}>
            <IconButton edge="start" className={classes.graphButton} color="inherit" aria-label="menu">
              <TimelineOutlinedIcon />
            </IconButton>
          </Link>
          <Link to="/upload" style={{ textDecoration: 'none', color: '#FFF'  }}>
            <InsertDriveFileIcon edge="start" className={classes.graphButton} color="inherit" aria-label="menu">
            </InsertDriveFileIcon>
          </Link>
          <Link to="/goal" style={{ textDecoration: 'none', color: '#FFF'  }}>
            <IconButton edge="start" className={classes.graphButton} color="inherit" aria-label="menu">
              <WbIncandescentTwoToneIcon />
            </IconButton>
          </Link>
          <Typography variant="h5" className={classes.title}>
            <Link to="/" style={{ textDecoration: 'none', color: '#FFF'  }}>
              {/* <Button className={classes.button}> */}
                Deep Capitalizer
              {/* </Button> */}
            </Link>
          </Typography>
          <Link to={url} style={{ textDecoration: 'none', color: '#FFF'  }}>
            <Button className={classes.button} color="inherit">{logStatus}</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}
