import React, { useState, useEffect, useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { SERVER_PORT } from '../globals';
import { UserContext } from '../globals'
import ButtonAppBar from './shared-components/Navbar';

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
  const [error, setError] = useState(null);
  const [ID, setID] = useState('');
  const [password, setPassword] = useState('');
  const {loggedIn, setLoggedIn} = useContext(UserContext);

  useEffect(() => {
    const signInAttempt = async () => {
      if (attempted) {
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
        let city = result.city;
        console.log(city)

        try{
          if (city !== '') {
            setLoggedIn(true)
          } 
          else {
            console.log("here to change setvalue")
            alert("username and password do not match")
          }
        }
        catch(e) {} 
      }
    }
    signInAttempt()
  }, [attempted]);
  
  if (!loggedIn) {
    return (
      <div>
        <ButtonAppBar />
        <Container component='main' maxWidth='xs'>
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Sign in
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                value={ID} 
                onChange={(e) => setID(e.target.value)}
                autoFocus
              />
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                autoComplete='current-password'
              />
              <Button
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}
                onClick={() => {
                  setAttempted(true);
                }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link 
                    href='#' 
                    variant='body2' 
                    onClick={() => alert('Just make a new account!\nWe don\'t have that feature yet')}>
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href='/signup' variant='body2'>
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
      </div>
    );
  }      
  else {
    return (
      <div>
        <ButtonAppBar /> 
        <br/>
        <br/>
        <br/>
        <br/>
        <Typography 
          align='center'  
          style={{ wordWrap: 'break-word' }} 
          variant='h4'>
            HI {ID}
            {/* {result} */}
        </Typography>
      </div>
    );
  }
}

