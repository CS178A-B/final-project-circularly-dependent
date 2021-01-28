import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const imageLink = 'https://wallpapercave.com/wp/wp4831635.jpg';

const Home = () => {
  return (
    <div style={{ 
      backgroundImage: `url(${imageLink})`,
      width:'100%',
      height: "100vh"
    }}>
      <br />
      <Link to='/visualization' style={{ textDecoration: 'none'}}>
        <Button color="primary" variant='contained' style={{ margin: 50}}>
          Price per Unit
        </Button>
      </Link>
      <Link to='/server-test' style={{ textDecoration: 'none'}}>
        <Button color="default" variant='contained' style={{ margin: 50}}>
          Annual Spending
        </Button>
      </Link>    
      <br />
    </div>
  );
}

export default Home;
