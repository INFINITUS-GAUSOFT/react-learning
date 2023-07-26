import { Container, CssBaseline, Box, Avatar, Typography, Grid, TextField, FormControlLabel, Checkbox, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useMutation } from "react-query";
import { useSupabase } from "../hooks/useSupabase";
import { UserData } from "../types";
import { useState } from "react";

export default function RegisterPage() {
    const supabase = useSupabase();
    const navigate = useNavigate();

    const [errors, setErrors] = useState({
        hasFirstnameError: false,
        hasLastnameError: false,
        hasEmailError: false,
        hasPasswordError: false,
    });

    const { mutate, isLoading } = useMutation(async (data: UserData) => {
        const { data: response, error } = await supabase.auth.signUp(
            {
                email: data.email,
                password: data.password,
                options: {
                    data: { firstname: data.firstname, lastname: data.lastname },
                }
            }
        )

        if (error) {
            console.error(error);
            return error;
        } else {

            console.log("Registration successfully:", response);

            navigate("/login");

            return response;
        }
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });

        // Perform field validation
        const formErrors = {
            hasFirstnameError: !data.get('firstname'),
            hasLastnameError: !data.get('lastname'),
            hasEmailError: !data.get('email'),
            hasPasswordError: !data.get('password'),
        };

        setErrors(formErrors);

        const userData: UserData = {
            email: `${data.get('email')}`,
            password: `${data.get('password')}`,
            firstname: `${data.get('firstname')}`,
            lastname: `${data.get('lastname')}`,
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
                    Sign up
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="given-name"
                                name="firstname"
                                required
                                fullWidth
                                id="firstname"
                                label="First Name"
                                autoFocus
                                error={errors.hasFirstnameError}
                                helperText={errors.hasFirstnameError && 'First Name is required'}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="lastname"
                                label="Last Name"
                                name="lastname"
                                autoComplete="family-name"
                                error={errors.hasLastnameError}
                                helperText={errors.hasLastnameError && 'Last Name is required'}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                error={errors.hasEmailError}
                                helperText={errors.hasEmailError && 'Email Address is required'}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                error={errors.hasPasswordError}
                                helperText={errors.hasPasswordError && 'Password is required'}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary" />}
                                label="I want to receive inspiration, marketing promotions and updates via email."
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={isLoading}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link to="#">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}