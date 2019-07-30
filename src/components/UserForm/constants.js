import * as Yup from 'yup';

export const FORM_MODE = {
  REGISTER: 'register',
  LOGIN: 'login',
  ACCOUNT: 'account',
};

export const FORM_TITLE_MAP = {
  [FORM_MODE.REGISTER]: 'Register',
  [FORM_MODE.LOGIN]: 'Login',
  [FORM_MODE.ACCOUNT]: 'Edit Account',
};

const authShape = {
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .min(3, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Required'),
};

const profileShape = {
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
};

export const AUTH_SCHEMA = Yup.object().shape(authShape);
export const USER_SCHEMA = Yup.object().shape({
  ...authShape,
  ...profileShape,
});

export const CONTROL_STYLES = theme => ({
  textField: {
    width: 350,
    display: 'block',
  },
  select: {
    width: 350,
    marginTop: theme.spacing.unit * 2,
  },
  formControl: {
    minWidth: 350,
    display: 'block',
  },
  button: {
    marginTop: theme.spacing.unit * 2,
  },
});
