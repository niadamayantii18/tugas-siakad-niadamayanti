const { MataKuliah } = require('../models');

const matkulController = {};

/*
    this is auto generate example, you can continue 

*/
matkulController.index = async (req, res) => {
    res.json({
        message: 'Hello matkulController',
    });
};

matkulController.create = async (req, res) => {
    const { kodeMatkul, nama, sks } = req.body;

    try {
        const createMatkul = await MataKuliah.create({
            kode_matkul: kodeMatkul,
            nama,
            sks,
        });

        return res.status(201).json({
            message: 'Success create Matkul',
            data: createMatkul,
        });
    } catch (err) {
        return res.status(500).json({
            message: err,
        });
    }
};

matkulController.getAll = async (req, res) => {
    try {
        const getMatkul = await MataKuliah.findAll();

        return res.status(200).json({
            data: getMatkul,
        });
    } catch (err) {
        return res.status(500).json({
            message: err,
        });
    }
};

matkulController.getById = async (req, res) => {
    const { id } = req.params;

    try {
        const getDetailMatkul = await MataKuliah.findOne({
            where: {
                id,
            },
        });

        return res.status(200).json({
            data: getDetailMatkul,
        });
    } catch (err) {
        return res.status(500).json({
            message: err,
        });
    }
};

matkulController.update = async (req, res) => {
    const { kodeMatkul, nama, sks } = req.body;
    const { id } = req.params;

    try {
        const getDetailMatkul = await MataKuliah.findOne({
            where: {
                id,
            },
        });

        if (getDetailMatkul === null || !getDetailMatkul) {
            return res.status(404).json({
                message: 'Data tidak ada !',
            });
        }

        await MataKuliah.update(
            {
                kode_matkul: kodeMatkul,
                nama,
                sks,
            },
            {
                where: {
                    id,
                },
            }
        );

        return res.status(200).json({
            message: 'Data berhasil diubah !',
        });
    } catch (err) {
        return res.status(500).json({
            message: err,
        });
    }
};

matkulController.delete = async (req, res) => {
    const { id } = req.params;

    try {
        const getDetailMatkul = await MataKuliah.findOne({
            where: {
                id,
            },
        });

        if (getDetailMatkul === null || !getDetailMatkul) {
            return res.status(404).json({
                message: 'Data tidak ada !',
            });
        }

        await MataKuliah.destroy({
            where: {
                id,
            },
        });

        return res.status(200).json({
            message: 'Data berhasil dihapus !',
        });
    } catch (err) {
        return res.status(500).json({
            message: err,
        });
    }
};

module.exports = matkulController;
