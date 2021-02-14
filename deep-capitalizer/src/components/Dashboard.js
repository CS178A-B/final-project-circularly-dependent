import './App.css';
import { SERVER_PORT } from '../globals';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    textAlign: 'center',
  },
  kibana: {
    minHeight: '99vh',
    minWidth: '99vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Dashboard = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <iframe className={classes.kibana} src="http://localhost:5601/goto/1f8156863dfef58f37f100b021a88c9c" />
    </div>
  );
}

export default Dashboard;
