import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import ButtonAppBar from './shared-components/Navbar';
import { UserContext } from '../globals';
import typingWithGraphLeft from '../resources/typingWithGraphLeft.mp4';
import Typography from '@material-ui/core/Typography';

const Home = () => {
  const {loggedIn, _setLoggedIn} = useContext(UserContext);
  return (
    <div>
      <video 
        autoPlay 
        loop 
        muted
        style={{
          position: 'fixed',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
        }}
      >
        <source src={typingWithGraphLeft} type='video/mp4'/>
      </video>

      <div style={{
        position:'absolute',
        top:'0%',
        width: '100%',
        height: '100%',
        zIndex: 1,
      }}>
        <ButtonAppBar />
      </div>

      <div style={{
        textAlign: 'center',
        width: '100%',
        height: '60%',  // 40% for 1440p centering
        overflow: 'auto',
        margin: 'auto',
        position: 'absolute',
        top: 30, left: 0, bottom: 0, right: 0,
        zIndex: 1,
      }}>
    
        <Typography style={{color: 'white', fontFamily: 'Commissioner', fontWeight: 400}} component="h1" variant="h1" align="center" color="textPrimary" gutterBottom>
          Watch Wise {<br />}
          Spend Smart
        </Typography>
        {loggedIn ?
          <>
            {/* Signed In */}
            <Link to='/dashboard' style={{ textDecoration: 'none'}}>
              <Button color='primary' variant='contained' size='large' style={{ margin: 50, fontFamily: 'Maven Pro', backgroundColor: '#1e6300'}}>
                Kibana Dashboard
              </Button>
            </Link>
            <Link to='/visualization' style={{ textDecoration: 'none'}}>
              <Button color='default' variant='contained' size='large' style={{ margin: 50, fontFamily: 'Maven Pro'}}>
                Price per Unit
              </Button>
            </Link>
            <Link to='/sum-chart' style={{ textDecoration: 'none'}}>
              <Button color='default' variant='contained' size='large' style={{ margin: 50, fontFamily: 'Maven Pro'}}>
                Annual Spending
              </Button>
            </Link>  
          </>  
        :
          <>
            {/* Signed Off */}
            <Link to='/signup' style={{ textDecoration: 'none'}}>
              <Button color='primary' variant='contained' size='large' style={{ margin: 50, fontFamily: 'Maven Pro', backgroundColor: '#1e6300'}}>
                Sign Up
              </Button>
            </Link>
            <Link to='/login' style={{ textDecoration: 'none'}}>
              <Button color='default' variant='contained' size='large' style={{ margin: 50, fontFamily: 'Maven Pro'}}>
                Sign In
              </Button>
            </Link>
          </>  
        }
      </div>
    </div>    
  );
}

export default Home;
