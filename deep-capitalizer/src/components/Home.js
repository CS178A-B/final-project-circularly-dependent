import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
      <br />
      <Link to='/visualization' style={{ textDecoration: 'none'}}>
        <Button>Goto Visualization page</Button>
      </Link>
      <Link to='/server-test' style={{ textDecoration: 'none'}}>
        <Button>Goto Server Test page</Button>
      </Link>    
      <br />
      <p>Home</p>
    </>
  );
}

export default Home;
