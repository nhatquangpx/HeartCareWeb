const db = require('../../models/index');
require('dotenv').config();
const _ = require('lodash');

let createClinic = async (data) => {
    try {
        if (!data.TenDichVu || !data.IDKhoa || !data.GiaKham) {
            return {
                errCode: 1,
                message: 'Missing required parameters!',
            };
        } else {
            await db.DichVu.create({
                TenDichVu: data.TenDichVu,
                IDKhoa: data.IDKhoa,
                GiaKham: data.GiaKham
            });

            return {
                errCode: 0,
                message: 'OK',
            };
        }
    } catch (error) {
        console.error('Failed to create DichVu:', error); // Log error details to console
        return {
            errCode: -1,
            message: 'Error from server...',
        };
    }
};

let getAllClinic = async () => {
    try {
        let data = await db.DichVu.findAll();
        return {
            errCode: 0,
            message: 'OK',
            data: data
        };
    } catch (error) {
        console.error('Failed to retrieve DichVu:', error); // Log error details to console
        return {
            errCode: -1,
            message: 'Error from server...',
        };
    }
};

let getDetailClinicById = async (inputId) => {
    try {
        if (!inputId) {
            return {
                errCode: 1,
                message: 'Missing required parameters!',
            };
        } else {
            let data = await db.DichVu.findOne({
                where: {
                    IDDichVu: inputId
                },
            });

            if (data) {
                let relatedLichDat = await db.LichDat.findAll({
                    where: { IDDichVu: inputId },
                    attributes: ['IDCa', 'ThuDatLich']
                });

                data.relatedLichDat = relatedLichDat;
            } else {
                data = {};
            }

            return {
                errCode: 0,
                message: 'OK',
                data: data
            };
        }
    } catch (error) {
        console.error('Failed to retrieve DichVu details:', error); // Log error details to console
        return {
            errCode: -1,
            message: 'Error from server...',
        };
    }
};

let deleteClinicById = async (inputId) => {
    try {
        if (!inputId) {
            return {
                errCode: 1,
                message: 'Missing required parameters!',
            };
        } else {
            await db.DichVu.destroy({
                where: {
                    IDDichVu: inputId
                },
            });

            return {
                errCode: 0,
                message: 'Delete DichVu successfully!',
            };
        }
    } catch (error) {
        console.error('Failed to delete DichVu:', error); // Log error details to console
        return {
            errCode: -1,
            message: 'Error from server...',
        };
    }
};

let updateClinicByIdService = async (inputId, data) => {
    try {
        if (!inputId || !data.TenDichVu || !data.IDKhoa || !data.GiaKham) {
            return {
                errCode: 1,
                message: 'Missing required parameters!'
            };
        } else {
            let dichVu = await db.DichVu.findOne({
                where: {
                    IDDichVu: inputId
                },
                raw: false
            });

            if (dichVu) {
                dichVu.TenDichVu = data.TenDichVu;
                dichVu.IDKhoa = data.IDKhoa;
                dichVu.GiaKham = data.GiaKham;

                await dichVu.save();
                return {
                    errCode: 0,
                    message: 'DichVu updated successfully',
                    data: dichVu
                };
            } else {
                return {
                    errCode: 1,
                    message: 'DichVu not found'
                };
            }
        }
    } catch (error) {
        console.error('Failed to update DichVu:', error); // Log error details to console
        return { errCode: -1, message: 'Error from server...' };
    }
};

module.exports = {
    createClinic,
    getDetailClinicById,
    getAllClinic,
    deleteClinicById,
    updateClinicByIdService
};
