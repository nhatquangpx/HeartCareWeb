import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManageSchedule.scss';
import Select from 'react-select';
import * as actions from '../../../store/actions'
import { CRUD_ACTIONS, LANGUAGES, dateFormat } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { saveBulkScheduleDoctor } from '../../../services/userService';

class ManageSchelude extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listDoctors: [],
            selectedOption: {},
            currentDate: '',
            rangeTime: [],
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctor();
        this.props.fetchAllScheduleTime();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelect
            })
        }
        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
            let data = this.props.allScheduleTime;
            if (data && data.length > 0) {
                data = data.map(item => ({ ...item, isSelected: false }))
            }

            this.setState({
                rangeTime: data
            })
        }
    }

    buildDataInputSelect = (data) => {
        let result = [];
        let { language } = this.props;

        if (data && data.length > 0) {
            data.map((item, index) => {
                let object = {};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName}`;

                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id;
                result.push(object);
            })
        }
        return result;
    }

    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedOption });
    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        });
    }

    hanldeClickBtnTime = (time) => {
        let { rangeTime } = this.state;
        if (rangeTime && rangeTime.length > 0) {
            rangeTime = rangeTime.map(item => {
                if (item.id === time.id) item.isSelected = !item.isSelected;
                return item;
            })
            this.setState({
                rangeTime: rangeTime
            })
        }
    }

    handleSaveSchedule = async () => {
        let { rangeTime, selectedOption, currentDate } = this.state;
        let result = [];

        if (!currentDate) {
            toast.error("Invalid date! ");
            return;
        }
        if (selectedOption && _.isEmpty(selectedOption)) {
            toast.error("Invalid selected doctor! ");
            return;
        }
        // conver date
        let formatedDate = new Date(currentDate).getTime();
        if (rangeTime && rangeTime.length > 0) {
            let selectedTime = rangeTime.filter(item => item.isSelected === true);
            if (selectedTime.length > 0 && selectedTime) {
                selectedTime.map((schedule, index) => {
                    let object = {};
                    object.doctorId = selectedOption.value;
                    object.date = formatedDate;
                    object.timeType = schedule.keyMap;
                    result.push(object);
                })
            } else {
                toast.error('Invalid selected time!');
                return;
            }
        }
        let res = await saveBulkScheduleDoctor({
            arrSchedule: result,
            doctorId: selectedOption.value,
            formatedDate: formatedDate
        });
        toast.success('Successed!');
        return res;
    }

    render() {
        let { rangeTime } = this.state;
        let { language } = this.props;

        return (
            <>
                <div className="manage-schedule-container">
                    <div className="title">
                        <FormattedMessage id="manage-schedule.title" />
                    </div>
                    <div className="container mt-5">
                        <div className="row">
                            <div className="col-6 form-group">
                                <label className='mb-2'><FormattedMessage id="manage-schedule.selected-doctor" />:</label>
                                <Select
                                    value={this.state.selectedOption}
                                    onChange={this.handleChangeSelect}
                                    options={this.state.listDoctors}
                                    placeholder={'Chọn bác sĩ'}
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label className='mb-2'>
                                    <FormattedMessage id="manage-schedule.selected-date" />:
                                </label>
                                <DatePicker onChange={this.handleOnChangeDatePicker}
                                    className='form-control'
                                    placeholder="Chọn ngày"
                                    value={this.state.currentDate}
                                    minDate={new Date().setHours(0, 0, 0, 0)} />
                            </div>
                            <div className="col-md-12 pick-hour-container">
                                {rangeTime && rangeTime.length > 0 &&
                                    rangeTime.map((item, index) => {
                                        return (
                                            <button className={item.isSelected === true ? "btn btn-time active" : "btn btn-time"}
                                                key={index}
                                                onClick={() => this.hanldeClickBtnTime(item)}>
                                                {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                            </button>
                                        )
                                    })}
                            </div>
                            <button className="btn btn-save"
                                onClick={() => this.handleSaveSchedule()}>
                                <FormattedMessage id="manage-schedule.save" />
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn,
        allScheduleTime: state.admin.allScheduleTime
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchelude);
