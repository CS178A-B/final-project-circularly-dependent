import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
        <Link to='/testPage'>
          <Button>Goto testing page</Button>
        </Link>
        <Link to='/app'>
          <Button>Goto App page</Button>
        </Link>    
        <p>This is Home</p>
    </>
  );
}

export default Home;