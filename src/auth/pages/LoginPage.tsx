import React, { ChangeEvent, useMemo } from "react";
import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import {
  Grid,
  TextField,
  Typography,
  Button,
  Link,
  Alert,
} from "@mui/material";
import { Google } from "@mui/icons-material";

import { useForm } from "../../hooks";
import {
  AppDispatch,
  RootState,
  startGoogleSingIn,
  startLoginWithEmailAndPassword,
  useAppDispatch,
} from "../../store";

import { AuthLayout } from "../layout/AuthLayout";

const formInitial = {
  email: "",
  password: "",
};

export const LoginPage: React.FC = () => {
  const { status, errorMessage } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useAppDispatch();
  const { changeValueInput, stateForm } = useForm(formInitial, {});
  const { email, password } = stateForm;

  const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(startLoginWithEmailAndPassword(email, password) as AppDispatch);
  };

  const onGoogleSingIn = () => {
    dispatch(startGoogleSingIn() as AppDispatch);
  };

  const isChecking = useMemo(() => status === "Checking", [status]);

  return (
    <AuthLayout title="Login">
      <form
        autoComplete="off"
        onSubmit={onSubmit}
        className="animate__animated animate__fadeIn animate__faster"
      >
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
            {errorMessage && (
              <Grid item xs={12} sx={{ mb: 2 }}>
                <Alert severity="error">{errorMessage}</Alert>
              </Grid>
            )}
            <Grid item xs={12} md={6}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={isChecking}
              >
                Login
              </Button>
            </Grid>

            <Grid item xs={12} md={6}>
              <Button
                type="button"
                variant="contained"
                fullWidth
                onClick={onGoogleSingIn}
                disabled={isChecking}
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
