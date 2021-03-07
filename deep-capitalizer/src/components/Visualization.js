import './App.css';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
// import rawData from '../resources/out1.json';
import { SERVER_PORT } from './../globals';
import ComboSearch from './shared-components/ComboSearch';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';
import ButtonAppBar from './shared-components/Navbar';

const useStyles = makeStyles({
  root: {
    textAlign: 'center',
  },
  header: {
    minHeight: '85vh',
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
  const [prodName, setProd] = useState(null);
  const [graphData, setGraph] = useState(null);
  const [error, setError] = useState(null);

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
        await fetch(`http://localhost:${SERVER_PORT}/selectData`, {
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
      for (let i=0; i<rawData.length; i++) {
        rawData[i].issue_date = rawData[i].issue_date.substr(0,10)
      }  
      console.log('rawData:', typeof(rawData), rawData);
      setGraph(rawData);
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
        <ButtonAppBar />
        <header className={classes.header}>
          <ComboSearch setItem={(item) => setProd(item)}/>
          <br />
          <p>
            {'Price per Unit'}
            {graphData ? ' for ' + graphData[0]['product_name'] : ''}
          </p>
            { graphData ?
              <ResponsiveContainer className={classes.graph}>
                <BarChart width={730} height={250} data={graphData}>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='issue_date' />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey='unit_price' fill='#008000' />
                </BarChart>
              </ResponsiveContainer>
            :
              <br />
            }

          <br />
          <Button onClick={() => { setRead(true) }} color="primary" variant='contained'>
            Get Results
          </Button>
        </header>
      </div>
  );
}

export default Visualization;
