const patientService = require('../services/patientService');

let postBookAppointment = async (req, res) => {
    try {
        let data = await patientService.postBookAppointment(req.body);
        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            errCode: -1,
            message: 'Error from server...',
        });
    }
}

let postVerifyBookAppointment = async (req, res) => {
    try {
        let data = await patientService.postVerifyBookAppointmentService(req.body);
        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            errCode: -1,
            message: 'Error from server...',
        });
    }
}

module.exports = {
    postBookAppointment,
    postVerifyBookAppointment
}