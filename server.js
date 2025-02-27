require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./src/routes/authRoutes');
//const userRoutes = require('./src/routes/userRoutes');
//const roleRoutes = require('./src/routes/roleRoutes');
const db = require('./src/config/db');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use('/auth', authRoutes);
//app.use('/usuarios', userRoutes);
//app.use('/roles', roleRoutes);

// Conectar a la base de datos
db.connect(err => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        process.exit(1);
    }
    console.log('Base de datos conectada');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});

