import React, { useState, useEffect } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

interface NoteFormProps {
  open: boolean;
  handleClose: () => void;
  handleSubmit: (note: any) => void;
  initialData?: any;
}

const NoteForm: React.FC<NoteFormProps> = ({ open, handleClose, handleSubmit, initialData }) => {
  const [note, setNote] = useState(initialData || { title: '', content: '' });

  useEffect(() => {
    if (initialData) {
      setNote(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNote({ ...note, [name]: value });
  };

  const onSubmit = () => {
    handleSubmit(note);
    handleClose();
  };

  return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{initialData ? 'Editar Nota' : 'Adicionar Nota'}</DialogTitle>
        <DialogContent>
          <TextField
              autoFocus
              margin="dense"
              name="title"
              label="Título"
              type="text"
              fullWidth
              value={note.title}
              onChange={handleChange}
          />
          <TextField
              margin="dense"
              name="content"
              label="Conteúdo"
              type="text"
              fullWidth
              multiline
              rows={4}
              value={note.content}
              onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={onSubmit}>{initialData ? 'Salvar' : 'Adicionar'}</Button>
        </DialogActions>
      </Dialog>
  );
};

export default NoteForm;
