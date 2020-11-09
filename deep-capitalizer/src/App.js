import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button'
import { NavLink } from 'react-router-dom'


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          HELLO THIS IS CIRCULARLY DEPENDENT - Hello from client
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
        </a>
        <Button>
          Hello World
        </Button>
      </header>
    </div>
  );
}

export default App;
