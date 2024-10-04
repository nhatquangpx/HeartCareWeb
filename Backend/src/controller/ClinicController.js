const clinicService = require('../services/clinicService');

let createClinic = async (req, res) => {
    try {
        let data = await clinicService.createClinic(req.body);
        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            errCode: -1,
            message: 'Error from server...',
        });
    }
}

let getAllClinic = async (req, res) => {
    try {
        let data = await clinicService.getAllClinic();
        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            errCode: -1,
            message: 'Error from server...',
        });
    }
}
let getDetailClinicById = async (req, res) => {
    try {
        let data = await clinicService.getDetailClinicById(req.query.id);
        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            errCode: -1,
            message: 'Error from server...',
        });
    }
}

let deleteClinicById = async (req, res) => {
    try {
        let data = await clinicService.deleteClinicById(req.query.id);
        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            errCode: -1,
            message: 'Error from server...',
        });
    }
}


let updateClinicById = async (req, res) => {
    try {
        let data = await clinicService.updateClinicByIdService(req.query.id, req.body);

        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            errCode: -1,
            message: 'Error from server...',
        });
    }
};


module.exports = {
    createClinic,
    getAllClinic,
    getDetailClinicById,
    deleteClinicById,
    updateClinicById
}