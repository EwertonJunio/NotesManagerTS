const express = require('express');
const mongoose = require('mongoose');
const notesRouter = require('./routes/notes');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use('/notes', notesRouter);

mongoose.connect('mongodb://root:example@localhost:27017/notasdb?authSource=admin', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});

mongoose.connection.once('open', () => {
  console.log('Conectado ao banco de dados MongoDB');
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
});
