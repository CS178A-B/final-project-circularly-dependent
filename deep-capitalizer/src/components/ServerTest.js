import { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { SERVER_PORT, timeout } from '../globals';
import logo from '../resources/logo.svg';
import './App.css';

const ServerTest = () => {
  const [count, setCount] = useState(0);
  const [serverMsg, setServerMsg] = useState(null);
  const [error, setError] = useState(null);
  const [clientMsg, setClientMsg]  = useState(['Click to poke Server']);

  // Handle poke
  useEffect(() => {
    const testServer = async () => {
      if (count) {
        console.log('Poke Sent >>')
        console.log('count:', count)
        await fetch(`http://localhost:${SERVER_PORT}/test`)
        .then(res => res.json())
        .then(
          resp => { setServerMsg(resp.message) }, 
          err => { setError(err) })
        if (!error) {
          console.log('Poke Recieved <<');
        } else { console.log('Error:', error) }
      }
    }
    testServer()
  }, [count, error]);

  // Update text
  useEffect(() => {
    const updateText = async () => {
      if (count) {
        let cm = [`You poked Server ${count} time${count > 1 ? 's' : ''}`];
        cm.push(serverMsg)
        setClientMsg(cm)
        await timeout(2000);
        setServerMsg(null)
      }
    }
    updateText()
  }, [serverMsg, count]);

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          {clientMsg[0]}
        </p>
        <Button onClick={() => { setCount(count + 1) }} variant='contained'>
          Poke
        </Button>
        <p>
          {clientMsg[1]}
        </p>
      </header>
    </div>
  );
}

export default ServerTest;
