import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Spinner from 'components/Spinner';
import {
  FORM_MODE,
  FORM_TITLE_MAP,
  AUTH_SCHEMA,
  USER_SCHEMA,
  CONTROL_STYLES,
} from './constants';

export * from './constants';

const renderFormContent = props => {
  const {
    mode,
    classes,
    formInitialValues,
    rolesOptions,
    onSubmit,
    submitting,
  } = props;
  let formSchema = null;
  let submitLabel = null;

  if (mode === FORM_MODE.REGISTER || mode === FORM_MODE.LOGIN) {
    formSchema = AUTH_SCHEMA;
    submitLabel = mode;
  } else {
    formSchema = USER_SCHEMA;
    submitLabel = 'submit';
  }

  return (
    <Formik
      initialValues={formInitialValues}
      validationSchema={formSchema}
      onSubmit={values => {
        const { email, password, firstName, lastName, role } = values;
        const { _id } = formInitialValues;

        if (mode === FORM_MODE.REGISTER) {
          onSubmit({ email, password, role });
        } else if (mode === FORM_MODE.LOGIN) {
          onSubmit({ email, password });
        } else if (mode === FORM_MODE.ACCOUNT) {
          onSubmit({ _id, email, password, firstName, lastName });
        }
      }}
      render={() => (
        <Form>
          <Field
            name="email"
            render={({ field }) => (
              <TextField
                label="Email"
                type="email"
                fullWidth
                className={classes.textField}
                margin="normal"
                {...field}
              />
            )}
          />
          <ErrorMessage name="email" component="div" />
          <Field
            name="password"
            render={({ field }) => (
              <TextField
                label="Password"
                type="password"
                fullWidth
                className={classes.textField}
                margin="normal"
                {...field}
              />
            )}
          />
          <ErrorMessage name="password" component="div" />
          {mode === FORM_MODE.ACCOUNT && (
            <Fragment>
              <Field
                name="firstName"
                render={({ field }) => (
                  <TextField
                    label="First Name"
                    type="text"
                    fullWidth
                    className={classes.textField}
                    margin="normal"
                    {...field}
                  />
                )}
              />
              <ErrorMessage name="firstName" component="div" />
              <Field
                name="lastName"
                render={({ field }) => (
                  <TextField
                    label="Last Name"
                    type="text"
                    fullWidth
                    className={classes.textField}
                    margin="normal"
                    {...field}
                  />
                )}
              />
              <ErrorMessage name="lastName" component="div" />
            </Fragment>
          )}
          <Button
            className={classes.button}
            type="submit"
            variant="contained"
            color="primary"
            disabled={submitting}
          >
            {submitting && <Spinner />}
            {!submitting && <span>{submitLabel}</span>}
          </Button>
        </Form>
      )}
    />
  );
};

const UserForm = ({ mode, classes, rolesData, user, onSubmit }) => {
  const { loading: submitting, data } = user;
  let formInitialValues = { email: '', password: '' };
  let rolesOptions = null;

  if (mode === FORM_MODE.REGISTER) {
    rolesOptions = rolesData.map(role => (
      <MenuItem key={role._id} value={role._id}>
        {role.name}
      </MenuItem>
    ));
    formInitialValues = {
      ...formInitialValues,
      role: rolesData[0]._id,
    };
  }

  if (mode === FORM_MODE.ACCOUNT) {
    formInitialValues = {
      ...formInitialValues,
      firstName: '',
      lastName: '',
      ...data,
      role: data.role._id,
    };
  }

  return (
    <div className="user-form">
      <Card className={cx('card', mode)}>
        <CardHeader className="card-header" title={FORM_TITLE_MAP[mode]} />
        <CardContent className="card-content">
          {renderFormContent({
            mode,
            classes,
            formInitialValues,
            rolesOptions,
            onSubmit,
            submitting,
          })}
        </CardContent>
      </Card>
    </div>
  );
};

UserForm.propTypes = {
  mode: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  rolesData: PropTypes.array,
  user: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

UserForm.defaultProps = {
  rolesData: null,
};

export default withStyles(CONTROL_STYLES)(UserForm);
