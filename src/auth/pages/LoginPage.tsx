import React, { ChangeEvent } from "react";
import { Link as RouterLink } from "react-router-dom";

import { Grid, TextField, Typography, Button, Link } from "@mui/material";
import { Google } from "@mui/icons-material";

import { useForm } from "../../hooks";
import {
  AppDispatch,
  checkingAuthentication,
  startGoogleSingIn,
  useAppDispatch,
} from "../../store";

import { AuthLayout } from "../layout/AuthLayout";

export const LoginPage: React.FC = () => {
  const { email, password, changeValueInput } = useForm({
    email: "carlos@example.com",
    password: "123456",
  });

  const dispatch = useAppDispatch();

  const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(checkingAuthentication(email, password) as AppDispatch);
  };

  const onGoogleSingIn = () => {
    dispatch(startGoogleSingIn() as AppDispatch);
  };

  return (
    <AuthLayout title="Login">
      <form autoComplete="off" onSubmit={onSubmit}>
        <Grid container>
          <Grid item xs={12} sx={{ marginBottom: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@google.com"
              fullWidth
              name="email"
              value={email}
              onChange={changeValueInput}
            />
          </Grid>

          <Grid item xs={12} sx={{ marginBottom: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth
              name="password"
              value={password}
              onChange={changeValueInput}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} md={6}>
              <Button type="submit" variant="contained" fullWidth>
                Login
              </Button>
            </Grid>

            <Grid item xs={12} md={6}>
              <Button
                type="button"
                variant="contained"
                fullWidth
                onClick={onGoogleSingIn}
              >
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Link component={RouterLink} color="inherit" to="/auth/register">
              Crear una cuenta
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
