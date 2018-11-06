import { theme } from '../../../styles/global-styles';

const drawerWidth = 240;
const styles = () => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  userItem: {
    borderBottom: '1px solid #f5f5f5',
  },
  drawer: {
    width: 50,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    height: 'calc(100vh - 8vh)',
    maxHeight: 'calc(100vh - 8vh)',
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  },
  drawerHeader: {
    width: drawerWidth,
    padding: '0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.palette.secondary.main,
    position: 'fixed',
    zIndex: 9999,
    top: 0,
    bottom: 'auto',
    left: 'auto',
    right: 0,
  },
  userSelf: {
    ...theme.typography.button,
    display: 'inline-flex',
    padding: theme.spacing.unit / 2,
    marginTop: theme.spacing.unit * 1.5,
    color: theme.palette.primary.contrastText,
  },
  iconButton: {
    color: theme.palette.primary.contrastText,
    marginTop: theme.spacing.unit * 1.5,
    marginRight: theme.spacing.unit / 2,
    marginLeft: theme.spacing.unit / 2,
    marginBottom: theme.spacing.unit / 2,
    padding: theme.spacing.unit / 2,
  },
  server: {
    fontSize: '0.625em',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    color: 'white',
    backgroundColor: '#566d77',
    textAlign: 'center',
    padding: '1px',
  },
  navDivider: {
    marginTop: theme.spacing.unit * 5,
  },
});

export default styles;
