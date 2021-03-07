import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import AmazingBackground from './video/pexels-mikhail-nilov-6930815.mp4'
import ButtonAppBar from './shared-components/Navbar';

const imageLink = 'https://wallpapercave.com/wp/wp4831635.jpg';

const Home = () => {
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
        <source src={AmazingBackground} type='video/mp4'/>
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
        height: '50%',
        overflow: 'auto',
        margin: 'auto',
        position: 'absolute',
        top: 0, left: 0, bottom: 0, right: 0,
        zIndex: 1,
      }}>
        <Link to='/dashboard' style={{ textDecoration: 'none'}}>
          <Button color='primary' variant='contained' style={{ margin: 50}}>
            Kibana Dashboard
          </Button>
        </Link>
        <Link to='/visualization' style={{ textDecoration: 'none'}}>
          <Button color='default' variant='contained' style={{ margin: 50}}>
            Price per Unit
          </Button>
        </Link>
        <Link to='/sum-chart' style={{ textDecoration: 'none'}}>
          <Button color='default' variant='contained' style={{ margin: 50}}>
            Annual Spending
          </Button>
        </Link>    
        
{/* 
      <Link to='/dashboard' style={{ textDecoration: 'none'}}>
        <Button variant='outlined' style={{ margin: 50, fontWeight: 'bold', color:'#171d78' }}>
          Kibana Dashboard
        </Button>
      </Link>
      <Link to='/visualization' style={{ textDecoration: 'none'}}>
        <Button  variant='outlined' style={{ margin: 50,  fontWeight: 'bold', color:'#070a36'}}>
          Price per Unit
        </Button>
      </Link>
      <Link to='/sum-chart' style={{ textDecoration: 'none'}}>
        <Button variant='outlined' style={{ margin: 50,  fontWeight: 'bold', color: '#070a36'}}>
          Annual Spending
        </Button>
      </Link>   */}
      </div>
    </div>    
  );
}

export default Home;
