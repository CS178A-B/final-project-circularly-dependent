import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import ButtonAppBar from './shared-components/Navbar';
import { UserContext } from '../globals';
import dataVisual from './video/dataVisual.mp4'
import graphGoDown from './video/graphGoDown.mp4'
import graphsOnTable from './video/graphsOnTable.mp4'
import postItGirl from './video/postItGirl.mp4'
import typingWithGraphLeft from './video/typingWithGraphLeft.mp4'
import Typography from '@material-ui/core/Typography';

const imageLink = 'https://wallpapercave.com/wp/wp4831635.jpg';

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
          // transform: 'translate(-50%, -50%)',
          // WebkitTransform: 'translate(-50%, -50%)',
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
        // position:'relative',
        // top:'50%',
        // left:'0',
        // alignItems: 'center',
        // justifyItems: 'center',
        width: '100%',
        height: '60%',
        overflow: 'auto',
        margin: 'auto',
        position: 'absolute',
        top: 30, left: 0, bottom: 0, right: 0,
        zIndex: 1,
      }}>
        {/* <h1 style={{color: 'white', fontFamily: 'Commissioner', fontWeight: 500}}> 
          From Number to Visual {<br />}
          Start today
        </h1> */}

        <Typography style={{color: 'white', fontFamily: 'Maven Pro', fontWeight: 500}} component="h1" variant="h1" align="center" color="textPrimary" gutterBottom>
          Capitalizer
        </Typography>
        <Typography style={{color: 'white', fontFamily: 'Commissioner', fontWeight: 400}} component="h4" variant="h4" align="center" color="textPrimary" gutterBottom>
          Watch Wise, 
          Spend Smart
        </Typography>
        {loggedIn ?
          <>
            {/* Signed In */}
            <Link to='/dashboard' style={{ textDecoration: 'none'}}>
              <Button color='primary' variant='contained' style={{ margin: 50, fontFamily: 'Arial '}}>
                Kibana Dashboard
              </Button>
            </Link>
            <Link to='/visualization' style={{ textDecoration: 'none'}}>
              <Button color='default' variant='contained' style={{ margin: 50, fontFamily: 'Arial '}}>
                Price per Unit
              </Button>
            </Link>
            <Link to='/sum-chart' style={{ textDecoration: 'none'}}>
              <Button color='default' variant='contained' style={{ margin: 50, fontFamily: 'Arial '}}>
                Annual Spending
              </Button>
            </Link>  
          </>  
        :
          <>
            {/* Signed Off */}
            <Link to='/signup' style={{ textDecoration: 'none'}}>
              <Button color='primary' variant='contained' size='large' style={{ margin: 50, fontFamily: 'Maven Pro', backgroundColor: '#262626'}}>
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
