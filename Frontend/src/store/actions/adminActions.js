import actionTypes from './actionTypes';
import {
    getAllCodeService, saveDetailDoctorService, getAllDoctorsService,
    getTopDoctoreService, editUserService, deleteUserService,
    createNewUserService, getAllUsers, getAllSpecialty, getAllClinic,
    getDetailClinicById
} from '../../services/userService';
import { toast } from 'react-toastify';

// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// });
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START })

            let res = await getAllCodeService('GENDER');
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            } else {
                dispatch(fetchGenderFailed());
            }
        } catch (error) {
            dispatch(fetchGenderFailed());
        }
    }
}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
});
export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
});

//////
export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('POSITION');
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            } else {
                dispatch(fetchPositionFailed());
            }
        } catch (error) {
            dispatch(fetchPositionFailed());
        }
    }
}
export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
});
export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
});

//////
export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('ROlE');
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            } else {
                dispatch(fetchRoleFailed());
            }
        } catch (error) {
            dispatch(fetchRoleFailed());
        }
    }
}

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
});
export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
});

////////////////////////////////
export const createUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data);
            if (res && res.errCode === 0) {
                dispatch(saveUserSuccess());
                dispatch(fetchAllUserStart());
                toast.success('Create is user successfully!');
            } else {
                dispatch(saveUserFailed());
            }
        } catch (error) {
            dispatch(saveUserFailed());
            toast.error('Create user failed: ');
        }
    }
}
export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS,
});
export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
});

/////////
export const fetchAllUserStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers('All');
            if (res && res.errCode === 0) {
                dispatch(fetchAllUsersSuccess(res.users.reverse()));
            } else {
                dispatch(fetchAllUsersFailed());
                toast.error('Failed to get all user!');
            }
        } catch (error) {
            dispatch(fetchAllUsersFailed());
            toast.error('Failed to get all user!');
            console.error(error);
        }
    }
}
export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
    users: data
});
export const fetchAllUsersFailed = () => ({
    type: actionTypes.FETCH_ALL_USER_FAILED
});

/////////   
export const deleteUser = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(id);
            if (res && res.errCode === 0) {
                toast.success('Deleted user successfully!');
                dispatch(deleteUsersSuccess());
                dispatch(fetchAllUserStart());
            } else {
                dispatch(deleteUsersFailed());
            }
        } catch (error) {
            dispatch(fetchAllUsersFailed());
            toast.error('Failed to delete user!');
            console.error(error);
        }
    }
}
export const deleteUsersSuccess = () => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
});
export const deleteUsersFailed = () => ({
    type: actionTypes.FETCH_ALL_USER_FAILED
});

/////////   
export const editUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(data);
            if (res && res.errCode === 0) {
                dispatch(editUsersSuccess());
                dispatch(fetchAllUserStart());
            } else {
                dispatch(editUsersFailed());
            }
        } catch (error) {
            dispatch(editUsersFailed());
            toast.error('Failed to edit user!');
            console.error(error);
        }
    }
}
export const editUsersSuccess = () => ({
    type: actionTypes.FETCH_EDIT_USER_SUCCESS,
});
export const editUsersFailed = () => ({
    type: actionTypes.FETCH_EDIT_USER_FAILED
});

/////////   
export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctoreService('10');
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
                    dataDoctors: res.data,
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
                })
            }
        } catch (error) {
            console.error(error)
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
            })
        }
    }
}

/////////   
export const fetchAllDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctorsService();
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
                    dataAllDoctors: res.data,
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_FAILED
                })
            }
        } catch (error) {
            console.error(error)
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
            })
        }
    }
}

/////////   
export const saveDetailDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailDoctorService(data);
            if (res && res.errCode === 0) {
                toast.success('Save info detail doctor successfully!');
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
                })
            } else {
                toast.error('Error saving!');
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED
                })
            }
        } catch (error) {
            console.error(error)
            toast.error('Error saving!');
            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
            })
        }
    }
}

/////////   
export const fetchAllScheduleTime = (type) => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('TIME');
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
                    dataTime: res.data,
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED
                })
            }
        } catch (error) {
            console.error(error)
            dispatch({
                type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
            })
        }
    }
}

// actions select admin doctor
export const getRequiredDoctorInfor = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START });

            let resPrice = await getAllCodeService("PRICE");
            let resPayment = await getAllCodeService("PAYMENT");
            let resProvince = await getAllCodeService("PROVINCE");
            let resSpecialty = await getAllSpecialty();
            let resClinic = await getAllClinic();


            if (resPrice && resPrice.errCode === 0
                && resPayment && resPayment.errCode === 0
                && resProvince && resProvince.errCode === 0
                && resSpecialty && resSpecialty.errCode === 0
                && resClinic && resClinic.errCode === 0) {
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data,
                    resSpecialty: resSpecialty.data,
                    resClinic: resClinic.data
                }
                dispatch(fetchRequireDoctorInforSuccess(data));
            } else {
                dispatch({ type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILDED });
            }

        } catch (error) {
            console.error(error)
            dispatch({ type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILDED });
        }
    }
}
export const fetchRequireDoctorInforSuccess = (allRequiredData) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
    data: allRequiredData
});

/////////   
export const fetchClinicById = (clinicId) => {
    return async (dispatch, getState) => {
        try {
            let res = await getDetailClinicById(clinicId);
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_CLINIC_BY_ID_SUCCESS,
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_CLINIC_BY_ID_FAILED
                })
            }
        } catch (error) {
            console.error(error)
            dispatch({
                type: actionTypes.FETCH_CLINIC_BY_ID_FAILED
            })
        }
    }
}






