const express = require('express');
const mahasiswaBimbinganController = require('../controller/mahasiswaBimbinganController');
const routeMahasiswaBimbingan = express.Router();

routeMahasiswaBimbingan.post('/', mahasiswaBimbinganController.create);
routeMahasiswaBimbingan.get('/get', mahasiswaBimbinganController.getAll);
routeMahasiswaBimbingan.get('/get/:id', mahasiswaBimbinganController.getById);
routeMahasiswaBimbingan.put('/update/:id', mahasiswaBimbinganController.update);
routeMahasiswaBimbingan.delete(
    '/delete/:id',
    mahasiswaBimbinganController.delete
);

module.exports = routeMahasiswaBimbingan;
