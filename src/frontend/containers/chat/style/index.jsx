import { globalStyles, theme } from '../../../styles/global-styles';

const styles = () => ({
  ...globalStyles,
  root: {
    display: 'flex',
  },
  menuButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
});

export default styles;
