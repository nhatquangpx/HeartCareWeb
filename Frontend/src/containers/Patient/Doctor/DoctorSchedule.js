import React, { Component } from 'react';
import { connect } from "react-redux";
import moment from 'moment';
import { LANGUAGES } from '../../../utils';
import './DoctorSchedule.scss';
import { getScheduleByDate } from '../../../services/userService';
import '../../../styles/styles.scss';
import { FormattedMessage } from 'react-intl';
import BookingModal from './modal/BookingModal';

class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allAvailableTimes: [], // Dữ liệu từ API sẽ được lưu vào đây
            isOpenModalBooking: false,
            dataScheduleTimeModal: {}
        };
    }

    async componentDidMount() {
        let { language } = this.props;
        let allDays = this.getArrDays(language);
        this.setState({
            allDays: allDays,
        });
        // Lấy dữ liệu lịch ban đầu khi component mount
        if (this.props.doctorIdFromParent) {
            console.log('Fetching schedule data on mount', this.props.doctorIdFromParent, allDays[0].value);
            await this.fetchScheduleData(this.props.doctorIdFromParent, allDays[0].value);
        }
    }

    getArrDays = (language) => {
        let allDays = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            let date = moment().add(i, 'days'); // Tính toán ngày thích hợp
    
            // Lấy thứ trong tuần từ 2 đến 7 (Chủ nhật là 1 trong moment.js)
            let dayOfWeek = date.isoWeekday();
    
            if (language === LANGUAGES.VI) {
                if (i === 0) {
                    let ddMM = date.format('DD/MM');
                    let today = `hôm nay - ${ddMM}`;
                    object.label = today;
                } else {
                    object.label = date.format(`dddd - DD/MM`);
                }
            } else {
                if (i === 0) {
                    let ddMM = date.format('DD/MM');
                    let today = `Today - ${ddMM}`;
                    object.label = today;
                } else {
                    object.label = date.locale('en').format(`ddd - DD/MM`);
                }
            }
    
            // Gán giá trị của thứ trong tuần (2-7) cho object.value
            object.value = dayOfWeek;
    
            allDays.push(object);
        }
        return allDays;
    };
    

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            let allDays = this.getArrDays(this.props.language);
            this.setState({
                allDays: allDays,
            });
        }
        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            let allDays = this.getArrDays(this.props.language);
            console.log('Fetching schedule data on update', this.props.doctorIdFromParent, allDays[0].value);
            await this.fetchScheduleData(this.props.doctorIdFromParent, allDays[0].value);
        }
    }

    fetchScheduleData = async (doctorId, date) => {
        try {
            let res = await getScheduleByDate(doctorId, date);

            console.log('API Response:', res); // Thêm dòng này để kiểm tra dữ liệu API

            if (res && res.errCode === 0) {
                this.setState({
                    allAvailableTimes: res.data ? res.data : [],
                });
            } else {
                this.setState({
                    allAvailableTimes: [],
                });
            }
        } catch (error) {
            console.error('Error fetching schedule:', error);
        }
    }

    handleOnChangeSelect = async (e) => {
        if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
            let doctorId = this.props.doctorIdFromParent;
            let date = parseInt(e.target.value); // Chuyển đổi giá trị date thành số nguyên
    
            let res = await getScheduleByDate(doctorId, date);
    
            if (res && res.errCode === 0) {
                this.setState({
                    allAvailableTimes: res.data ? res.data : [],
                });
            }
        }
    };
    

    handleClickScheduleTime = (time) => {
        this.setState({
            isOpenModalBooking: true,
            dataScheduleTimeModal: time
        });
    }

    closeBooking = () => {
        this.setState({
            isOpenModalBooking: false,
        });
    }

    render() {
        let { allDays, allAvailableTimes, isOpenModalBooking, dataScheduleTimeModal } = this.state;
        let { language } = this.props;
        const hasAvailableTimes = allAvailableTimes && allAvailableTimes.length > 0;
        return (
            <>
                <div className="doctor-schedule-container">
                    <div className="all-schedule">
                        <select onChange={(e) => this.handleOnChangeSelect(e)}>
                            {allDays && allDays.length > 0 &&
                                allDays.map((item, index) => {
                                    return (
                                        <option
                                            key={index}
                                            value={item.value}>
                                            {item.label}
                                        </option>
                                    )
                                })}
                        </select>
                    </div>
                    <div className="all-available-time">
                        <div className="text-calenda">
                            <i className='fas fa-calendar-alt'><span><FormattedMessage id={"detail-doctor.calendar"} /></span></i>
                        </div>
                        <div className="time-content">
                            {allAvailableTimes && allAvailableTimes.length > 0 ?
                                allAvailableTimes.map((item, index) => {
                                    let timeDisplay = item.cakham ? item.cakham.KhungGio : ''; // Đảm bảo rằng cakham chứa KhungGio
                                    return (
                                        <button onClick={() => this.handleClickScheduleTime(item)} key={index}>{timeDisplay}</button>
                                    )
                                })
                                :
                                <div className="text-content"><FormattedMessage id={"detail-doctor.text"} /></div>
                            }
                        </div>
                        {hasAvailableTimes && (
                            <div className="note">Chọn <i className="far fa-hand-point-up fa-lg"></i> và đặt (Phí đặt lịch 0<sup>đ</sup>)</div>
                        )}
                    </div>
                </div>
                <BookingModal
                    isOpenModal={isOpenModalBooking}
                    closeBooking={this.closeBooking}
                    dataTime={dataScheduleTimeModal}
                />
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
