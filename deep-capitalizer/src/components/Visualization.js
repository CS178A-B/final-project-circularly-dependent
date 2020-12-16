import './App.css';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import rawData from '../resources/out1.json';
import { SERVER_PORT } from './../globals';
import Button from '@material-ui/core/Button';
// import { makeStyles } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';

const Visualization = () => {
  const [read, setRead] = useState(false);
  const [tmpread, setTmpread] = useState(false);
  const [graphData, setGraph] = useState([]);

  useEffect(() => {
    const readFile = async () => {
      if (read) {
        console.log("Read request sent")
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
        console.log(typeof(entry))
        console.log(`entry ${entry['ENTRY_ID']}:`, entry)
        console.log('product name:', entry['PRODUCT_NAME'])
        if (entry['PRODUCT_NAME'] === 'INV ') {
          g.push(entry);
        }
      }
      console.log('graphSTUFF:', g);
      setGraph(g);
      setTmpread(false);
    }
  }, [tmpread]);

  return (
      <div className='App'>
        <body>
          <ResponsiveContainer width={700} height={500}>
            <BarChart width={730} height={250} data={graphData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="ITEM_TOTAL_AMOUNT" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="ENTRY_ID" fill="#008000" />
            </BarChart>
          </ResponsiveContainer>
          <p>
            - Graphs go here -
          </p>
          <Button onClick={() => { setTmpread(true) }} variant='contained'>
            Get da Data
          </Button>
        </body>
      </div>
  );
}

export default Visualization;
