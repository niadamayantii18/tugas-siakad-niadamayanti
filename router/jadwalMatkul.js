const express = require('express');
const jadwalController = require('../controller/jadwalController');
const routeJadwalMatkul = express.Router();

routeJadwalMatkul.post('/', jadwalController.create);
routeJadwalMatkul.get('/get', jadwalController.getAll);
routeJadwalMatkul.get('/get/:id', jadwalController.getById);
routeJadwalMatkul.put('/update/:id', jadwalController.update);
routeJadwalMatkul.delete('/delete/:id', jadwalController.delete);

module.exports = routeJadwalMatkul;
