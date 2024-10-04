import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManagePatient.scss';
import { Container } from 'react-bootstrap';
import DatePicker from '../../../components/Input/DatePicker';
import { getAllPatient, postSendRemedy } from '../../../services/userService'
import moment from 'moment';
import { LANGUAGES } from '../../../utils';
import ModalRemedy from './ModalRemedy';
import { toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';
import { FormattedMessage } from 'react-intl';

class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: [],
            isOpenRemedyModal: false,
            dataModal: {},
            isShowLoading: false,
        }
    }

    async componentDidMount() {
        this.getDataPatient()
    }

    getDataPatient = async () => {
        let { user } = this.props;
        let { currentDate } = this.state;
        let formatedDate = new Date(currentDate).getTime();

        let res = await getAllPatient({
            doctorId: user.id,
            date: formatedDate
        })
        if (res && res.errCode === 0) {
            this.setState({ dataPatient: res.data });
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        }, async () => {
            await this.getDataPatient();
        });
    }

    handBtnConfirm = (item) => {
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType,
            patientName: item.patientData.firstName,
            //data doctor
            dt_firstName: item.doctorDataById.firstName,
            dt_lastName: item.doctorDataById.lastName,
            dt_address: item.doctorDataById.address,
            dt_phoneNumber: item.doctorDataById.phoneNumber,
            dt_email: item.doctorDataById.email,

        }

        this.setState({
            isOpenRemedyModal: true,
            dataModal: data,
        }, async () => {
            await this.getDataPatient();
        });
    }

    sendRemedy = async (dataChild) => {
        let { dataModal } = this.state;

        this.setState({
            isShowLoading: true
        });

        let res = await postSendRemedy({
            email: dataChild.email,
            imageBase64: dataChild.imageBase64,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
            language: this.props.language,
            patientName: dataModal.patientName,
            //data doctor
            dt_firstName: dataModal.dt_firstName,
            dt_lastName: dataModal.dt_lastName,
            dt_address: dataModal.dt_address,
            dt_phoneNumber: dataModal.dt_phoneNumber,
            dt_email: dataModal.dt_email,

        })

        if (res && res.errCode === 0) {
            this.setState({
                isShowLoading: false
            })
            toast.success('Send remedy successfully!');
            this.clossRemedyModal();
            await this.getDataPatient();
        } else {
            this.setState({
                isShowLoading: false
            })
            toast.error('Somethings wrongs...');
        }
    }

    handBtnRemedy = () => {

    }

    clossRemedyModal = () => {
        this.setState({
            isOpenRemedyModal: false,
            dataPatient: '',
        }, async () => {
            await this.getDataPatient();
        });
    }

    render() {
        let { dataPatient, isOpenRemedyModal, dataModal } = this.state;
        let { language } = this.props;

        return (
            <Container>
                <LoadingOverlay
                    active={this.state.isShowLoading}
                    spinner
                    text={"loading..."}
                >
                    <div className="manage-patient-container">
                        <div className="title">
                            <FormattedMessage id={"manage-patient.title"} />
                        </div>
                        <div className="m-p-body row mt-5">
                            <div className="form-group col-md-4">
                                <label><FormattedMessage id={"manage-patient.chooseDay"} />:</label>
                                <DatePicker
                                    onChange={this.handleOnChangeDatePicker}
                                    className="form-control mt-2"
                                    value={this.state.currentDate}
                                    minDate={new Date().setHours(0, 0, 0, 0)}
                                />
                            </div>
                        </div>
                        <div className="col-12 mt-5">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">STT</th>
                                        <th scope="col"><FormattedMessage id={"manage-patient.time"} /></th>
                                        <th scope="col"><FormattedMessage id={"manage-patient.name"} /></th>
                                        <th scope="col"><FormattedMessage id={"manage-patient.phone"} /></th>
                                        <th scope="col"><FormattedMessage id={"manage-patient.address"} /></th>
                                        <th scope="col"><FormattedMessage id={"manage-patient.sex"} /></th>
                                        <th colSpan={2}></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataPatient && dataPatient.length > 0 ?
                                        dataPatient.map((item, i) => {
                                            const sex = language === LANGUAGES.VI
                                                ? item.patientData.genderData.valueVi
                                                : item.patientData.genderData.valueEn;
                                            const time = language === LANGUAGES.VI
                                                ? item.timeTypeDataPatient.valueVi
                                                : item.timeTypeDataPatient.valueEn;
                                            return (
                                                <tr key={i}>
                                                    <th>{i + 1}</th>
                                                    <td>{time}</td>
                                                    <td>{item.patientData.firstName}</td>
                                                    <td>{item.patientData.phoneNumber}</td>
                                                    <td>{item.patientData.address}</td>
                                                    <td>{sex}</td>
                                                    <td className='actions'>
                                                        <button className='btn-confirm' onClick={() => this.handBtnConfirm(item)}>
                                                            <FormattedMessage id={"detail-doctor.confirm"} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                        :
                                        <tr>
                                            <td colSpan={"6"} style={{ textAlign: 'center' }}>No data</td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <ModalRemedy
                        isOpenModal={isOpenRemedyModal}
                        dataModal={dataModal}
                        clossRemedyModal={this.clossRemedyModal}
                        sendRemedy={this.sendRemedy}
                    />
                </LoadingOverlay>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        user: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
