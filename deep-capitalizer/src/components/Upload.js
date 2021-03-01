import React from 'react';
import { SERVER_PORT } from '../globals';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';

const Upload = () => {
  const { register, handleSubmit } = useForm()

  const onSubmit = async(data) => {
    const formData = new FormData()
    formData.append('file', data.file[0])

    const res = await fetch(`http://localhost:${SERVER_PORT}/serverUpload`, {
      method: 'POST',
      body: formData
    }).then(res => res.json())
    alert(JSON.stringify(res.message))
  }

  const useStyles = makeStyles(() => ({
    label: {
      backgroundColor: 'white',
      color: 'black',
      padding: '0.5rem',
      fontFamily: 'sans-serif',
      borderRadius: '0.3rem',
      cursor: 'pointer',
      marginTop: '20vh',
      alignItems: 'center',
      paddingLeft: '6rem',
      paddingTop: '2rem',
      paddingBottom: '2rem',
      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.19), 0 6px 20px 0 rgba(0, 0, 0, 0.0)'
    },
    button: {
      backgroundColor: '#363396',
      color: 'white',
      padding: '0.5rem',
      fontFamily: 'sans-serif',
      borderRadius: '0.3rem',
      cursor: 'pointer',
      marginTop: '1rem',
      borderStyle: 'none',
      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.19), 0 6px 20px 0 rgba(0, 0, 0, 0.0)'
    }
  }));

  const classes = useStyles();

  return (
    <div>
    <form onSubmit={handleSubmit(onSubmit)}>
      <input className={classes.label} ref={register} type='file' name='file' text-align='right' />
      <br/>
      <button className={classes.button}>SUBMIT</button>
    </form>
    </div>
  )
}

export default Upload;
