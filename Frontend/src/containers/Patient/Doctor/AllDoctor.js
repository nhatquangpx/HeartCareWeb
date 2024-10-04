import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { Container } from 'reactstrap';
import { withRouter } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { getProfileDoctorById, getDetailClinicById, getAllDoctorsService, getAllDoctorInfor } from '../../../services/userService'
import _ from 'lodash';

class AllDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailClinic: {},
            arrDoctors: []
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let allDoctors = await getAllDoctorInfor();
            let res = await getDetailClinicById({
                id: id,
            });

            if (res && res.errCode === 0 && allDoctors && allDoctors.errCode === 0) {
                let data = res.data;
                let dataDoctors = allDoctors.data;
                let arrDoctorId = [];

                if (data && !_.isEmpty(data)) {
                    let arr = data.doctorClinic;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId);
                        })
                    }
                }

                this.setState({
                    dataDetailClinic: res.data,
                    arrDoctorId: arrDoctorId,
                    arrDoctors: dataDoctors
                })
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.doctorId !== prevProps.doctorId) {
            let data = await getProfileDoctorById(this.state.arrDoctorId);
            this.setState({
                dataProfile: data,
            });
        }
    }

    detailDoctor = (id) => {
        this.props.history.push(`/detail-doctor/${id}`)
    }

    render() {
        let { arrDoctorId, dataDoctors } = this.state;

        return (
            <div className='detail-specialty-container'>
                <HomeHeader />
                <div className="description-specialty">
                    {
                        dataDoctors && !_.isEmpty(dataDoctors)
                        &&
                        <>
                            <Container>
                                {
                                    arrDoctorId && arrDoctorId.length > 0 &&
                                    arrDoctorId.map((item, index) => {
                                        return (
                                            <div className="each-doctor" key={index}>
                                                <div className="dt-content-left">
                                                    <div className="profile-doctor">
                                                        <ProfileDoctor
                                                            doctorId={item}
                                                            isShowDescriptionDoctor={true}
                                                            isShowAddressDoctor={false}
                                                        />
                                                        <div className="see-more" onClick={() => this.detailDoctor(item)}>
                                                            <FormattedMessage id={"detail-specialty.see-more"} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="dt-content-right">
                                                    <div className="doctor-schedule">
                                                        <DoctorSchedule
                                                            doctorIdFromParent={item}
                                                            key={index}
                                                        />
                                                    </div>
                                                    <div className="doctor-extraInfor">
                                                        <DoctorExtraInfor
                                                            doctorIdFromParent={item}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </Container>
                        </>
                    }
                </div>
            </div >
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllDoctor));
