const { Dosen, Mahasiswa, MahasiswaBimbingan } = require('../models');

const mahasiswaBimbinganController = {};

/*
    this is auto generate example, you can continue 

*/
mahasiswaBimbinganController.index = async (req, res) => {
    res.json({
        message: 'Hello mahasiswaBimbinganController',
    });
};

mahasiswaBimbinganController.create = async (req, res) => {
    const { idMahasiswa, idDosen } = req.body;

    try {
        const getDosen = await Dosen.findOne({
            where: {
                id: idDosen,
            },
        });

        const getMahasiswa = await Mahasiswa.findOne({
            where: {
                id: idMahasiswa,
            },
        });

        if (
            getMahasiswa === null ||
            !getMahasiswa ||
            getDosen === null ||
            !getDosen
        ) {
            throw new Error('Data tidak ditemukan !');
        } else {
            const createMahasiswaBimbingan = await MahasiswaBimbingan.create({
                id_mahasiswa: idMahasiswa,
                id_dosen: idDosen,
            });

            return res.status(201).json({
                message: 'Success create DosenMatkul',
                data: createMahasiswaBimbingan,
            });
        }
    } catch (err) {
        return res.status(404).json({
            message: err.message,
        });
    }
};

mahasiswaBimbinganController.getAll = async (req, res) => {
    try {
        const getMahasiswaBimbingan = await Mahasiswa.findAll({
            include: [
                {
                    model: Dosen,
                    as: 'dosenBimbingan',
                    through: {
                        model: MahasiswaBimbingan,
                        as: 'bimbingan',
                    },
                },
            ],
        });

        return res.status(200).json({
            data: getMahasiswaBimbingan,
        });
    } catch (err) {
        return res.status(500).json({
            message: err,
        });
    }
};

mahasiswaBimbinganController.getById = async (req, res) => {
    const { id } = req.params;

    try {
        const getDetailMahasiswaBimbingan = await Mahasiswa.findOne({
            where: {
                id,
            },
            include: [
                {
                    model: Dosen,
                    as: 'dosenBimbingan',
                    through: {
                        model: MahasiswaBimbingan,
                        as: 'bimbingan',
                    },
                },
            ],
        });

        return res.status(200).json({
            data: getDetailMahasiswaBimbingan,
        });
    } catch (err) {
        return res.status(500).json({
            message: err,
        });
    }
};

mahasiswaBimbinganController.update = async (req, res) => {
    const { idDosen, idMahasiswa } = req.body;
    const { id } = req.params;

    try {
        const getDosen = await Dosen.findOne({
            where: {
                id: idDosen,
            },
        });

        const getMahasiswa = await Mahasiswa.findOne({
            where: {
                id: idMahasiswa,
            },
        });

        if (
            getMahasiswa === null ||
            !getMahasiswa ||
            getDosen === null ||
            !getDosen
        ) {
            throw new Error('Data tidak ditemukan !');
        } else {
            await MahasiswaBimbingan.update(
                {
                    id_dosen: idDosen,
                    id_mahasiswa: idMahasiswa,
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
        }
    } catch (err) {
        return res.status(400).json({
            message: err.message,
        });
    }
};

mahasiswaBimbinganController.delete = async (req, res) => {
    const { id } = req.params;

    try {
        const getDetailMahasiswaBimbingan = await MahasiswaBimbingan.findOne({
            where: {
                id,
            },
        });

        if (
            getDetailMahasiswaBimbingan === null ||
            !getDetailMahasiswaBimbingan
        ) {
            return res.status(404).json({
                message: 'Data tidak ada !',
            });
        }

        await MahasiswaBimbingan.destroy({
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

module.exports = mahasiswaBimbinganController;
