export const ALERT_TYPE = {
  ERROR: 'error',
  INFO: 'info',
  SUCCESS: 'success'
};

export const ALERT_STYLES = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
  alert: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  error: {
    color: '#721c24',
    backgroundColor: '#f8d7da'
  },
  info: {
    color: '#856404',
    backgroundColor: '#fff3cd'
  },
  success: {
    color: '#155724',
    backgroundColor: '#d4edda'
  }
});
