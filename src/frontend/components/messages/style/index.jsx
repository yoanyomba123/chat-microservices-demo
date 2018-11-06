import { theme } from '../../../styles/global-styles';

const drawerWidth = 240;
const styles = () => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: 'calc(100vh - 8vh)',
    maxHeight: 'calc(100vh - 8vh)',
    overflowY: 'scroll',
  },
  shifter: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginRight: drawerWidth - 50,
  },
  messageText: {
    // ...theme.mixins.gutters(),
    padding: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  chip: {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.secondary.contrastText,
    marginRight: theme.spacing.unit,
    height: theme.spacing.unit * 2,
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    fontSize: '0.6em',
    height: theme.spacing.unit * 3,
    width: theme.spacing.unit * 3,
  },
  messageMine: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
  },
  avatarMine: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    fontSize: '0.6em',
    height: theme.spacing.unit * 3,
    width: theme.spacing.unit * 3,
  },
});

export default styles;
