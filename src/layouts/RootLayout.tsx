import { Box, AppBar, Toolbar, IconButton, Typography, Button, Container } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { Outlet } from "react-router-dom";

export default function RootLayout() {
    return (
      <div className="App">
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <Button color="inherit" sx={{ textTransform: 'none'}} href="/">Ecommerce</Button>
              </Typography>
              <Button color="inherit">Login</Button>
            </Toolbar>
          </AppBar>
        </Box>
        <Container sx={{ py: '2em' }} maxWidth='sm'>
          <Outlet />
        </Container>
      </div>
    );
}