import '@fontsource-variable/manrope';
import { ThemeProvider, createTheme } from '@mui/material';
import RootLayout from './layouts/RootLayout';
import { useEffect } from 'react';

const theme = createTheme({
  palette: {
    primary: {
      main: '#383B53'
    },
    secondary: {
      main: '#777777'
    }
  },
  shape: {
    borderRadius: 8
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            color: '#777777'
          },
          borderRadius: 8
        }
      }
    }
  }
})

// const initialData: TodoItemData[] = data.map(({ done, text, createdAt }, idx): TodoItemData => {
//   const date = new Date(createdAt);
//   date.setMilliseconds(date.getMilliseconds() + idx); // add 1 ms difference to each item for sorting
//   return {
//     done,
//     text,
//     createdAt: date,
//     id: `${date.getTime()}-${text}`,
//   };
// });

function App() {
  useEffect(() => {
    document.title = 'Todo List';
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <RootLayout />
    </ThemeProvider>
  );
}

export default App;