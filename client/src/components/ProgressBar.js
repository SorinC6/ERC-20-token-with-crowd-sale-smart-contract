import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#1a90ff',
  },
}))(LinearProgress);

function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center" flexDirection="column">
      <Box width="100%" mr={1} mb={3}>
        <BorderLinearProgress variant="determinate" {...props} />
      </Box>
      <Box>
        <Typography variant="body2" color="textSecondary">
          {`${props.tokensSold} / ${props.tokensAvailable} tokens sold`}
        </Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

const useStyles = makeStyles({
  root: {
    maxWidth: '700px',
    margin: '0 auto',
  },
});

export default function LinearWithValueLabel({ tokensSold, tokensAvailable }) {
  const classes = useStyles();
  const [progress, setProgress] = React.useState(80);

  const progressProcent = (tokensSold / tokensAvailable) * 100;
  return (
    <div className={classes.root}>
      <LinearProgressWithLabel
        value={progressProcent}
        tokensSold={tokensSold}
        tokensAvailable={tokensAvailable}
      />
    </div>
  );
}
