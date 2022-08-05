import React, { useMemo } from "react";
import { Grid, Typography, Button, TextField } from "@mui/material";
import { SaveOutlined } from "@mui/icons-material";
import { ImageGallery } from "../components";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useForm } from "../../hooks";

export const NoteView: React.FC = () => {
  const { active: note } = useSelector((state: RootState) => state.journal);
  const { stateForm, changeValueInput } = useForm(note as {});
  const { title, body } = stateForm;

  const newDate = useMemo(() => {
    let date: Date;

    if (note && note.date) {
      date = new Date(note.date);
    } else {
      date = new Date();
    }

    return date.toUTCString();
  }, [note?.date]);

  return (
    <Grid
      className="animate__animated animate__fadeIn animate__faster"
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mb: 1 }}
    >
      <Grid item>
        <Typography fontSize={39} fontWeight="light">
          {newDate}
        </Typography>
      </Grid>

      <Grid item>
        <Button color="primary" sx={{ padding: 2 }}>
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Guardar
        </Button>
      </Grid>

      <Grid container>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Ingrese un título"
          label="Título"
          sx={{ border: "none", mb: 1 }}
          name="title"
          value={title}
          onChange={changeValueInput}
        />

        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="¿Qué sucedió en el día de hoy?"
          minRows={5}
          name="body"
          value={body}
          onChange={changeValueInput}
        />

        <ImageGallery />
      </Grid>
    </Grid>
  );
};
