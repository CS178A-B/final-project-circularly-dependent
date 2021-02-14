import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import TimelineOutlinedIcon from '@material-ui/icons/TimelineOutlined';
import { createBrowserHistory } from 'history';
import { Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../globals'
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';

export const history = createBrowserHistory();

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  graphButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const {value, setValue} = useContext(UserContext);
  let logStatus = 'SIGN IN'

  let url = '/login'
  if (value) {
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
          <Link to="/visualization" style={{ textDecoration: 'none', color: '#FFF'  }}>
            <IconButton edge="start" className={classes.graphButton} color="inherit" aria-label="menu">
              <TimelineOutlinedIcon />
            </IconButton>
          </Link>
          <Link to="/upload" style={{ textDecoration: 'none', color: '#FFF'  }}>
            <InsertDriveFileIcon edge="start" className={classes.graphButton} color="inherit" aria-label="menu">
              <TimelineOutlinedIcon />
            </InsertDriveFileIcon>
          </Link>
          <Typography variant="h6" className={classes.title}>
            <Link to="/" style={{ textDecoration: 'none', color: '#FFF'  }}>
              Deep Capitalizer
            </Link>
          </Typography>
          <Link to={url} style={{ textDecoration: 'none', color: '#FFF'  }}>
            <Button color="inherit">{logStatus}</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}
