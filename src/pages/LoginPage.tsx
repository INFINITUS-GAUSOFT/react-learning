import {
  Alert,
  Avatar,
  Box,
  Button,
  Checkbox,
  Collapse,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  IconButton,
  Link,
  TextField,
  Typography
} from "@mui/material";

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useSupabase } from "../hooks/useSupabase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "react-query";
import { Credentials } from "../types";
import CloseIcon from '@mui/icons-material/Close';

export default function LoginPage() {
  const supabase = useSupabase();
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [hasApiError, setHasApiError] = useState(false);

  const [openAlert, setOpenAlert] = useState(true);

  const isEmail = (email: string) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

  const [errors, setErrors] = useState({
    hasEmailError: false,
    hasPasswordError: false,
  });

  const { mutate, isLoading } = useMutation(async (data: Credentials) => {
    const { data: response, error } = await supabase.auth.signInWithPassword(
      {
        email: data.email,
        password: data.password,
      }
    )

    if (error) {
      setMessage(error.message);
      setHasApiError(true);
      return error;
    } else {

      setMessage("Login successfully!");
      setHasApiError(false);

      navigate("/");

      return response;
    }
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    // Perform field validation
    const formErrors = {
      hasEmailError: !data.get('email') || !isEmail(`${data.get('email')}`),
      hasPasswordError: !data.get('password'),
    };

    setErrors(formErrors);

    if (formErrors.hasEmailError || formErrors.hasPasswordError) return;

    const userData: Credentials = {
      email: `${data.get('email')}`,
      password: `${data.get('password')}`,
    }

    mutate(userData);
  };


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          {hasApiError && <Collapse in={openAlert}> <Alert variant="filled" severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpenAlert(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }>{message}</Alert> </Collapse>}
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            error={errors.hasEmailError}
            helperText={errors.hasEmailError && 'Email Address is not valid!'}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            error={errors.hasPasswordError}
            helperText={errors.hasPasswordError && 'Password is required'}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}