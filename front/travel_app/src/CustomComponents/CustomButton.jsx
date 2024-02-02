import React from 'react';
import { Button } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';


const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: 'red',
          fontSize: '1rem',
        }
      }
    }
  }
})


export default function CustomButton() {
  return (
    <ThemeProvider theme={theme}>
      <Button>font-size: 1rem</Button>
    </ThemeProvider>
  )
}