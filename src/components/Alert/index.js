import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import { ALERT_STYLES } from './constants';

export * from './constants';

class Alert extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    closable: PropTypes.bool
  };

  static defaultProps = {
    closable: false
  }

  state = {
    visible: true
  };

  onClose = () => this.setState({ visible: false });

  render() {
    const { classes, type, message, closable } = this.props;
    const { visible } = this.state;
    const cxName = cx(classes.alert, classes[type]);

    if (!visible) {
      return null;
    }

    return (
      <div className={cxName}>
        <span>{message}</span>
        {closable &&
          <IconButton
            aria-label="Close"
            className={classes.margin}
            onClick={this.onClose}
          >
            <ClearIcon />
          </IconButton>
        }
      </div>
    );
  }
};

export default withStyles(ALERT_STYLES)(Alert);
