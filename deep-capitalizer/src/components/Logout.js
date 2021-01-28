import React from 'react';
import { useState, useEffect, useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import { UserContext } from '../globals'


import { useDencrypt } from "use-dencrypt-effect";

const textValues = ["See You Again", "Come Back Soon!", "Good Bye", "Until Next Time"]

const Logout = () => {
  const { result, dencrypt } = useDencrypt();
  const {value, setValue} = useContext(UserContext);

  setValue(false)
  useEffect(() => {
    let i = 0;
    const action = setInterval(() => {
      dencrypt (textValues[i]);
      i = i === textValues.length - 1 ? 0 : i + 1;
    }, 2000);

    return () => clearInterval(action);
  }, []);

  return (
    <div> 
      <br/>
      <br/>
      <br/>
      <br/>
      <Typography 
        align='center'  
        style={{ wordWrap: "break-word" }} 
        variant='h4'>
          {result}
      </Typography>
    </div>
  );
}

export default Logout;

