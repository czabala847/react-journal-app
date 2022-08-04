import React, { ChangeEvent, useMemo, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Grid,
  TextField,
  Typography,
  Button,
  Link,
  Alert,
} from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { FormValidation, useForm } from "../../hooks/useForm";

import {
  AppDispatch,
  RootState,
  startCreatingUserWithEmailPassword,
  useAppDispatch,
} from "../../store";
import { useSelector } from "react-redux";

const formData = {
  displayName: "",
  email: "",
  password: "",
};

const validations: FormValidation = {
  email: [
    (value: string) => value.includes("@"),
    "El correo debe de tener un @.",
  ],
  password: [
    (value: string) => value.length >= 6,
    "El password debe de tener más de 6 letras.",
  ],
  displayName: [
    (value: string) => value.length >= 1,
    "El nombre es obligatorio.",
  ],
};

export const RegisterPage: React.FC = () => {
  const [submit, setSubmit] = useState<boolean>(false);
  const { changeValueInput, formValidation, isFormValid, stateForm } = useForm(
    formData,
    validations
  );
  const { displayName, email, password } = stateForm;
  const { displayNameValid, emailValid, passwordValid } = formValidation;
  const dispatch = useAppDispatch();

  const { status, errorMessage } = useSelector(
    (state: RootState) => state.auth
  );

  const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmit(true);

    if (!isFormValid) return;

    dispatch(
      startCreatingUserWithEmailPassword({
        displayName,
        email,
        password,
      }) as AppDispatch
    );
  };

  const isChecking = useMemo(() => status === "Checking", [status]);

  return (
    <AuthLayout title="Crear cuenta">
      <form onSubmit={onSubmit} autoComplete="off">
        <h1>Form</h1>
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
              error={!!displayNameValid && submit}
              helperText={displayNameValid}
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
              error={!!emailValid && submit}
              helperText={emailValid}
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
              error={!!passwordValid && submit}
              helperText={passwordValid}
            />
          </Grid>

          <Grid container sx={{ mb: 2 }}>
            {errorMessage && (
              <Grid item xs={12} sx={{ mb: 2 }}>
                <Alert severity="error">{errorMessage}</Alert>
              </Grid>
            )}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={isChecking}
              >
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
