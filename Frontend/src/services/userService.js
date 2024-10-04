import axios from "../axios";

const handleLoginApi = (username, password) => {
    return axios.post('/api/login', { username, password })
}

const getAllUsers = (id) => {
    return axios.get(`/api/get-all-users?id=${id}`)
}

const createNewUserService = (data) => {
    return axios.post(`/api/create-user`, data)
}

const deleteUserService = (userId) => {
    return axios.delete(`/api/delete-user`, {
        data: {
            id: userId
        }
    })
}

const editUserService = (inputData) => {
    return axios.put(`/api/edit-user`, inputData)
}

const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`)
}

const getTopDoctoreService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`)
}

const getAllDoctorsService = () => {
    return axios.get(`/api/get-all-doctors`)
}

const getAllDoctorInfor = () => {
    return axios.get(`/api/get-all-doctor-infor`)
}

const saveDetailDoctorService = (data) => {
    return axios.post(`/api/save-info-doctor`, data);
}

const getDetailInfoDoctorService = (id) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${id}`);
}

const saveBulkScheduleDoctor = (data) => {
    return axios.post(`/api/bulk-create-schedule`, data);
}

const getScheduleByDate = (doctorId, date) => {
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`);
}

const getExtraInforDoctorByIdService = (doctorId) => {
    return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`);
}

const getProfileDoctorById = (doctorId) => {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
}

const postPatientBooking = (data) => {
    return axios.post(`/api/patient-book-appointment`, data);
}

const postVerifyBookAppointment = (data) => {
    return axios.post(`/api/verify-book-appointment`, data);
}

const createNewSpecialty = (data) => {
    return axios.post(`/api/create-new-specialty`, data);
}

const getAllSpecialty = (data) => {
    return axios.get(`/api/get-all-specialty`, data);
}

const getAllDetailSpecialtyById = (data) => {
    return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`);
}

const createClinic = (data) => {
    return axios.post(`api/create-new-clinic`, data);
}

const getAllClinic = () => {
    return axios.get(`api/get-all-clinic`);
}

const getDetailClinicById = (data) => {
    return axios.get(`api/get-detail-clinic-by-id?id=${data.id}`);
}

const getClinicById = (id) => {
    return axios.get(`api/get-detail-clinic-by-id?id=${id}`);
}

const getAllPatient = (data) => {
    return axios.get(`api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`);
}

const postSendRemedy = (data) => {
    return axios.post(`api/send-remedy`, data);
}

const deleteClinicById = (clinicId) => {
    return axios.delete(`/api/delete-clinic-by-id?id=${clinicId}`);
}

const updateClinicByIdService = (clinicId, updatedData) => {
    return axios.put(`/api/update-clinic-by-id?id=${clinicId}`, updatedData);
};

const deleteSpecialtyById = (id) => {
    return axios.delete(`/api/delete-specialty-by-id?id=${id}`);
};

const editSpecialtyById = (id, data) => {
    return axios.put(`/api/edit-specialty-by-id?id=${id}`, data);
};

export {
    handleLoginApi,
    getAllUsers,
    createNewUserService,
    deleteUserService,
    editUserService,
    getAllCodeService,
    getTopDoctoreService,
    getAllDoctorsService,
    saveDetailDoctorService,
    getDetailInfoDoctorService,
    saveBulkScheduleDoctor,
    getScheduleByDate,
    getExtraInforDoctorByIdService,
    getProfileDoctorById,
    postPatientBooking,
    postVerifyBookAppointment,
    createNewSpecialty,
    getAllSpecialty,
    getAllDetailSpecialtyById,
    createClinic,
    getAllClinic,
    getDetailClinicById,
    getAllDoctorInfor,
    getAllPatient,
    postSendRemedy,
    deleteClinicById,
    updateClinicByIdService,
    getClinicById,
    deleteSpecialtyById,
    editSpecialtyById
}

