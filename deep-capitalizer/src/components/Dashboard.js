import './App.css';
import { SERVER_PORT } from '../globals';
import { makeStyles } from '@material-ui/core/styles';
import ButtonAppBar from './shared-components/Navbar';

const useStyles = makeStyles({
  root: {
    textAlign: 'center',
  },
  kibana: {
    minHeight: '94.5vh',
    minWidth: '99.8vw',
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
      <ButtonAppBar />
      <iframe className={classes.kibana} src="http://localhost:5601/goto/89ce5e2fd5370d0b335dd2d7ea07fdd7" />
    </div>
  );
}

export default Dashboard;
