import './App.css';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import rawData from '../resources/out1.json';
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
  const [graphData, setGraph] = useState([]);

  useEffect(() => {
    const readFile = async () => {
      if (read) {
        console.log('Read request sent')
        await fetch(`http://localhost:${SERVER_PORT}/rawData`)
        .then(res => res.json())
        setRead(false)
      }
    }
    readFile()
  }, [read]);

  useEffect(() => {
    if (tmpread) {
      console.log('Da rawData:', typeof(rawData), rawData);

      let g = [];
      for (let entry of rawData.PURCHASES) {
        // console.log(typeof(entry))
        // console.log(`entry ${entry['ENTRY_ID']}:`, entry)
        // console.log('product name:', entry['PRODUCT_NAME'])
        if (entry['PRODUCT_NAME'] === 'PUMP EFFICIENCY TESTING WATER METER TESTING SAND TESTING ') {
          g.push(entry);
        }
      }
      console.log('graphSTUFF:', g);
      setGraph(g);
      setTmpread(false);
    }
  }, [tmpread]);

  return (
      <div className={classes.root}>
        <header className={classes.header}>
          <p>
            {graphData.length ? graphData[0].PRODUCT_NAME : ''}
          </p>
          <ResponsiveContainer className={classes.graph}>
            <BarChart width={730} height={250} data={graphData}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='ENTRY_ID' />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey='ITEM_TOTAL_AMOUNT' fill='#008000' />
            </BarChart>
          </ResponsiveContainer>
          <p>
            - Graphs go here -
          </p>
          <Button onClick={() => { setTmpread(true) }} variant='contained'>
            Get da Data
          </Button>
        </header>
      </div>
  );
}

export default Visualization;
