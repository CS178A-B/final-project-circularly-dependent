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
      <Link color="inherit" href="/aboutUs">
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
    backgroundColor: 'rgba(65, 176, 18)',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: 'rgba(30, 99, 0, 0.8)',
    color: 'white',
    "& .MuiTouchRipple-root span":{
      backgroundColor: 'rgba(30, 99, 0)!important',
      opacity: .1,
    },
    "&:hover": {
      backgroundColor: 'rgba(65, 176, 18)'
    },
  },
  root: {
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "gray"
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "green"
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "green"
    },
    "& .MuiOutlinedInput-input": {
      color: "black"
    },
    "&:hover .MuiOutlinedInput-input": {
      color: "green"
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
      color: "black"
    },
    "& .MuiInputLabel-outlined": {
      color: "gray"
    },
    "&:hover .MuiInputLabel-outlined": {
      color: "black"
    },
    "& .MuiInputLabel-outlined.Mui-focused": {
      color: "gray"
    },
  },
}));

export default function Login() {
  const classes = useStyles();
  const [attempted, setAttempted] = useState(false);
  const [ID, setID] = useState('');
  const [password, setPassword] = useState('');
  const {loggedIn, setLoggedIn} = useContext(UserContext);
  const inputStyle = { WebkitBoxShadow: "0 0 0 1000px white inset" };

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

        try{
          if (city !== '') {
            setLoggedIn(true);
          } 
          else {
            alert("username and password do not match");
          }
        }
        catch(e) {} 
      }
    }
    signInAttempt()
  }, [attempted, ID, password, setLoggedIn]);
  
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
                className={classes.root}
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
                inputProps={{ style: inputStyle }}
              />
              <TextField
                className={classes.root}
                inputProps={{ style: inputStyle }}
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
                variant='outlined'
                className={classes.submit}

                onClick={() => {
                  setAttempted(true);
                }}>
                Sign In
              </Button>
              <Grid container spacing={26}>
                <Grid item xs={4}>
                  <Link 
                    href='#' 
                    variant='body2' 
                    style={{
                      color: '#000000',
                    }}
                    onClick={() => alert('Just make a new account!\nWe don\'t have that feature yet')}>
                    {"Forgot password?"}
                  </Link>
                </Grid>
                <Grid item md justify='flex-end'>
                  <Link href='/signup' variant='body2' style={{ color: '#000000' }}>
                    {"Don't have an account? Sign Up Here"}
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
