import './App.css';
import logo from '../logo.svg';
import { SERVER_PORT } from './../globals';
import Button from '@material-ui/core/Button';
import { useState, useEffect } from 'react';

const TestPage = () => {
  const [read, setRead] = useState(0);

  useEffect(() => {
    const readFile = async () => {
      if (read) {
        console.log("Read request sent")
        await fetch(`http://localhost:${SERVER_PORT}/rawData`)
        .then(res => res.json())
      }
    }
    readFile()
  }, [read]);

    return (
        <div className='TestPage'>
          <header className='App-header'>
            <img src={logo} className='App-logo' alt='logo' />
            <p>
              Testing Page
            </p>
            <Button onClick={() => { setRead(read + 1) }} variant='contained'>
            Read Please
            </Button>
          </header>
        </div>
    );
}

export default TestPage;