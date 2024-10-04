const db = require('../../models/index');
require('dotenv').config();
const _ = require('lodash');
const emailService = require('../services/emailService');

const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;

let getTopDoctorHome = async (limit) => {
    try {
        let doctors = await db.BacSi.findAll({
            limit: limit,
            order: [['IDBacSi', 'DESC']],
            attributes: {
                exclude: ['password']
            },
            include: [
                // { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] },
                {
                    model: db.BacsiKhoa,
                    as: 'bacsi_khoa',
                    include: [
                        { model: db.Khoa,as:'khoa', attributes: ['IDKhoa', 'TenKhoa'] },
                    ]
                },
            ],
            raw: true,
            nest: true,
        });
        return doctors;
    } catch (error) {
        console.log('Error:', error);
        throw error;
    }
};

const getAllDoctors = async () => {
    try {
        const doctors = await db.BacSi.findAll({
            order: [['IDBacSi', 'DESC']],
            attributes: {
                exclude: ['password', 'image']
            },
            include: [
                { 
                    model: db.Allcode, 
                    as: 'genderData', 
                    attributes: ['valueEn', 'valueVi'] 
                },
                {
                    model: db.BacsiKhoa,
                    as: 'bacsi_khoa',
                    include: [
                        { model: db.Khoa, as: 'khoa', attributes: ['TenKhoa'] }
                    ],
                    attributes: ['ChucVu']
                }
            ],
            raw: true,
            nest: true,
        });
        return doctors;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};



let getAllDoctorInfor = async () => {
    try {
        let doctors = await db.MarkDown.findAll();
        return doctors;
    } catch (error) {
        console.log('Error:', error);
        throw error;
    }
};

const requiredFields = [
    'doctorId',
    'contentHTML',
    'contentMarkDown',
    'action',
    'selectedPrice',
    'selectedPayment',
    'selectedProvince',
    'nameClinic',
    'addressClinic',
    'note',
    'clinicId',
    'specialtyId',
];

let saveInfoDoctor = async (inputData) => {
    if (!inputData) {
        return {
            errCode: 1,
            message: 'Missing parameter!',
        };
    }

    for (const field of requiredFields) {
        if (!inputData[field]) {
            return {
                errCode: 1,
                message: 'Missing parameter: ' + field,
            };
        }
    }

    try {
        // Upsert to markdown
        if (inputData.action === 'CREATE') {
            await db.MarkDown.create({
                contentHTML: inputData.contentHTML,
                contentMarkDown: inputData.contentMarkDown,
                description: inputData.description,
                IDBacSi: inputData.doctorId
            });
        } else if (inputData.action === 'EDIT') {
            let doctorMarkDown = await db.MarkDown.findOne({
                where: { IDBacSi: inputData.doctorId },
                raw: false
            });
            if (doctorMarkDown) {
                doctorMarkDown.contentHTML = inputData.contentHTML;
                doctorMarkDown.contentMarkDown = inputData.contentMarkDown;
                doctorMarkDown.description = inputData.description;
                await doctorMarkDown.save();
            }
        }

        // Upsert to doctor_infor table
        let doctorInfor = await db.BacsiKhoa.findOne({
            where: { IDBacSi: inputData.doctorId },
            raw: false,
        });
        if (doctorInfor) {
            doctorInfor.IDBacSi = inputData.doctorId;
            doctorInfor.IDKhoa = inputData.specialtyId;
            doctorInfor.ChucVu = inputData.note;
            await doctorInfor.save();
        } else {
            await db.BacsiKhoa.create({
                IDBacSi: inputData.doctorId,
                IDKhoa: inputData.specialtyId,
                ChucVu: inputData.note,
            });
        }
        return {
            errCode: 0,
            message: 'Save info doctor successfully!',
        };

    } catch (error) {
        return {
            errCode: -1,
            message: 'Error from server...',
        };
    }
};

let getDetailDoctorById = async (id) => {
    try {
        if (!id) {
            return {
                errCode: 1,
                message: 'Missing parameter!',
            };
        } else {
            let data = await db.BacSi.findOne({
                where: {
                    IDBacSi: id,
                },
                attributes: {
                    exclude: ['password']
                },
                include: [
                    {
                        model: db.MarkDown,
                        attributes: ['description', 'contentHTML', 'contentMarkDown']
                    },
                    {
                        model: db.BacsiKhoa,
                        as:'bacsi_khoa',
                        attributes: {
                            exclude: ['IDBacSi', 'IDKhoa']
                        },
                        include: [
                            { model: db.Khoa,as:'khoa', attributes: ['IDKhoa', 'TenKhoa'] },
                        ]
                    },
                    { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] },
                ],
                raw: false,
                nest: true,
            });

            if (data && data.image) {
                data.image = new Buffer.from(data.image, 'base64').toString('binary');
            }
            if (!data) data = {};

            return {
                errCode: 0,
                message: 'OK',
                data: data
            };
        }
    } catch (error) {
        return {
            errCode: -1,
            message: 'Error from server...',
        };
    }
};

let bulkCreateSchedule = async (data) => {
    try {
        if (!data.arrSchedule || !data.doctorId || !data.formatedDate) {
            return {
                errCode: 1,
                message: 'Missing required parameters!',
            };
        }

        let schedule = data.arrSchedule.map(item => {
            return { ...item, maxNumber: MAX_NUMBER_SCHEDULE };
        });

        let existingSchedules = await db.LichLamViec.findAll({
            where: { IDBacSi: data.doctorId, Thu: data.formatedDate },
            attributes: ['IDCa', 'Thu', 'IDBacSi'],
            raw: true
        });

        let newSchedules = schedule.filter(s => 
            !existingSchedules.some(e => e.IDCa === s.IDCa && e.Thu === s.Thu)
        );

        if (newSchedules.length > 0) {
            await db.LichLamViec.bulkCreate(newSchedules);
        }

        return {
            errCode: 0,
            message: 'OK',
            data
        };
    } catch (error) {
        console.error(error);
        return {
            errCode: -1,
            message: 'Error from server...',
        };
    }
};

let getScheduleByDateService = async (doctorId, date) => {
    try {
        if (!doctorId || !date) {
            return {
                errCode: 1,
                message: 'Missing required parameters!',
            };
        }

        // Convert date to integer if necessary
        const dateInteger = parseInt(date);

        // Query with Sequelize
        let dataSchedule = await db.LichLamViec.findAll({
            where: { IDBacSi: doctorId, Thu: dateInteger },
            include: [
                { model: db.CaKham, as: 'cakham', attributes: ['IDCa', 'KhungGio'] },
                { 
                    model: db.BacSi,
                    as: 'bacsi',
                    attributes: ['hoten', 'HocVan'],
                    include: [
                        { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] }
                    ]
                },
            ],
            raw: false, // Ensure you get Sequelize instances instead of plain objects
            nest: true // Nesting options for including associations
        });

        // Return data in a consistent format
        return {
            errCode: 0,
            message: 'OK',
            data: dataSchedule || []
        };
    } catch (error) {
        console.error('Error in getScheduleByDateService:', error);
        return {
            errCode: -1,
            message: 'Error from server...',
        };
    }
};



let getExtraInforDoctorById = async (id) => {
    try {
        if (!id) {
            return {
                errCode: 1,
                message: 'Missing required parameters!',
            };
        }

        let data = await db.BacSi.findOne({
            where: { IDBacSi: id },
            attributes: { exclude: ['IDBacSi', 'password'] },
            include: [
                { model: db.Khoa,as:'khoa', attributes: ['IDKhoa', 'TenKhoa'] },
            ],
            raw: false,
            nest: true
        });

        return {
            errCode: 0,
            message: 'OK',
            data: data || {}
        };
    } catch (error) {
        console.error(error);
        return {
            errCode: -1,
            message: 'Error from server...',
        };
    }
};

let getProfileDoctorById = async (id) => {
    try {
        if (!id) {
            return {
                errCode: 1,
                message: 'Missing required parameters!',
            };
        }

        let data = await db.BacSi.findOne({
            where: { IDBacSi: id },
            attributes: { exclude: ['password'] },
            include: [
                { model: db.MarkDown, attributes: ['description', 'contentHTML', 'contentMarkDown'] },
                { 
                    model: db.BacsiKhoa,
                    as:'bacsi_khoa',
                    attributes: { exclude: ['IDBacSi', 'IDKhoa'] }, 
                    include: [{ model: db.Khoa,as:'khoa', attributes: ['IDKhoa', 'TenKhoa'] }] 
                    
                },
                { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] }
            ],
            raw: false,
            nest: true
        });

        return {
            errCode: 0,
            message: 'OK',
            data: data || {}
        };
    } catch (error) {
        console.error(error);
        return {
            errCode: -1,
            message: 'Error from server...',
        };
    }
};

let getListPatientsForDoctor = async (doctorId, date) => {
    try {
        if (!doctorId || !date) {
            return {
                errCode: 1,
                message: 'Missing required parameters!',
            };
        }

        let data = await db.LichDat.findAll({
            where: { IDBacSi: doctorId, NgayDatLich: date, TrangThai: '2' },
            include: [
                {
                    model: db.BenhNhan,
                    as: 'benhnhan',
                    attributes: ['email', 'diaChi', 'SDT', 'gioiTinh', 'hoten'],
                    include: [
                        { model: db.Allcode, as: 'genderDataPatient', attributes: ['valueEn', 'valueVi'] }
                    ]
                },
                { model: db.CaKham, as: 'cakham', attributes: ['valueEn', 'valueVi'] }
            ],
            raw: false,
            nest: true
        });

        return {
            errCode: 0,
            message: 'OK',
            data: data || []
        };
    } catch (error) {
        console.error(error);
        return {
            errCode: -1,
            message: 'Error from server...',
        };
    }
};


let sendRemedy = async (data) => {
    try {
        if (!data.email || !data.doctorId || !data.patientId || !data.timeType) {
            return {
                errCode: 1,
                message: 'Missing required parameters!',
            };
        }

        await emailService.sendSimpleEmail({
            receiverEmail: data.email,
            patientName: data.patientName,
            doctorName: data.doctorName,
            time: data.timeString,
            language: data.language,
            redirectLink: data.redirectLink
        });

        let appointment = await db.LichDat.findOne({
            where: {
                IDBacSi: data.doctorId,
                IDBenhNhan: data.patientId,
                IDCa: data.timeType,
                TrangThai: '2'
            },
            raw: false
        });

        if (appointment) {
            appointment.TrangThai = '3';
            await appointment.save();
        }

        return {
            errCode: 0,
            message: 'OK'
        };
    } catch (error) {
        console.error(error);
        return {
            errCode: -1,
            message: 'Error from server...',
        };
    }
};

module.exports = {
    getTopDoctorHome,
    getAllDoctors,
    getAllDoctorInfor,
    saveInfoDoctor,
    getDetailDoctorById,
    bulkCreateSchedule,
    getScheduleByDateService,
    getExtraInforDoctorById,
    getProfileDoctorById,
    getListPatientsForDoctor,
    sendRemedy
};
