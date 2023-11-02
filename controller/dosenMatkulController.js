const { DosenMatkul, Dosen, MataKuliah } = require('../models');

const dosenMatkulController = {};

/*
    this is auto generate example, you can continue 

*/
dosenMatkulController.index = async (req, res) => {
    res.json({
        message: 'Hello dosenMatkulController',
    });
};

dosenMatkulController.create = async (req, res) => {
    const { idDosen, idMatkul } = req.body;

    try {
        const getDosen = await Dosen.findOne({
            where: {
                id: idDosen,
            },
        });

        const getMatkul = await MataKuliah.findOne({
            where: {
                id: idMatkul,
            },
        });

        if (
            getMatkul === null ||
            !getMatkul ||
            getDosen === null ||
            !getDosen
        ) {
            throw new Error('Data tidak ditemukan !');
        } else {
            const createDosenMatkul = await DosenMatkul.create({
                id_dosen: idDosen,
                id_matkul: idMatkul,
            });

            return res.status(201).json({
                message: 'Success create DosenMatkul',
                data: createDosenMatkul,
            });
        }
    } catch (err) {
        return res.status(404).json({
            message: err.message,
        });
    }
};

dosenMatkulController.getAll = async (req, res) => {
    try {
        const getDosenMatkul = await Dosen.findAll({
            include: [
                {
                    model: MataKuliah,
                    as: 'matkul',
                    through: {
                        model: DosenMatkul,
                        as: 'dosenMatkul',
                    },
                },
            ],
        });

        return res.status(200).json({
            data: getDosenMatkul,
        });
    } catch (err) {
        return res.status(500).json({
            message: err,
        });
    }
};

dosenMatkulController.getById = async (req, res) => {
    const { id } = req.params;

    try {
        const getDetailDosenMatkul = await Dosen.findOne({
            where: {
                id,
            },
            include: [
                {
                    model: MataKuliah,
                    as: 'matkul',
                    through: {
                        model: DosenMatkul,
                        as: 'dosenMatkul',
                    },
                },
            ],
        });

        return res.status(200).json({
            data: getDetailDosenMatkul,
        });
    } catch (err) {
        return res.status(500).json({
            message: err,
        });
    }
};

dosenMatkulController.update = async (req, res) => {
    const { idDosen, idMatkul } = req.body;
    const { id } = req.params;

    try {
        const getDosen = await Dosen.findOne({
            where: {
                id: idDosen,
            },
        });

        const getMatkul = await MataKuliah.findOne({
            where: {
                id: idMatkul,
            },
        });

        if (
            getMatkul === null ||
            !getMatkul ||
            getDosen === null ||
            !getDosen
        ) {
            throw new Error('Data tidak ditemukan !');
        } else {
            await DosenMatkul.update(
                {
                    id_dosen: idDosen,
                    id_matkul: idMatkul,
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

dosenMatkulController.delete = async (req, res) => {
    const { id } = req.params;

    try {
        const getDetailDosenMatkul = await DosenMatkul.findOne({
            where: {
                id,
            },
        });

        if (getDetailDosenMatkul === null || !getDetailDosenMatkul) {
            return res.status(404).json({
                message: 'Data tidak ada !',
            });
        }

        await DosenMatkul.destroy({
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

module.exports = dosenMatkulController;
