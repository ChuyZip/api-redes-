const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// "Base de datos" en memoria
let chuycitos = [];
let nextId = 1;

// GET / - lista todos los chuycitos
app.get('/', (req, res) => {
  return res.status(200).json(chuycitos);
});

// GET /:id - obtiene un chuy por id
app.get('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const chuy = chuycitos.find((c) => c.id === id);

  if (!chuy) {
    return res.status(404).json({ message: 'Chuy no encontrado' });
  }

  return res.status(200).json(chuy);
});

// POST / - crea un nuevo chuy
app.post('/', (req, res) => {
  const { name, city } = req.body;

  if (!name || !city) {
    return res.status(400).json({ message: 'name y city son requeridos' });
  }

  const newChuy = {
    id: nextId++,
    name,
    city
  };

  chuycitos.push(newChuy);
  return res.status(201).json(newChuy);
});

// PUT /:id - actualiza un chuy existente
app.put('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { name, city } = req.body;

  const index = chuycitos.findIndex((c) => c.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Chuy no encontrado' });
  }

  if (!name || !city) {
    return res.status(400).json({ message: 'name y city son requeridos' });
  }

  chuycitos[index] = { id, name, city };
  return res.status(200).json(chuycitos[index]);
});

// DELETE /:id - elimina un chuy
app.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = chuycitos.findIndex((c) => c.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Chuy no encontrado' });
  }

  const deleted = chuycitos.splice(index, 1)[0];
  return res.status(200).json(deleted);
});

// Manejador de errores genérico (500)
app.use((err, req, res, next) => {
  console.error('Error interno:', err);
  return res.status(500).json({ message: 'Error interno del servidor' });
});

app.listen(PORT, () => {
  console.log(`API HTTP escuchando en http://localhost:${PORT}`);
});
