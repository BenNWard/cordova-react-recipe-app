// src/theme.ts

import { createTheme } from "@mui/material/styles";

// Define your custom colors
const customColors = {
  danger: "#e3450c",
  accent1: "#3ca5f6",
  accent2: "#2f7dda",
  accent3: "#c7b2cc",
};

// Create your theme
export const theme = createTheme({
  palette: {
    primary: {
      main: "#901e44",
    },
    secondary: {
      main: "#c03a68",
    },
    info: {
      main: "#d8788e",
    },
    success: {
      main: "#1cb07e",
    },
    warning: {
      main: "#d5d41a",
    },
    
    // Add custom colors here
    ...(customColors && { danger: customColors.danger }),
    ...(customColors && { accent1: customColors.accent1 }),
    ...(customColors && { accent2: customColors.accent2 }),
    ...(customColors && { accent3: customColors.accent3 }),
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    // Customize typography options here
    h1: {
      fontSize: "2rem",
      fontWeight: 500,
    },
    h2: {
      fontSize: "1.5rem",
      fontWeight: 500,
    },
    h3: {
      fontSize: "1.2rem",
      fontWeight: 500,
    },
    // Add more typography options as needed
    subtitle1: {
      fontSize: "1rem",
      fontWeight: 400,
    },
    subtitle2: {
      fontSize: "0.875rem",
      fontWeight: 400,
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
    },
    body2: {
      fontSize: "0.875rem",
      fontWeight: 400,
    },
  },
  spacing: 2, // Adjust spacing as per your preference
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  shape: {
    borderRadius: 8, // Adjust border radius
    // Add more shape options as needed
  },
  transitions: {
    easing: {
      // Customize easing options
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
    },
    duration: {
      // Adjust animation durations
      short: 300,
      standard: 500,
    },
    // Add more transition options as needed
  },
  zIndex: {
    appBar: 1200,
    drawer: 1100,
  },
  components: {
    MuiButton: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiFilledInput: {
      defaultProps: {
        margin: 'dense',
      },
    },
    MuiFormControl: {
      defaultProps: {
        margin: 'dense',
      },
    },
    MuiFormHelperText: {
      defaultProps: {
        margin: 'dense',
      },
    },
    MuiIconButton: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiInputBase: {
      defaultProps: {
        margin: 'dense',
      },
    },
    MuiInputLabel: {
      defaultProps: {
        margin: 'dense',
      },
    },
    MuiListItem: {
      defaultProps: {
        dense: true,
      },
    },
    MuiOutlinedInput: {
      defaultProps: {
        margin: 'dense',
      },
    },
    MuiFab: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiTable: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiTextField: {
      defaultProps: {
        margin: 'dense',
      },
    },
    MuiToolbar: {
      defaultProps: {
        variant: 'dense',
      },
    },
  },
  // Add more theme options as needed
});

// Export the custom theme
export default theme;
