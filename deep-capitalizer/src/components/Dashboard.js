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
      <iframe className={classes.kibana} src="http://localhost:5601/goto/89ce5e2fd5370d0b335dd2d7ea07fdd7" />
    </div>
  );
}

export default Dashboard;
