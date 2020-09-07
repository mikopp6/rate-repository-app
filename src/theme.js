import { Platform } from "react-native";

const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#ffffff',
    primary: '#0366d6',
    appBarBackground: '#24292e'
  },
  fontSizes: {
    body: 14,
    heading: 20,
    subheading: 16,
  },
  fonts: {
    main: Platform.select({
      android: 'Roboto',
      ios: 'Arial'
    }),
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
};

export default theme;