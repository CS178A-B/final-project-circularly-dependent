import './App.css';
import { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import logo from './logo.svg';
import Main from './Main'
import { Link } from "react-router-dom";

const TestPage = () => {
    return (
        <div className='TestPage'>
          <header className='App-header'>
            <img src={logo} className='App-logo' alt='logo' />
            <p>
              Testing Page
            </p>
          </header>
        </div>
    );
}

export default TestPage;