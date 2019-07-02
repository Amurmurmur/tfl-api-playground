import React from 'react';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

function CustomButton({ fetching, children, ...props }) {
  const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1),
    },
    loader: {
      paddingRight: theme.spacing(1),
    },
  }));

  const classes = useStyles();

  return (
    <Button {...props} className={classes.button}>
      {fetching && <CircularProgress size={20} className={classes.loader} />}
      {children}
    </Button>
  );
}

export default CustomButton;
