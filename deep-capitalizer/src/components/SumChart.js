import './App.css';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import ComboSearch from './shared-components/ComboSearch';
import { SERVER_PORT } from './../globals';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';
import ButtonAppBar from './shared-components/Navbar';

const useStyles = makeStyles({
  root: {
    textAlign: 'center',
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "gray"
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "green"
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "green"
    },
    "& .MuiOutlinedInput-input": {
      color: "black"
    },
    "&:hover .MuiOutlinedInput-input": {
      color: "green"
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
      color: "black"
    },
    "& .MuiInputLabel-outlined": {
      color: "gray"
    },
    "&:hover .MuiInputLabel-outlined": {
      color: "black"
    },
    "& .MuiInputLabel-outlined.Mui-focused": {
      color: "gray"
    },
  },
  header: {
    height: '85vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'calc(8px + 1vmin)',
  },
  graph: {
    minHeight: '40vh',
    maxWidth: '80vw',
  },
  submit: {
    backgroundColor: 'rgba(30, 99, 0, 0.8)',
    color: 'white',
    "& .MuiTouchRipple-root span":{
      backgroundColor: 'rgba(30, 99, 0)!important',
      opacity: .1,
    },
    "&:hover": {
      backgroundColor: 'rgba(65, 176, 18)'
    },
  },
});

const SumChart = () => {
  const classes = useStyles();
  const [read, setRead] = useState(false);
  const [tmpread, setTmpread] = useState(false);
  const [rawData, setRaw] = useState(null);
  const [graphData, setGraph] = useState(null);
  const [error, setError] = useState(null);
  const [prodName, setProd] = useState(null);
  const inputStyle = { WebkitBoxShadow: "0 0 0 1000px white inset" };
  
  // Fetch from "/selectData" end-point
  useEffect(() => {
    const readFile = async () => {
      if (read) {
        // No product selected, abort fetch
        if (!prodName) {
          alert('Please select a Product.');
          setRead(false);
          return;
        }
        setRead(false);
        console.log('Read request sent')
        await fetch(`http://localhost:${SERVER_PORT}/overall`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            'product_name': prodName,
          }),
        })
        .then(res => res.json())
        .then(
          resp => setRaw(resp),
          err => setError(err)
        );
        if (error) { console.log(error); }
      }
    }
    readFile();
  }, [read, prodName, error]);

  // Populate graphical data
  useEffect(() => {
    if (rawData) {
      console.log('Da rawData:', typeof(rawData), rawData);
      let g = [];
      for (let entry of rawData) {
          g.push(entry);
      }
      console.log('graphSTUFF:', g);
      setGraph(g);
    }
  }, [rawData]);

  // Read from file (alternative to fetching from "/selectData" end-point)
  useEffect(() => {
    if (tmpread) {
      console.log('Da rawData:', typeof(rawData), rawData);
      let g = [];
      for (let entry of rawData.PURCHASES) {
          g.push(entry);
      }
      console.log('graphSTUFF:', g);
      setGraph(g);
      setTmpread(false);
    }
  }, [tmpread, rawData]);

  return (
      <div className={classes.root}>
        <ButtonAppBar />
        <header className={classes.header}>
          <ComboSearch             
            inputProps={{ style: inputStyle }}
            setItem={(item) => setProd(item)}/>
          <br />
          <p>
            Annual Spending
          </p>
          { graphData ?
            <ResponsiveContainer className={classes.graph}>
              <LineChart
                width={500}
                height={250}
                data={graphData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey='Sum' stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          :
            <br />
          }
        <br />
        <Button className={classes.submit} onClick={() => { setRead(true) }} color="primary" variant='contained'>
          Get Results
        </Button>
      </header>
    </div>
  );
}

export default SumChart;
