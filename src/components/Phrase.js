import React from 'react';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  phrase: {
    fontFamily: 'Ubuntu Condensed', // 'Lobster',
    textAlign: 'center',
    color: '#630e0e'
  },
  paper: {
    height: 50
  }
}));

export default function Phrase(props) {
  const { apiUrl } = { ...props };
  const classes = useStyles();
  const [phrase, setPhrase] = React.useState('');
  
  // Fetch phrase
  React.useEffect(() => {
    const fetchData = async () => {
      axios.get(`${apiUrl}/playedCards`)
        .then(res => {
          const data = res && res.data && res.data.phrase;
          setPhrase(data);
        })
    };
    fetchData();
  }, []);

  return (
    <Paper elevation={10} className={classes.paper}>
      <Typography variant='h6' className={classes.phrase}>{ phrase }</Typography>
    </Paper>
  );
}
