// const db = require('../../models/index');
// require('dotenv').config();
// const _ = require('lodash');

// let createSpecialty = async (data) => {
//     try {
//         if (!data.name || !data.imageBase64 || !data.descriptionHTML || !data.descriptionMarkdown) {
//             return {
//                 errCode: 1,
//                 message: 'Missing required parameters!',
//             }
//         } else {
//             await db.Specialty.create({
//                 name: data.name,
//                 image: data.imageBase64,
//                 descriptionHTML: data.descriptionHTML,
//                 descriptionMarkdown: data.descriptionMarkdown
//             })

//             return {
//                 errCode: 0,
//                 message: 'OK',
//             }
//         }
//     } catch (error) {
//         return {
//             errCode: -1,
//             message: 'Error from server...',
//         };
//     }
// }

// let getAllSpecialty = async () => {
//     try {
//         let res = await db.Specialty.findAll();
//         if (res && res.length > 0) {
//             res.map(item => {
//                 item.image = new Buffer.from(item.image, 'base64').toString('binary');
//                 return item;
//             })
//         }
//         return {
//             errCode: 0,
//             message: 'OK',
//             data: res
//         }

//     } catch (error) {
//         return {
//             errCode: -1,
//             message: 'Error from server...',
//         };
//     }
// }

// let getDetailSpecialtyById = async (id, location) => {
//     try {
//         if (!id || !location) {
//             return {
//                 errCode: 1,
//                 message: 'missing parameter!',
//             }
//         } else {
//             let data = await db.Specialty.findOne({
//                 where: { id: id },
//                 attributes: ['id', 'name', 'descriptionHTML', 'descriptionMarkdown']
//             })
//             if (data) {
//                 let doctorSpecialty = [];
//                 if (location === 'ALL') {
//                     doctorSpecialty = await db.Doctor_Infor.findAll({
//                         where: {
//                             specialtyId: id,
//                         },
//                         attributes: ['doctorId', 'provinceId']
//                     })
//                 } else {
//                     doctorSpecialty = await db.Doctor_Infor.findAll({
//                         where: {
//                             specialtyId: id,
//                             provinceId: location
//                         },
//                         attributes: ['doctorId', 'provinceId']
//                     })
//                 }
//                 data.doctorSpecialty = doctorSpecialty;
//             } else {
//                 data = {}
//             }
//             return {
//                 errCode: 0,
//                 message: 'OK',
//                 data
//             }
//         }
//     } catch (error) {
//         return {
//             errCode: -1,
//             message: 'Error from server...',
//         };
//     }
// }

// let deleteSpecialtyById = async (inputId) => {
//     try {
//         if (!inputId) {
//             return {
//                 errCode: 1,
//                 message: 'Missing required parameters!',
//             }
//         } else {
//             await db.Specialty.destroy({
//                 where: {
//                     id: inputId
//                 },
//             })

//             return {
//                 errCode: 0,
//                 message: 'Delete specialty successfully!',
//             }
//         }
//     } catch (error) {
//         return {
//             errCode: -1,
//             message: 'Error from server...',
//         };
//     }
// }

// let editSpecialtyById = async (inputId, data) => {
//     try {
//         if (!inputId) {
//             return {
//                 errCode: 1,
//                 message: 'Missing required parameters!'
//             };
//         } else {
//             let res = await db.Specialty.findOne({
//                 where: {
//                     id: inputId
//                 },
//                 raw: false
//             });

//             if (res && res.image) {
//                 res.image = data.image;
//                 res.name = data.name;
//                 res.descriptionHTML = data.descriptionHTML;
//                 res.descriptionMarkdown = data.descriptionMarkdown;

//                 await res.save();
//                 return {
//                     errCode: 0,
//                     message: 'Specialty updated successfully',
//                     data: res
//                 };
//             }
//         }
//     } catch (error) {
//         return { errCode: -1, message: 'Error from server...' };
//     }
// };


// module.exports = {
//     createSpecialty,
//     getAllSpecialty,
//     getDetailSpecialtyById,
//     deleteSpecialtyById,
//     editSpecialtyById
// }
const db = require('../../models/index');
require('dotenv').config();
const _ = require('lodash');

let createSpecialty = async (data) => {
    try {
        if (!data.name || !data.imageBase64 || !data.descriptionHTML || !data.descriptionMarkdown) {
            return {
                errCode: 1,
                message: 'Missing required parameters!',
            };
        } else {
            // Create a new Khoa (Specialty)
            await db.Khoa.create({
                TenKhoa: data.name,
                MoTa: data.descriptionHTML
                // Assuming imageBase64 is stored somewhere in Khoa model if needed
            });

            return {
                errCode: 0,
                message: 'OK',
            };
        }
    } catch (error) {
        return {
            errCode: -1,
            message: 'Error from server...',
        };
    }
};

let getAllSpecialty = async () => {
    try {
        // Fetch all Khoas (Specialties)
        let res = await db.Khoa.findAll({
            // include: [
            //     {
            //         model: db.BacSi,
            //         as: 'bacsis',
            //         through: { attributes: [] } // Exclude unnecessary attributes from join table
            //     }
            // ]
        });

        if (res && res.length > 0) {
            res.map(item => {
                // Check if item has image property and convert it
                if (item.image) {
                    item.image = new Buffer.from(item.image, 'base64').toString('binary');
                }
                return item;
            });
        }

        return {
            errCode: 0,
            message: 'OK',
            data: res
        };
    } catch (error) {
        console.error('Failed to retrieve specialties:', error); // Log error details to console
        return {
            errCode: -1,
            message: 'Error from server...'
        };
    }
};

module.exports = {
    getAllSpecialty
};

let getDetailSpecialtyById = async (id, location) => {
    try {
        if (!id || !location) {
            return {
                errCode: 1,
                message: 'Missing parameters!',
            };
        } else {
            // Find Khoa (Specialty) by ID
            let data = await db.Khoa.findByPk(id, {
                // include: [
                //     {
                //         model: db.BacSi,
                //         as: 'bacsies',
                //         through: { attributes: [] }
                //     }
                // ]
            });

            if (!data) {
                return {
                    errCode: 1,
                    message: 'Specialty not found!',
                };
            }

            // Get related doctor specialties based on location
            let doctorSpecialty = [];
            if (location === 'ALL') {
                doctorSpecialty = await db.BacsiKhoa.findAll({
                    where: {
                        IDKhoa: id,
                    },
                    attributes: ['IDBacSi', 'ChucVu']
                });
            } else {
                doctorSpecialty = await db.BacsiKhoa.findAll({
                    where: {
                        IDKhoa: id,
                    },
                    include: [
                        {
                            model: db.BacSi,
                            as: 'bacsi',
                            where: {
                                ChucVu: location
                            },
                            attributes: ['IDBacSi', 'ChucVu']
                        }
                    ],
                    attributes: ['IDBacSi', 'ChucVu']
                });
            }

            data.doctorSpecialty = doctorSpecialty;

            return {
                errCode: 0,
                message: 'OK',
                data
            };
        }
    } catch (error) {
        return {
            errCode: -1,
            message: 'Error from server...',
        };
    }
};

let deleteSpecialtyById = async (inputId) => {
    try {
        if (!inputId) {
            return {
                errCode: 1,
                message: 'Missing required parameters!',
            };
        } else {
            // Delete Khoa (Specialty) by ID
            await db.Khoa.destroy({
                where: {
                    IDKhoa: inputId
                },
            });

            return {
                errCode: 0,
                message: 'Delete specialty successfully!',
            };
        }
    } catch (error) {
        return {
            errCode: -1,
            message: 'Error from server...',
        };
    }
};

let editSpecialtyById = async (inputId, data) => {
    try {
        if (!inputId) {
            return {
                errCode: 1,
                message: 'Missing required parameters!'
            };
        } else {
            // Find Khoa (Specialty) by ID
            let khoa = await db.Khoa.findByPk(inputId);

            if (!khoa) {
                return {
                    errCode: 1,
                    message: 'Specialty not found!'
                };
            }

            // Update Khoa (Specialty)
            await khoa.update({
                TenKhoa: data.name || khoa.TenKhoa,
                MoTa: data.descriptionHTML || khoa.MoTa
                // Update other fields as needed
            });

            return {
                errCode: 0,
                message: 'Specialty updated successfully',
                data: khoa
            };
        }
    } catch (error) {
        return {
            errCode: -1,
            message: 'Error from server...'
        };
    }
};

module.exports = {
    createSpecialty,
    getAllSpecialty,
    getDetailSpecialtyById,
    deleteSpecialtyById,
    editSpecialtyById
};
