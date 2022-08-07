import React, { ChangeEvent, useEffect, useMemo, useRef } from "react";
import { Grid, Typography, Button, TextField, IconButton } from "@mui/material";
import {
  DeleteOutline,
  SaveOutlined,
  UploadFileOutlined,
} from "@mui/icons-material";
import { ImageGallery } from "../components";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import { useForm } from "../../hooks";
import {
  Note,
  setActiveNote,
  startDeletingNote,
  startSaveNote,
  startUploadFiles,
} from "../../store/journal";
import Swal from "sweetalert2";

export const NoteView: React.FC = () => {
  const {
    active: note,
    isSaving,
    messageSaved,
  } = useSelector((state: RootState) => state.journal);
  const dispatch = useAppDispatch();

  const { stateForm, changeValueInput } = useForm<Note>(note!);
  const { title, body } = stateForm;

  const inputUploadRef = useRef<HTMLInputElement>(null);

  const newDate = useMemo(() => {
    let date: Date;

    if (note && note.date) {
      date = new Date(note.date);
    } else {
      date = new Date();
    }

    return date.toUTCString();
  }, [note?.date]);

  useEffect(() => {
    if (note !== stateForm) {
      dispatch(setActiveNote(stateForm));
    }
  }, [stateForm]);

  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire("Guardado!", messageSaved, "success");
    }
  }, [messageSaved]);

  const onSaveNote = () => {
    dispatch(startSaveNote());
  };

  const onChangeInputFile = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (target.files && target.files?.length > 0) {
      dispatch(startUploadFiles(target.files));
    }
  };

  const onDelete = () => {
    dispatch(startDeletingNote());
  };

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
        <input
          type="file"
          multiple
          ref={inputUploadRef}
          onChange={onChangeInputFile}
          style={{ display: "none" }}
          accept="image/gif, image/jpeg, image/png"
        />

        <IconButton
          color="primary"
          disabled={isSaving}
          onClick={() => inputUploadRef.current?.click()}
        >
          <UploadFileOutlined />
        </IconButton>

        <Button
          color="primary"
          sx={{ padding: 2 }}
          onClick={onSaveNote}
          disabled={isSaving}
        >
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

        <Grid container justifyContent="end">
          <Button onClick={onDelete} color="error" sx={{ mt: 2 }}>
            <DeleteOutline />
            Borrar
          </Button>
        </Grid>

        <ImageGallery images={note?.imageUrls || []} />
      </Grid>
    </Grid>
  );
};
