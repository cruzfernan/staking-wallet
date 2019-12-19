import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';
import { createGlobalStyle } from 'styled-components';

export const baseTheme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      primary: {
        main: '#0D0D0D',
      },
      secondary: {
        main: '#6FC7D9',
      },
      text: {
        primary: '#FFFFFF',
        secondary: '#7B7B7B',
      },
    },
    overrides: {
      MuiContainer: {
        root: {
          backgroundColor: 'black',
        },
      },
    },
  }),
);

export const AppStyles = {};

/**
 * DEV_NOTE : This, together with the 'responsiveFontSizes' ensures responsiveness in the Typography and 'em/rem' sizes.
 */
export const GlobalStyleComponent = createGlobalStyle`
  body {
    @media (min-width: 1920px) {
      font-size: 20px;
    }

    @media (max-width: 1920px) {
      font-size: 18px;
    }

    @media (max-width: 1600px) {
      font-size: 16px;
    }

    @media (max-width: 1366px) {
      font-size: 14px;
    }

    @media (max-width: 1200px) {
      font-size: 12px;
    }

    @media (max-width: 1024px) {
      font-size: 10px;
    }

    @media (max-width: 768px) {
      font-size: 8px;
    }
  }
`;