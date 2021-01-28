import './App.css';
import {
  BarChart, LineChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import ComboSearch from './shared-components/ComboSearch';

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

const SumChart = () => {
  const classes = useStyles();
  const [read, setRead] = useState(false);
  const [tmpread, setTmpread] = useState(false);
  const [rawData, setRaw] = useState(null);
  const [graphData, setGraph] = useState(null);
  const [error, setError] = useState(null);
  const [prodName, setProd] = useState(null);

  
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
        // console.log(typeof(entry))
        // console.log(`entry ${entry['entry_id']}:`, entry)
        // console.log('product name:', entry['product_name'])
        // if (entry['year'] === 2018) {
          g.push(entry);
        // }
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
        // if (entry['YEAR'] === 2018) {
          g.push(entry);
        // }
      }
      console.log('graphSTUFF:', g);
      setGraph(g);
      setTmpread(false);
    }
  }, [tmpread, rawData]);

  return (
      <div className={classes.root}>
        <header className={classes.header}>
        <ComboSearch setItem={(item) => setProd(item)}/>

          {/* <p>
            {graphData ? graphData[0]['dep_desc'] : ''}
          </p> */}
          {/* <ResponsiveContainer className={classes.graph}>
            <BarChart width={730} height={250} data={graphData}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='dep_desc' />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey='Sum' fill='#005599' />
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
} */}
          <br />
          <p>
            Annual Sum
          </p>
          { graphData ?
            <ResponsiveContainer className={classes.graph}>
              {/* <BarChart width={730} height={250} data={graphData}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='dep_desc' />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey='Sum' fill='#008000' data='year'/>
              </BarChart> */}
              <LineChart
                width={500}
                height={300}
                data={graphData}
                margin={{
                  top: 5, right: 30, left: 20, bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                {/* <XAxis tickLine={true} xAxisId={0} dy={0} dx={-0} label={{ value: '', angle: 0, position: 'bottom' }} interval={0} dataKey="dep_desc" tickLine={false} tick={{fontSize: 9, angle: 0 }} />
                <XAxis xAxisId={1} dy={-15} dx={0} label={{ value: '', angle: 0, position: 'bottom' }} interval={10} dataKey="year" tickLine={false} tick={{fontSize: 9, angle: 0}} /> */}
                <YAxis />
                <Tooltip />
                <Legend />
                {/* {graphData.map(() => {
                                        return (<Line  dataKey={`${graphData.dep_desc}`} />)
                                    })     }            */}
                <Line type="monotone" dataKey='Sum' stroke="#82ca9d" />
              </LineChart>
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

export default SumChart;