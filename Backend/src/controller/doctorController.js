const doctorService = require('../services/doctorService');

let getTopDoctorHome = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 10;
    try {
        let response = await doctorService.getTopDoctorHome(+limit);
        return res.status(200).json({
            errCode: 0,
            message: 'OK',
            data: response
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            errCode: -1,
            message: 'Error from server...',
            error: error
        });
    }
};

let getAllDoctors = async (req, res) => {
    try {
        let response = await doctorService.getAllDoctors();
        return res.status(200).json({
            errCode: 0,
            message: 'OK',
            data: response
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            errCode: -1,
            message: 'Error from server...',
            error: error
        });
    }
}

let getAllDoctorInfor = async (req, res) => {
    try {
        let response = await doctorService.getAllDoctorInfor();
        return res.status(200).json({
            errCode: 0,
            message: 'OK',
            data: response
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            errCode: -1,
            message: 'Error from server...',
            error: error
        });
    }
}

let postInfoDoctor = async (req, res) => {
    try {
        let response = await doctorService.saveInfoDoctor(req.body);
        return res.status(200).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            errCode: -1,
            message: 'Error from server...',
            error: error
        });
    }
};

let getDetailDoctorById = async (req, res) => {
    try {
        let response = await doctorService.getDetailDoctorById(req.query.id);
        return res.status(200).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            errCode: -1,
            message: 'Error from server...',
            error: error
        });
    }
}

let bulkCreateSchedule = async (req, res) => {
    try {
        let info = await doctorService.bulkCreateSchedule(req.body);
        return res.status(200).json(info);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            errCode: -1,
            message: 'Error from server...',
            error: error
        });
    }
}

let getScheduleByDate = async (req, res) => {
    try {
        let info = await doctorService.getScheduleByDateService(req.query.doctorId, req.query.date);
        return res.status(200).json(info);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            errCode: -1,
            message: 'Error from server...',
            error: error
        });
    }
}

let getExtraInforDoctorById = async (req, res) => {
    try {
        let data = await doctorService.getExtraInforDoctorById(req.query.doctorId);
        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            errCode: -1,
            message: 'Error from server...',
            error: error
        });
    }
}

let getProfileDoctorById = async (req, res) => {
    try {
        let data = await doctorService.getProfileDoctorById(req.query.doctorId);
        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            errCode: -1,
            message: 'Error from server...',
            error: error
        });
    }
}

let getListPatientsForDoctor = async (req, res) => {
    try {
        let data = await doctorService.getListPatientsForDoctor(req.query.doctorId, req.query.date);
        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            errCode: -1,
            message: 'Error from server...',
            error: error
        });
    }
}

let sendRemedy = async (req, res) => {
    try {
        let data = await doctorService.sendRemedy(req.body);
        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            errCode: -1,
            message: 'Error from server...',
            error: error
        });
    }
}

module.exports = {
    getTopDoctorHome,
    getAllDoctors,
    postInfoDoctor,
    getDetailDoctorById,
    bulkCreateSchedule,
    getScheduleByDate,
    getExtraInforDoctorById,
    getProfileDoctorById,
    getAllDoctorInfor,
    getListPatientsForDoctor,
    sendRemedy
};
