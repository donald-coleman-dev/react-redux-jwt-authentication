import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { SPINNER_STYLES } from './constants';

const Spinner = ({ classes }) =>
  <CircularProgress className={classes.progress} size={20} disableShrink />;

Spinner.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(SPINNER_STYLES)(Spinner);
