import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // Substitua pelo URL da API
});

export const getData = async () => {
  try {
    const response = await api.get('/notes');
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados", error);
    throw error;
  }
};

export const addNote = async (note: any) => {
  try {
    const response = await api.post('/notes', note);
    return response.data;
  } catch (error) {
    console.error("Erro ao adicionar nota", error);
    throw error;
  }
};

export const updateNote = async (id: string, note: any) => {
  try {
    const response = await api.put(`/notes/${id}`, note);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar nota", error);
    throw error;
  }
};

export const deleteNote = async (id: string) => {
  try {
    await api.delete(`/notes/${id}`);
  } catch (error) {
    console.error("Erro ao deletar nota", error);
    throw error;
  }
};
