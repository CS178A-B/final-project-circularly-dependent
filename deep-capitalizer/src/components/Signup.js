import React, { useState, useEffect, useContext } from 'react';
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
import { SERVER_PORT } from '../globals';
import { UserContext } from '../globals';
import ButtonAppBar from './shared-components/Navbar';

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://material-ui.com/'>
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [attempted, setAttempted] = useState(false);
  const [city, setCity] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [serverMsg, setServerMsg] = useState('');
  const [error, setError] = useState('');
  const {loggedIn, setLoggedIn} = useContext(UserContext);

  const clearFormState = () => {
    setCity('');
    setUsername('');
    setPassword('');
    setServerMsg('');
  }

  useEffect(() => {
    const signUpAttempt = async () => {
      if (attempted) {
        setAttempted(false);
        await fetch(`http://localhost:${SERVER_PORT}/signUp`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "city" : city,
            "username" : username,
            "password" : password,
          })
        })
        .then(res => res.json())
        .then(
          res => setServerMsg(res),
          err => setError(err)
        );
        if (error) { console.log(error); }
      }
    }
    signUpAttempt();
  }, [attempted]);

  useEffect(() => {
    if (serverMsg.length) {
      alert(serverMsg);
      clearFormState();
    }
  }, [serverMsg]);

  return (
    <>
      <ButtonAppBar />
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign up
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              {/* <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete='fname'
                  name='firstName'
                  variant='outlined'
                  required
                  fullWidth
                  id='firstName'
                  label='First Name'
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  id='lastName'
                  label='Last Name'
                  name='lastName'
                  autoComplete='lname'
                />
              </Grid> */}
              <Grid item xs={12}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  id='city'
                  name='city'
                  type='text'
                  label='City'
                  autoComplete='city'
                  value={city} 
                  onChange={(e) => setCity(e.target.value)}
                  />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  id='email'
                  name='email'
                  type='email'
                  label='Email Address'
                  autoComplete='email'
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)}
                  />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  id='password'
                  name='password'
                  type='password'
                  label='Password'
                  autoComplete='current-password'
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                  />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  id='confirm-password'
                  name='confirm-password'
                  type='password'
                  label='Confirm Password'
                  autoComplete='current-password'
                  value={confirmPass} 
                  onChange={(e) => setConfirmPass(e.target.value)}
                  />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value='allowExtraEmails' color='primary' />}
                  label='I want to receive inspiration, marketing promotions and updates via email.'
                />
              </Grid>
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
              onClick={() => { setAttempted(true); }}
            >
              Sign Up
            </Button>
            <Grid container justify='flex-end'>
              <Grid item>
                <Link href='#' variant='body2'>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    </>
  );
}
