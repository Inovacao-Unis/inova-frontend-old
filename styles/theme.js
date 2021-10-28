import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

const breakpoints = createBreakpoints({
  sm: '30em',
  md: '48em',
  lg: '62em',
  xl: '80em',
  '2xl': '100em',
});

const theme = extendTheme({
  breakpoints,
  initialColorMode: 'light',
  fonts: {
    body: `Roboto,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`,
  },
  fontWeights: {
    normal: 400,
    medium: 600,
    bold: 700,
    xBold: 900,
  },
  colors: {
    custom: {
      50: '#ffe8fe',
      100: '#defcb2',
      200: '#caf884',
      300: '#b5f554',
      400: '#a1f226',
      500: ' #88d90d',
      600: ' #69a905',
      700: ' #4a7801',
      800: ' #2b4800',
      900: '#0b1900',
    },
    wine: '#240000',
    highlight: '#9e2a96',
  },
});

export default theme;
