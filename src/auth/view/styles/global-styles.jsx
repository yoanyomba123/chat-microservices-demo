import theme from './theme';

const globalStyles = {
  '@global': {
    a: {
      textDecoration: 'none',
      color: theme.palette.action.active,
    },
  },
  footNav: {
    width: '100%',
    padding: theme.spacing.unit,
    marginTop: theme.spacing.unit,
  },
  error: {
    padding: theme.spacing.unit / 2,
    backgroundColor: theme.palette.error.light,
    color: theme.palette.common.white,
    width: '100%',
    textAlign: 'center',
  },
  info: {
    padding: theme.spacing.unit / 2,
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.common.white,
    width: '100%',
    textAlign: 'center',
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  main: {
    width: 'auto',
    display: 'block',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
};

export { theme, globalStyles };
