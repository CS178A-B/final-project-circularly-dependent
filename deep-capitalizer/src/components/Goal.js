import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import ButtonAppBar from './shared-components/Navbar.js'
import { makeStyles } from '@material-ui/core/styles';
import BlueBackground from "./video/banner-blue-background.png";
import MoneyBackground from "./video/money.jpg";
import Grow from '@material-ui/core/Grow';
import Typography from 'material-ui/styles/typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  wholePage: {
    position: 'fixed',
    top: 0, left: 0, bottom:0, right: 0, 
    width: '100%',
    height: '100%',
  },
  underBar: {
    position: 'relative',
    top: 0, left: 0, bottom:0, right: 0, 
    width: '100%',
    height: '100%',
  },

  background_top_area: {
    position: 'relative',
    top: 0, left: 0, bottom:0, right: 0, 
    backgroundImage: `url(${MoneyBackground})`,
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
    height: '70%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    zIndex: -1,
  },
  background_bottom_area: {
    position: 'relative',
    top: 0, left: 0, bottom:0, right: 0, 
    backgroundImage: `url(${BlueBackground})`,
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
    height: '30%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    zIndex: -1,
  },
  over: {
    position: 'relative',
    top: 0, left: 0, bottom:0, right: 0, 
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  button: {
    position: 'absolute',
    top: 0, left: 0, bottom:0, right: 0, 
    width: '50%',
    height: '50%',
    zIndex: 1,
  }

}));

const Goal = () => {
  const classes = useStyles();

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(!checked);
  }, [checked])

  return (
    <div className={classes.wholePage}>
      <ButtonAppBar />
      
      <div className={classes.underBar}>
        <div className={classes.background_top_area} />
        <div className={classes.background_bottom_area} />
        {/* <Typography variant="subtitle1">My SubTitle</Typography> */}

        {/* <div className={classes.over}> */}

        {/* <Grid container
          spacing={3}
          justify="center"
          style={{     
            position: 'abosolute',
            top: 0, left: 0, bottom:0, right: 0, 
            width: '50%',
            height: '50%',
            zIndex: 1,
          }}>
          <Grid item xl={3}>
            hiafjidjfaewpjewapfdaf
          </Grid>
        </Grid> */}

        </div>
      </div>
    // </div>
  );
}

export default Goal;
