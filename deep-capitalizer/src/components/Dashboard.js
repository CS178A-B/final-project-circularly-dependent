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
      <iframe className={classes.kibana} title='kibana-dashboard' frameBorder='0' src='http://localhost:5601/goto/bd2a6d6717be3b32e53e1cfa83291c25' />
    </div>
  );
}

export default Dashboard;
