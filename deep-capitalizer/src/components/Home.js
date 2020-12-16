import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'

export default Home = () => {
  return (
    <>
      <Link to='/visualization'>
        <Button>Goto Visualization page</Button>
      </Link>
      <Link to='/server-test'>
        <Button>Goto Server Test page</Button>
      </Link>    
      <p>This is Home</p>
    </>
  );
}
