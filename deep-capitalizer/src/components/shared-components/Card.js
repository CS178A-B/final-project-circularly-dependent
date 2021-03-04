import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';    

const Cards = (props) => {

  const useStyles = makeStyles( () => ({
    root: {
      marginTop: '30px',
    },
  }))

  const classes = useStyles();
  return(
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h7" component="h2">
            {props.CardName}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.Files?.map(file=> <p>{file}</p>)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card> 
  );
}

export default Cards;
