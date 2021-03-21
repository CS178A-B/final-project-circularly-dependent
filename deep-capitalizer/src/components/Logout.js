import React from 'react';
import { useState, useEffect, useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import { UserContext } from '../globals'
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import ButtonAppBar from './shared-components/Navbar';

const Logout = () => {
  const {loggedIn, setLoggedIn} = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);

  const useStyles = makeStyles(() => ({
    main: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
    },
    sub: {
      position:'absolute',
      top: 0, left: 0, bottom:0, right: 0, 
      width: '100%',
      height: '40%',
      overflow: 'auto',
      margin: 'auto',
    },
    inner: {
      position:'absolute',
      top: 0, left: 0, bottom:0, right: 0, 
      width: '100%',
      height: '15%',
      overflow: 'auto',
      margin: 'auto',
      color: 'black',
    }
  }))
  
  const classes = useStyles();
  useEffect(() => {
    if(timeLeft===0) {
      console.log("TIME LEFT IS 0");
      setRedirect(true)
      setTimeLeft(null)
    }
    if (!timeLeft) return;
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => intervalId ? clearInterval(intervalId) : null;
  }, [timeLeft]);
  
  useEffect(() => {
    if (!loggedIn) setTimeLeft(3)
  }, [loggedIn])
  
  setLoggedIn(false)
  
  if (redirect) {
    return <Redirect to='/' />
  }
  else {
    return (
      <div className={classes.main}>
        <ButtonAppBar />
        <div className={classes.sub}>
          <div className={classes.inner}>
            <Typography>
              Redirecting to Main Page After {timeLeft} Seconds. 
            </Typography>
          </div>
        </div>
      </div>
    )
  }
}

export default Logout;
