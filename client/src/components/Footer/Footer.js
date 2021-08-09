import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import useStyles from './styles';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


export default function Footer() {
  const classes = useStyles();


  return (
    <footer className={classes.footer}>
      <Container maxWidth="xl">
        <Copyright />
      </Container>
    </footer>
  );
}
