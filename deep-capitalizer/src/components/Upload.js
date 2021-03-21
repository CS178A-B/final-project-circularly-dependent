import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ButtonAppBar from './shared-components/Navbar';
import { SERVER_PORT } from '../globals';
import Cards from './shared-components/Card';

const Upload = () => {
  const { register, handleSubmit } = useForm();
  const [tried, setTried] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const checkHistory = async () => {
      if (!tried) {
        setTried(true);
        await fetch(`http://localhost:${SERVER_PORT}/serverUpload`)
        .then(res => res.json())
        .then (
          resp => { setHistory(resp)}) 
      }
    }
    checkHistory()
  }, [tried]);

  const onSubmit = async(data) => {
    const formData = new FormData();
    formData.append('file', data.file[0]);

    const res = await fetch(`http://localhost:${SERVER_PORT}/serverUpload`, {
      method: 'POST',
      body: formData
    }).then(res => res.json())
    setTried(false);
    alert(JSON.stringify(res.message));
  }

  const useStyles = makeStyles(() => ({
    main: {
      position: 'fixed',
      top: 0, left: 0, bottom:0, right: 0, 
      width: '100%',
      height: '100%',
    },
    sub: {
      position: 'relative',
      top: 40, left: 0, bottom:0, right: 0,       
      height: '100%',
    },
    form : {      
      position: 'relative',
      top: 30, left: 0, bottom:0, right: 0, 
    },

    label: {
      top: '30%',
      padding: '1rem'
    },
    button: {
      backgroundColor: 'rgba(30, 99, 0, 0.8)',
      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.19), 0 6px 20px 0 rgba(0, 0, 0, 0.0)',
      borderRadius: 3,
      border: 0,
      color: 'white',
      height: 48,
      padding: '0 30px',
    },
      gridContainer: {
      paddingLeft: '2px',
      paddingRight: '2px',
    },
  }));

  const classes = useStyles();

  return (
    <div className={classes.main}>
      <ButtonAppBar />
      <div className={classes.sub}>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <input className={classes.label} ref={register} type='file' name='file' />
            <button className={classes.button}>SUBMIT</button>      
        </form>
        <Grid container
          spacing={3}
          justify="center"
          style={{     
            position: 'relative',
            top: 90, left: 0, bottom:0, right: 0, 
          }}>
          <Grid item xl={3}>
            <Cards CardName='File History' Files = {history}/>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default Upload;
