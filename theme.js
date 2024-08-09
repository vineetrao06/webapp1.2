// theme.js
import { DefaultTheme } from 'react-native-paper';

const customTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#70c485',     // Custom primary color
        secondary: '#4996a3',   // Custom secondary color
        background: '#121212',  // Dark mode background color
        surface: '#333333',     // Dark mode surface color
        text: '#ffffff', 
        // onSurface: '#484848'       
        // Light text color for dark mode
        // Add other colors as needed
    },
};

export default customTheme;
