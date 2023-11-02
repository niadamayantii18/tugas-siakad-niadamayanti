const { MataKuliah, DosenMatkul, JadwalMatkul } = require('../models');

const jadwalController = {};

/*
    this is auto generate example, you can continue 

*/
jadwalController.index = async (req, res) => {
    res.json({
        message: 'Hello jadwalController',
    });
};

jadwalController.create = async (req, res) => {
    const { idMatkul, hari, jam } = req.body;

    try {
        const getMatkul = await MataKuliah.findOne({
            where: {
                id: idMatkul,
            },
        });

        if (getMatkul === null || !getMatkul) {
            throw new Error('Data tidak ditemukan !');
        } else {
            const createJadwalMatkul = await JadwalMatkul.create({
                id_matkul: idMatkul,
                hari,
                jam,
            });

            return res.status(201).json({
                message: 'Success create JadwalMatkul',
                data: createJadwalMatkul,
            });
        }
    } catch (err) {
        return res.status(404).json({
            message: err.message,
        });
    }
};

jadwalController.getAll = async (req, res) => {
    try {
        const getJadwalMatkul = await MataKuliah.findAll({
            include: [
                {
                    model: JadwalMatkul,
                    as: 'jadwal',
                },
            ],
        });

        return res.status(200).json({
            data: getJadwalMatkul,
        });
    } catch (err) {
        return res.status(500).json({
            message: err,
        });
    }
};

jadwalController.getById = async (req, res) => {
    const { id } = req.params;

    try {
        const getDetailJadwalMatkul = await MataKuliah.findOne({
            where: {
                id,
            },
            include: [
                {
                    model: JadwalMatkul,
                    as: 'jadwal',
                },
            ],
        });

        return res.status(200).json({
            data: getDetailJadwalMatkul,
        });
    } catch (err) {
        return res.status(500).json({
            message: err,
        });
    }
};

jadwalController.update = async (req, res) => {
    const { idMatkul, hari, jam } = req.body;
    const { id } = req.params;

    try {
        const getMatkul = await MataKuliah.findOne({
            where: {
                id: idMatkul,
            },
        });

        if (getMatkul === null || !getMatkul) {
            throw new Error('Data tidak ditemukan !');
        } else {
            const getJadwalMatkul = await JadwalMatkul.findOne({
                where: {
                    id,
                },
            });

            if (getJadwalMatkul === null || !getJadwalMatkul) {
                throw new Error('Data tidak ditemukan !');
            }

            await JadwalMatkul.update(
                {
                    id_matkul: idMatkul,
                    hari,
                    jam,
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

jadwalController.delete = async (req, res) => {
    const { id } = req.params;

    try {
        const getJadwalMatkul = await JadwalMatkul.findOne({
            where: {
                id,
            },
        });

        if (getJadwalMatkul === null || !getJadwalMatkul) {
            return res.status(404).json({
                message: 'Data tidak ada !',
            });
        }

        await JadwalMatkul.destroy({
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

module.exports = jadwalController;
