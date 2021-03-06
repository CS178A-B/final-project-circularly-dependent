import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import AmazingBackground from './video/pexels-mikhail-nilov-6930815.mp4'
const imageLink = 'https://wallpapercave.com/wp/wp4831635.jpg';

const Home = () => {
  return (
    // <div style={{ 
    //   backgroundImage: `url(${imageLink})`,
    //   width:'100%',
    //   height: "100vh"
    // }}>
    <div>
      <video autoPlay loop muted
      style={{
        // position: "absolute",
        // top: "50%",
        // left: "50%",
        width: "100%",
        height: "100%",
        objectFit: "cover",
        // transform: "translate(-50%, -50%)",
        // WebkitTransform: "translate(-50%, -50%)",
        zIndex: 0
      }}>
        <source src={AmazingBackground} type="video/mp4"/>
      </video>
      <div  
      style={{
        position:"absolute",
        top:'20%',
        left:'30%',
        zIndex:1}} >
        <Link to='/visualization' 
        style={{ 
          textDecoration: 'none',
          zIndex: 10
        }}>
          <Button color="primary" variant='contained' style={{ margin: 50 }} >
            Price per Unit
          </Button>
        </Link>

        <Link to='/server-test' style={{ textDecoration: 'none', zIndex: '10'}} >
          <Button color="default" variant='contained' style={{ margin: 50 }} >
            Annual Spending
          </Button>
        </Link>    
      </div>
    </div>
  );
}

export default Home;
