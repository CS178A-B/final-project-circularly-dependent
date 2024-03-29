  
import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ButtonAppBar from './shared-components/Navbar';
import Siena from "../resources/sienaSEHa.jpg";
import Nate from "../resources/nateBrennan.jpg";
import Jason from "../resources/jasonChan.jpg";
import Kibana  from "../resources/kibana.png"


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
        Circularly Dependent {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '100%',
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  developerHeader: {
    fontFamily: 'Manjari',
    fontWeight: '400',
    marginBottom: theme.spacing(4),
  },
  header: {
    fontFamily: 'Manjari',
    fontWeight: '400',
  },
  contentImage: {
    flex:1,
    marginTop: theme.spacing(4),
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
  }
}));

const developers = [
  {
    id : "nate",
    face: Nate,
    name: "Nathan Brennan",
    content: "nbren004@ucr.edu",
    title: "",
  },
  {
    id : "json",
    face: Jason,
    name: "Jason Chan",
    content: "jchan190@ucr.edu",
    title: "",
  },
  {
    id : "siena",
    face: Siena,
    name: "Siena Seung Eun Ha",
    content: "sha021@ucr.edu",
    title: "",
  }]

const Album =() => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <ButtonAppBar />
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="lg">
            <Typography className={classes.header} component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Fast, Dynamic, Intuitive
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" style={{ fontFamily: 'Manjari' }} paragraph>
              Make money management fit to your interest{<br />}
              Analyze your data by timeline, items, unit price, or all {<br />}
            </Typography>
            <img className={classes.contentImage}  alt="dashboard" src={Kibana} />
          </Container>
        </div>
        {/* End hero unit */}
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={2} justify="center">
            <Grid item>
              <Typography className={classes.developerHeader} component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
                Circularly Dependent
              </Typography>
              <Typography className={classes.developerHeader} variant="h5" align="center" color="textSecondary" paragraph>
                A team that brings your needs to reality{<br />}
                Reach out for more{<br />}
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={4}>
            {developers.map((developer) => (
              <Grid item key={developer.id} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={developer.face}
                    title={developer.title}
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography  variant="h5" component="h2" gutterBottom>
                      {developer.name}
                    </Typography>
                    <Typography>
                      {developer.content}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          We value your time
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}
export default Album;
