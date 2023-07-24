import '@fontsource-variable/manrope';
import { CircularProgress, Container, ThemeProvider, createTheme } from '@mui/material';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useSupabase } from './hooks/useSupabase';
import ProductList from './components/ProductList';


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
  const supabase = useSupabase();
  // const { data: countries, isLoading } = useQuery("countries", getCountries);


  useEffect(() => {
    document.title = 'Todo List';
  }, [])

  // async function getCountries() {
  //   const { data } = await supabase.from("countries").select();
  //   return data;
  // }

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Container sx={{ py: '2em' }} maxWidth='xs'>
          {/* <TodoList initialData={initialData} /> */}
          <ProductList />
          {/* {isLoading ? <CircularProgress /> : (
            <ul>
              {countries?.map((country) => (
                <li key={country.name}>{country.name}</li>
              ))}
            </ul>)} */}
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;