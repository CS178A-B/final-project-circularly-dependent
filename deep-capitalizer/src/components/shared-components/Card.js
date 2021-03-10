import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';    

const Cards = (props) => {

  const useStyles = makeStyles( () => ({
    root: {
      textAlign: 'center',
      alignItems: 'center',
      justifyItems: 'center',
      height: "100%",
      width: "30rem",
    },
  }))

  const classes = useStyles();
  return(
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h7" component="h3">
            {props.CardName}
          </Typography>
          <Typography variant="body3" color="textSecondary" component="p">
            {props.Files?.map(file=> <p>{file}</p>)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card> 
  );
}

export default Cards;
