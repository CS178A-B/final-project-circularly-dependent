import './App.css';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
// import rawData from '../resources/out1.json';
import { SERVER_PORT } from './../globals';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';

const useStyles = makeStyles({
  root: {
    textAlign: 'center',
  },
  header: {
    minHeight: '100vh',
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
});

const Visualization = () => {
  const classes = useStyles();
  const [read, setRead] = useState(false);
  const [tmpread, setTmpread] = useState(false);
  const [rawData, setRaw] = useState(null);
  const [graphData, setGraph] = useState(null);
  const [error, setError] = useState(null);

  // Fetch from "/selectData" end-point
  useEffect(() => {
    const readFile = async () => {
      if (read) {
        setRead(false);
        const requestOptions = {
          method: 'GET',
          body: 'select * from items where product_name = "PUMP EFFICIENCY TESTING WATER METER TESTING SAND TESTING"'
        }
        console.log('Read request sent');
        await fetch(`http://localhost:${SERVER_PORT}/selectData`)
        .then(res => res.json())
        .then(
          resp => setRaw(resp),
          err => setError(err)
        );
        if (error) { console.log(error); }
      }
    }
    readFile();
  }, [read, error]);

  // Populate graphical data
  useEffect(() => {
    if (rawData) {
      console.log('Da rawData:', typeof(rawData), rawData);
      let g = [];
      for (let entry of rawData) {
        // console.log(typeof(entry))
        // console.log(`entry ${entry['entry_id']}:`, entry)
        // console.log('product name:', entry['product_name'])
        if (entry['product_name'] === 'PUMP EFFICIENCY TESTING WATER METER TESTING SAND TESTING') {
          g.push(entry);
        }
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
        // console.log(typeof(entry))
        // console.log(`entry ${entry['entry_id']}:`, entry)
        // console.log('product name:', entry['product_name'])
        if (entry['PRODUCT_NAME'] === 'PUMP EFFICIENCY TESTING WATER METER TESTING SAND TESTING') {
          g.push(entry);
        }
      }
      console.log('graphSTUFF:', g);
      setGraph(g);
      setTmpread(false);
    }
  }, [tmpread, rawData]);

  return (
      <div className={classes.root}>
        <header className={classes.header}>
          <p>
            {graphData ? graphData[0]['product_name'] : ''}
          </p>
          <ResponsiveContainer className={classes.graph}>
            <BarChart width={730} height={250} data={graphData}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='entry_id' />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey='item_total' fill='#008000' />
            </BarChart>
          </ResponsiveContainer>
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
