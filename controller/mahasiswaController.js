const { Mahasiswa } = require('../models');

const mahasiswaController = {};

/*
    this is auto generate example, you can continue 

*/
mahasiswaController.index = async (req, res) => {
    res.json({
        message: 'Hello mahasiswaController',
    });
};

mahasiswaController.create = async (req, res) => {
    const { nama, nim, alamat } = req.body;

    try {
        const createMahasiswa = await Mahasiswa.create({
            nama,
            nim,
            alamat,
        });

        return res.status(201).json({
            message: 'Success create mahasiswa',
            data: createMahasiswa,
        });
    } catch (err) {
        return res.status(500).json({
            message: err,
        });
    }
};

mahasiswaController.getAll = async (req, res) => {
    try {
        const getMahasiswa = await Mahasiswa.findAll();

        return res.status(200).json({
            data: getMahasiswa,
        });
    } catch (err) {
        return res.status(500).json({
            message: err,
        });
    }
};

mahasiswaController.getById = async (req, res) => {
    const { id } = req.params;

    try {
        const getDetailMahasiswa = await Mahasiswa.findOne({
            where: {
                id,
            },
        });

        return res.status(200).json({
            data: getDetailMahasiswa,
        });
    } catch (err) {
        return res.status(500).json({
            message: err,
        });
    }
};

mahasiswaController.update = async (req, res) => {
    const { nama, nim, alamat } = req.body;
    const { id } = req.params;

    try {
        const getDetailMahasiswa = await Mahasiswa.findOne({
            where: {
                id,
            },
        });

        if (getDetailMahasiswa === null || !getDetailMahasiswa) {
            return res.status(404).json({
                message: 'Data tidak ada !',
            });
        }

        await Mahasiswa.update(
            {
                nama,
                nim,
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

mahasiswaController.delete = async (req, res) => {
    const { id } = req.params;

    try {
        const getDetailMahasiswa = await Mahasiswa.findOne({
            where: {
                id,
            },
        });

        if (getDetailMahasiswa === null || !getDetailMahasiswa) {
            return res.status(404).json({
                message: 'Data tidak ada !',
            });
        }

        await Mahasiswa.destroy({
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

module.exports = mahasiswaController;
