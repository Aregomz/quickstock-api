const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./config/db'); 

const app = express();
app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const productRoutes = require('./routes/productRoutes');
app.use('/api', productRoutes);

app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente 🟢');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});


