import React, { ChangeEvent } from "react";

import { Link as RouterLink } from "react-router-dom";

import { Grid, TextField, Typography, Button, Link } from "@mui/material";

import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks";

const formData = {
  displayName: "Carlos Zabala",
  email: "carlos@example.com",
  password: "12345",
};

export const RegisterPage: React.FC = () => {
  const { displayName, email, password, changeValueInput, stateForm } =
    useForm(formData);

  const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(stateForm);
  };

  return (
    <AuthLayout title="Crear cuenta">
      <form onSubmit={onSubmit}>
        <Grid container>
          <Grid item xs={12} sx={{ marginBottom: 2 }}>
            <TextField
              label="Nombre completo"
              type="text"
              placeholder="Carlos Zabala"
              fullWidth
              name="displayName"
              value={displayName}
              onChange={changeValueInput}
            />
          </Grid>

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

          <Grid container sx={{ mb: 2 }}>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" fullWidth>
                Crear cuenta
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Typography sx={{ mr: 1 }}> ¿Ya tienes cuenta?. </Typography>
            <Link component={RouterLink} color="inherit" to="/auth/login">
              ingresar
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
