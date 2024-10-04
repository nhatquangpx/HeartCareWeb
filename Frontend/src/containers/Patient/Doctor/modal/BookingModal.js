import React, { Component } from 'react';
import { connect } from "react-redux";
import './BookingModal.scss';
import { Modal } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../../store/actions';
import { LANGUAGES } from '../../../../utils';
import { postPatientBooking } from '../../../../services/userService';
import { toast } from 'react-toastify';
import moment from 'moment';

class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            doctorId: '',
            timeType: '',
        }
    }

    async componentDidMount() {
        this.props.getGenders();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.dataTime !== prevProps.dataTime) {
            if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
                let doctorId = this.props.dataTime.IDBacSi;
                let timeType = this.props.dataTime.timeType;
                this.setState({
                    doctorId: doctorId,
                    timeType: timeType
                });
            }
        }
    }

    handleOnChangeInput = (e, id) => {
        let valueInput = e.target.value;
        let stateCopy = { ...this.state };
        stateCopy[id] = valueInput;
        this.setState({
            ...stateCopy
        });
    }

    buildTimeBooking = (dataTime) => {
        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = language === LANGUAGES.VI ?
                dataTime?.timeTypeData?.valueVi : dataTime?.timeTypeData?.valueEn;
            let date = language === LANGUAGES.VI ?
                moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')
                : moment.unix(+dataTime.date / 1000).locale('en').format('ddd - DD/MM/YYYY');
            return `${time} | ${date}`;
        }
        return '';
    }

    buildDoctorName = (dataTime) => {
        if (dataTime && !_.isEmpty(dataTime) && dataTime.doctorData) {
            let name = `${dataTime.doctorData.hoten}`;
            return name;
        }
        return '';
    }

    handleConfirmBooking = async () => {
        let timeString = this.buildTimeBooking(this.props.dataTime);
        let doctorName = this.buildDoctorName(this.props.dataTime);
    
        let bookingData = {
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            date: this.props.dataTime.date,
            doctorId: this.state.doctorId,
            timeType: this.state.timeType,
            language: this.props.language,
            timeString: timeString,
            doctorName: doctorName,
            serviceId: 1 // Ensure this matches your backend requirements
        };
    
        console.log('Booking Data:', bookingData); // Check the payload sent to the backend
    
        // try {
            let res = await postPatientBooking(bookingData);
    
            console.log('Booking Response:', res); // Check the response from the backend
    
            // if (res && res.errCode === 0) {
                toast.success('Booking successful!');
                this.props.closeBooking();
        //     } else {
        //         toast.error('Booking failed! Error code: ' + (res.errCode || 'Unknown'));
        //     }
        // } catch (error) {
        //     console.error('Booking Error:', error);
        //     toast.error('Booking failed due to a network or server error!');
        // }
    }
    

    handleReset = () => {
        this.setState({
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
        });
    }

    render() {
        let { isOpenModal, closeBooking, dataTime } = this.props;
        let doctorId = dataTime && !_.isEmpty(dataTime) ? dataTime.doctorId : '';

        return (
            <>
                <Modal
                    isOpen={isOpenModal}
                    size='lg'
                    centered
                >
                    <div className="booking-modal-content">
                        <div className="booking-modal-header">
                            <span className='left'><FormattedMessage id={"detail-doctor.infor-booking"} /></span>
                            <span className='right' onClick={closeBooking}>
                                <i className='fas fa-times'></i>
                            </span>
                        </div>
                        <div className="booking-modal-body">
                            <div className="doctor-infor">
                                <ProfileDoctor
                                    doctorId={doctorId}
                                    isShowDescriptionDoctor={false}
                                    isShowAddressDoctor={true}
                                    dataTime={dataTime}
                                />
                            </div>
                            <div className="row">
                                <div className="col-md-6 form-group">
                                    <label><FormattedMessage id={"detail-doctor.name"} /></label>
                                    <input type="text" className='form-control'
                                        value={this.state.fullName}
                                        onChange={(e) => this.handleOnChangeInput(e, 'fullName')} />
                                </div>
                                <div className="col-md-6 form-group">
                                    <label><FormattedMessage id={"detail-doctor.sdt"} /></label>
                                    <input type="text" className='form-control'
                                        value={this.state.phoneNumber}
                                        onChange={(e) => this.handleOnChangeInput(e, 'phoneNumber')} />
                                </div>
                                <div className="col-md-6 form-group">
                                    <label>Email</label>
                                    <input type="text" className='form-control'
                                        value={this.state.email}
                                        onChange={(e) => this.handleOnChangeInput(e, 'email')} />
                                </div>
                                <div className="col-md-12 form-group">
                                    <label><FormattedMessage id={"detail-doctor.address-user"} /></label>
                                    <input type="text" className='form-control'
                                        value={this.state.address}
                                        onChange={(e) => this.handleOnChangeInput(e, 'address')} />
                                </div>
                                <div className="col-md-12 form-group">
                                    <label><FormattedMessage id={"detail-doctor.reason"} /></label>
                                    <textarea type="text" className='form-control'
                                        value={this.state.reason}
                                        onChange={(e) => this.handleOnChangeInput(e, 'reason')} />
                                </div>
                            </div>
                        </div>
                        <div className="booking-modal-footer">
                            <button className='btn-confirm' onClick={() => { this.handleConfirmBooking(); this.handleReset(); }}><FormattedMessage id={"detail-doctor.confirm"} /></button>
                            <button className='btn-cancel' onClick={() => { closeBooking(); this.handleReset(); }}><FormattedMessage id={"detail-doctor.cancel"} /></button>
                        </div>
                    </div>
                </Modal>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenders: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
