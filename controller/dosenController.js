const { Dosen } = require('../models');

const dosenController = {};

/*
    this is auto generate example, you can continue 

*/
dosenController.index = async (req, res) => {
    res.json({
        message: 'Hello dosenController',
    });
};

dosenController.create = async (req, res) => {
    const { nama, nidn, alamat } = req.body;

    try {
        const createDosen = await Dosen.create({
            nama,
            nidn,
            alamat,
        });

        return res.status(201).json({
            message: 'Success create Dosen',
            data: createDosen,
        });
    } catch (err) {
        return res.status(500).json({
            message: err,
        });
    }
};

dosenController.getAll = async (req, res) => {
    try {
        const getDosen = await Dosen.findAll();

        return res.status(200).json({
            data: getDosen,
        });
    } catch (err) {
        return res.status(500).json({
            message: err,
        });
    }
};

dosenController.getById = async (req, res) => {
    const { id } = req.params;

    try {
        const getDetailDosen = await Dosen.findOne({
            where: {
                id,
            },
        });

        return res.status(200).json({
            data: getDetailDosen,
        });
    } catch (err) {
        return res.status(500).json({
            message: err,
        });
    }
};

dosenController.update = async (req, res) => {
    const { nama, nidn, alamat } = req.body;
    const { id } = req.params;

    try {
        const getDetailDosen = await Dosen.findOne({
            where: {
                id,
            },
        });

        if (getDetailDosen === null || !getDetailDosen) {
            return res.status(404).json({
                message: 'Data tidak ada !',
            });
        }

        await Dosen.update(
            {
                nama,
                nidn,
                alamat,
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

dosenController.delete = async (req, res) => {
    const { id } = req.params;

    try {
        const getDetailDosen = await Dosen.findOne({
            where: {
                id,
            },
        });

        if (getDetailDosen === null || !getDetailDosen) {
            return res.status(404).json({
                message: 'Data tidak ada !',
            });
        }

        await Dosen.destroy({
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

module.exports = dosenController;
