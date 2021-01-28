import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <br />
      <Link to='/visualization' style={{ textDecoration: 'none'}}>
        <Button color="primary" variant='contained' style={{ margin: 50}}>
          Visualization
        </Button>
      </Link>
      <Link to='/server-test' style={{ textDecoration: 'none'}}>
        <Button color="default" variant='contained' style={{ margin: 50}}>
          Server Test
        </Button>
      </Link>    
      <br />
    </>
  );
}

export default Home;
