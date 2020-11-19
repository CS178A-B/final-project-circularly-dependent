import './App.css';
import { SERVER_PORT } from './globals';
import { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import logo from './logo.svg';


const App = () => {
  const [count, setCount] = useState(0);
  const [serverMsg, setServerMsg] = useState(null);
  const [error, setError] = useState(null);
  const [clientMsg, setClientMsg]  = useState(['Click to poke Server'])


  // Example: await timeout(1000);  // 1 second
  /* const timeout = delay => {
    return new Promise(res => setTimeout(res, delay));
  }*/

  // Handle poke
  useEffect(() => {
    if (count) {
      console.log('Poke Sent >>')
      fetch(`http://localhost:${SERVER_PORT}/testPage`)
      .then(res => res.json())
      .then(
        resp => { setServerMsg(resp.message) }, 
        err => { setError(err) })
      if (!error) {
        console.log('count:', count)
        console.log('Poke Recieved <<');
      } else { console.log('Error:', error) }
    }
  }, [count, error]);

  useEffect(() => {
    if (count) {
      let cm = [`You poked Server ${count} time${count > 1 ? 's' : ''}`];
      cm.push(serverMsg)
      setClientMsg(cm)
    }
  }, [serverMsg, count]);

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          {clientMsg[0]}
        </p>
        <Button onClick={() => { setCount(count + 1) }} variant='contained'>
          Poke it
        </Button>
        <p>
          {clientMsg[1]}
        </p>
      </header>
    </div>
  );

  
  // if (!serverMsg) {
  //   return (
  //     <div className='App'>
  //       <header className='App-header'>
  //         <img src={logo} className='App-logo' alt='logo' />
  //         <p>
  //           Click to poke Server
  //         </p>
  //         <Button onClick={() => { testServer() }} variant='contained'>
  //           Poke it
  //         </Button>
  //       </header>
  //     </div>
  //   );
  // } else {
  //   return (
  //     <div className='App'>
  //       <header className='App-header'>
  //         <img src={logo} className='App-logo' alt='logo' />
  //         <p>
  //           You poked Server {count} times
  //         </p>
  //         <p>
  //           Server says: {serverMsg}
  //         </p>
  //         <Button onClick={() => { testServer() }} variant='contained'>
  //           Poke it
  //         </Button>
  //       </header>
  //     </div>
  //   );
  // }
}

export default App;
