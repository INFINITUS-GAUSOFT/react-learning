import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import App from './App';
import reportWebVitals from './reportWebVitals';
import { QueryClient, QueryClientProvider } from 'react-query';
import { SupabaseContextProvider } from './context/SupabaseContext';
import { createClient } from '@supabase/supabase-js';

import './index.css';
import Product from './pages/Product';

const queryClient = new QueryClient()

const supabase = createClient(`${process.env.REACT_APP_SUPABASE_URL}`, `${process.env.REACT_APP_SUPABASE_KEY}`);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "/products/:id",
        element: <Product />,
        errorElement: <h2>Product not found</h2>,
      }
    ]
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <SupabaseContextProvider client={supabase}>
        <RouterProvider router={router} />
      </SupabaseContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
