import React, { useEffect, useState } from 'react';
import { getData, addNote, updateNote, deleteNote } from '../api';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import { Delete, Edit, Add } from '@mui/icons-material';
import NoteForm from './NoteForm';

const DataTable: React.FC = () => {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState<any>(null);

  const fetchData = async () => {
    const data = await getData();
    setRows(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = () => {
    setCurrentNote(null);
    setOpen(true);
  };

  const handleEdit = (note: any) => {
    setCurrentNote(note);
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    await deleteNote(id);
    fetchData();
  };

  const handleSubmit = async (note: any) => {
    if (currentNote) {
      await updateNote(currentNote._id, note);
    } else {
      await addNote(note);
    }
    fetchData();
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90, valueGetter: (params) => params.row._id },
    { field: 'title', headerName: 'Título', width: 150 },
    { field: 'content', headerName: 'Conteúdo', width: 250 },
    {
      field: 'actions',
      headerName: 'Ações',
      width: 150,
      renderCell: (params) => (
          <>
            <IconButton onClick={() => handleEdit(params.row)}>
              <Edit />
            </IconButton>
            <IconButton onClick={() => handleDelete(params.row._id)}>
              <Delete />
            </IconButton>
          </>
      ),
    },
  ];

  return (
      <div style={{ height: 400, width: '100%' }}>
        <IconButton color="primary" onClick={handleAdd}>
          <Add />
        </IconButton>
        <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            getRowId={(row) => row._id}
        />
        <NoteForm
            open={open}
            handleClose={() => setOpen(false)}
            handleSubmit={handleSubmit}
            initialData={currentNote}
        />
      </div>
  );
};

export default DataTable;
