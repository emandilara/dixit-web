import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import CardsPlayed from './CardsPlayed';
import Hand from './Hand';
import Players from './Players';
import Phrase from './Phrase';

const useStyles = makeStyles((theme) => ({
  cardsPlayed: {
    minHeight: 270
  }
}));

export default function Board() {
  const classes = useStyles();
  const [boardClean, setBoardClean] = React.useState(true);

  // TODO: Get this value from the API
  const roundCompleted = true;
  const playerPlayed = false;

  React.useEffect(() => {
    !!roundCompleted && setBoardClean(true);
    !!playerPlayed && setBoardClean(false);
  }, [roundCompleted, playerPlayed])

  return (
    <Container>
      <Grid container>
        <Grid item xs={12} className={classes.cardsPlayed}>
          {!!boardClean && <CardsPlayed />}
        </Grid>
        <Grid item xs={2} sm={2}>
          <Players />
        </Grid>
        <Grid item xs={8} sm={10}>
          <Phrase />
          <Hand />
        </Grid>
        <Grid item xs={2} sm={2}></Grid>
      </Grid>
    </Container>
  );
}
