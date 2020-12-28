import React, { Fragment } from 'react';
import axios from 'axios';
import { Context } from './store/Store';
import { makeStyles } from '@material-ui/core/styles';
import { getTexts } from './resources/Texts';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import HandCard from './HandCard';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles(() => ({
  root: {
    textAlign: 'center'
  },
  title: {
    fontFamily: 'Lobster',
    textAlign: 'center',
    color: 'white'
  },
  dialog: {
    fontFamily: 'Lobster',
    textAlign: 'center',
    paddingTop: 20
  },
  media: {
    height: 400,
    width: 300
  },
  controls: {
    justifyContent: 'center'
  }
}));

export default function Hand(props) {
  const { apiUrl, hasTurn, mainPlayer } = { ...props };
  const playerName = 'George';
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [yourTurn, setYourTurn] = React.useState(true);
  const [cardToSelect, setCardToSelect] = React.useState(undefined);
  const [phrase, setPhrase] = React.useState('');
  const [showMyCards, setShowMyCards] = React.useState(true);
  const [formError, setFormError] = React.useState(false);

  // Fetch cards per player
  React.useEffect(() => {
    const fetchData = async () => {
      axios.get(`${apiUrl}/cards?player=${playerName}`)
        .then(res => {
          const data = res && res.data;
          console.log(data)
          setCards(data);
        })
    };
    fetchData();
  }, []);

  // TODO: Get current player from the API
  const currentPlayer = 'George';
  const texts = getTexts({ currentPlayer });

  const question = yourTurn ? texts.cardSelectionDialog.question.mainPlayer
    : texts.cardSelectionDialog.question.otherPlayers;

  // Use global state
  const [state, setState] = React.useContext(Context);

  const openDialog = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  const startSelection = (card) => {
    !!card && setCardToSelect(card);
    openDialog();
  }
  const completeSelection = () => {
    let playedData = { card: cardToSelect, mainPlayer: mainPlayer }

    const postData = async (data) => {
      axios.post(`${apiUrl}/playedCards`, { ...data })
        .then(res => {
          setShowMyCards(false);
        })
    };

    if(!!mainPlayer) {
      if (!!phrase) {
        setFormError(false);
        setState({ type: 'SELECT_CARD', payload: cardToSelect });
        setPhrase('');
        closeDialog();

        playedData = { ...playedData, phrase: phrase }
        postData(playedData);
      } else {
        setFormError(true);
      }
    } else {
      postData(playedData);
    }
  }

  const addPhrase = (event) => {
    const value = event && event.target && event.target.value;
    setPhrase(value);
  }

  return (
    <Fragment>
      { showMyCards && <div className={classes.root}>
        {cards.map((card) =>
          <Button key={card} onClick={() => startSelection(card)}>
            <HandCard card={card} />
          </Button>)
        }

        <Dialog
          open={open}
          onClose={closeDialog}>

          <CardMedia
            className={classes.media}
            image={`./resources/pictures/cards/${cardToSelect}.jpg`} />

          { !!mainPlayer && <Fragment>
            <Typography variant='h6' className={classes.dialog}>
              {question}
            </Typography>

            <DialogContent>
              <DialogContentText>
                <TextField onChange={addPhrase} fullWidth
                  helperText='Describe your card!'
                  error={formError}
                />
              </DialogContentText>
            </DialogContent>
          </Fragment>}

          <DialogActions className={classes.controls}>
            <Button onClick={closeDialog} color='secondary'>
              <ClearIcon />
            </Button>
            <Button onClick={completeSelection} color='secondary' disabled={!hasTurn}>
              <CheckIcon />
            </Button>
          </DialogActions>
        </Dialog>
      </div>}
    </Fragment>
  );
}
