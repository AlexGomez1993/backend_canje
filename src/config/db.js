// src/config/db.js - Configuración de la base de datos
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '12345',
    database: process.env.DB_NAME || 'scalacanjes_canjes'
});

module.exports = connection;