import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useState, useEffect, useContext, useMemo } from 'react';
import { SERVER_PORT, timeout } from '../globals';
import UserStore from './UsterStore'
import { UserContext } from '../globals'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Circularly Dependent
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const classes = useStyles();
  const [attempted, setAttempted] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState(null);
  const [ID, setID] = useState('');
  const [password, setPassword] = useState('');
  const {value, setValue} = useContext(UserContext);

  useEffect(() => {
    console.log('useEffect')
    const signInAttempt = async () => {
      if (attempted) {
        console.log(ID)
        setAttempted(false);
        let res = await fetch (`http://localhost:${SERVER_PORT}/signIn`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type' : 'application/json'
          },
          body: JSON.stringify({
            username: ID,
            password: password
          })
        })

        let result = await res.json();
        let success = result;
        
        if (success) {
          console.log(value)
          setValue(true)
          console.log(value)
          console.log('successfully logged in')
        }

        else {
          UserStore.isLoggedIn = false;
          console.log(value)

          console.log('failed to log in')
          alert('Email Address doesn\'t match with password')
        }
      }
    }
    signInAttempt()
  }, [attempted, error, value]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={ID} 
            onChange={(e) => setID(e.target.value)}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => {
              setAttempted(true);
            }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
