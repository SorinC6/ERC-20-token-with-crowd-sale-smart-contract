import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '700px',
    margin: '0 auto',
    paddingTop: '30px',
  },
}));

export default function DescriptionAlerts() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Alert severity="warning">
        <AlertTitle>
          <strong>Notice</strong>
        </AlertTitle>
        This token sale uses the Rinkeby Test Network with fake ether. Use a browser extension like
        Metamask to connect to the test network and participate in the ICO. Please be patient if the
        test network runs slowly
      </Alert>
      {/* <Alert severity="info">
        <AlertTitle>Info</AlertTitle>
        This is an info alert — <strong>check it out!</strong>
      </Alert> */}
    </div>
  );
}
