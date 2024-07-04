const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

app.use(bodyParser.json());

let db = new sqlite3.Database(':memory:', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
});

db.serialize(() => {
    db.run(`CREATE TABLE jcj_tblvehiculo (
        idvehiculo INTEGER PRIMARY KEY AUTOINCREMENT,
        placa VARCHAR(50) NOT NULL,
        marca VARCHAR(50) NOT NULL,
        modelo VARCHAR(50) NOT NULL,
        color VARCHAR(30) NOT NULL,
        propietario VARCHAR(100) NOT NULL,
        fecharegistro DATETIME DEFAULT CURRENT_TIMESTAMP,
        estadoregistro BIT DEFAULT 1
    )`);
});

// Crear nuevo vehículo
app.post('/api/vehiculos', (req, res) => {
    const { placa, marca, modelo, color, propietario } = req.body;
    const sql = 'INSERT INTO jcj_tblvehiculo (placa, marca, modelo, color, propietario) VALUES (?, ?, ?, ?, ?)';
    db.run(sql, [placa, marca, modelo, color, propietario], function(err) {
        if (err) {
            return res.status(400).json({ "error": err.message });
        }
        res.json({
            "id": this.lastID,
            "placa": placa,
            "marca": marca,
            "modelo": modelo,
            "color": color,
            "propietario": propietario,
            "fecharegistro": new Date(),
            "estadoregistro": 1
        });
    });
});

// Obtener todos los vehículos
app.get('/api/vehiculos', (req, res) => {
    const sql = 'SELECT * FROM jcj_tblvehiculo';
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(400).json({ "error": err.message });
        }
        res.json(rows);
    });
});

// Obtener un vehículo por ID
app.get('/api/vehiculos/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM jcj_tblvehiculo WHERE idvehiculo = ?';
    db.get(sql, [id], (err, row) => {
        if (err) {
            return res.status(400).json({ "error": err.message });
        }
        res.json(row);
    });
});

// Actualizar un vehículo
app.put('/api/vehiculos/:id', (req, res) => {
    const { id } = req.params;
    const { placa, marca, modelo, color, propietario, estadoregistro } = req.body;
    const sql = `UPDATE jcj_tblvehiculo 
                 SET placa = ?, marca = ?, modelo = ?, color = ?, propietario = ?, estadoregistro = ? 
                 WHERE idvehiculo = ?`;
    db.run(sql, [placa, marca, modelo, color, propietario, estadoregistro, id], function(err) {
        if (err) {
            return res.status(400).json({ "error": err.message });
        }
        res.json({ updatedID: id });
    });
});

// Eliminar un vehículo
app.delete('/api/vehiculos/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM jcj_tblvehiculo WHERE idvehiculo = ?';
    db.run(sql, id, function(err) {
        if (err) {
            return res.status(400).json({ "error": err.message });
        }
        res.json({ deletedID: id });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
