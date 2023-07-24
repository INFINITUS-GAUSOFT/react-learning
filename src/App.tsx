import '@fontsource-variable/manrope';
import { Container, ThemeProvider, createTheme } from '@mui/material';
import { useEffect } from 'react';
import data from './assets/dummy-data.json';
import TodoList, { TodoItemData } from './components/TodoList';

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
          // add border radius 8
          borderRadius: 8
        }
      }
    }
  }
})

const initialData: TodoItemData[] = data.map(({ done, text, createdAt }, idx): TodoItemData => {
  const date = new Date(createdAt);
  date.setMilliseconds(date.getMilliseconds() + idx); // add 1 ms difference to each item for sorting
  return {
    done,
    text,
    createdAt: date,
    id: `${date.getTime()}-${text}`,
  };
});

function App() {
  useEffect(() => {
    document.title = 'Todo List';
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Container sx={{ py: '2em' }} maxWidth='xs'>
          <TodoList initialData={initialData}/>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;