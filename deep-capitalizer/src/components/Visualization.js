import './App.css';
import { SERVER_PORT } from './../globals';
import Button from '@material-ui/core/Button';
import { useState, useEffect } from 'react';

const Visualization = () => {
  const [read, setRead] = useState(false);

  useEffect(() => {
    const readFile = async () => {
      if (read) {
        console.log("Read request sent")
        await fetch(`http://localhost:${SERVER_PORT}/rawData`)
        .then(res => res.json())
        setRead(false)
      }
    }
    readFile()
  }, [read]);

  return (
      <div className='App'>
        <header className='App-header'>
          <p>
            - Graphs go here -
          </p>
          <Button onClick={() => { setRead(true) }} variant='contained'>
            Get da Data
          </Button>
        </header>
      </div>
  );
}

export default Visualization;
