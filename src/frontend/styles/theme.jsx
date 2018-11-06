import { createMuiTheme } from '@material-ui/core/styles';

const palette = {
  tonalOffset: 0.2,
  contrastThreshold: 3,
  secondary: {
    main: '#455A64',
    light: 'rgb(106, 123, 131)',
    dark: 'rgb(48, 62, 70)',
    contrastText: '#FAFAFA',
  },
  common: { black: '#000', white: '#fff' },
  error: {
    light: '#e57373',
    main: '#f44336',
    dark: '#d32f2f',
    contrastText: '#fff',
  },
  type: 'light',
  primary: {
    main: '#0277BD',
    light: 'rgb(52, 146, 202)',
    dark: 'rgb(1, 83, 132)',
    contrastText: '#fff',
  },
  grey: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#eeeeee',
    300: '#e0e0e0',
    400: '#bdbdbd',
    500: '#9e9e9e',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
    A700: '#616161',
    A100: '#d5d5d5',
    A400: '#303030',
    A200: '#aaaaaa',
  },
  action: {
    active: 'rgb(52, 146, 202)',
    hover: 'rgb(1, 83, 132)',
    hoverOpacity: 0.08,
  },
};

const typography = {
  useNextVariants: true,
};

const spacing = {
  unit: 10,
};

export default createMuiTheme({ palette, typography, spacing });
