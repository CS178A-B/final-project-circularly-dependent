import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../globals'
import { set } from 'mobx';


const Logout = () => {
  const {value, setValue} = useContext(UserContext);
  const waitForBar = async () => {
    await setValue(false)
    console.log('finished')
  }
  waitForBar()
  return (
    <>  
      <p>This is Logout</p>
    </>
  );
}


export default Logout;

