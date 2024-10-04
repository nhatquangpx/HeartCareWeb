import React, { Component } from 'react';
import { connect } from "react-redux";
import './ProfileDoctor.scss'
import { getProfileDoctorById } from '../../../services/userService'
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import _ from 'lodash';
import moment from 'moment';

class ProfileDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {}
        }
    }

    async componentDidMount() {
        let data = await this.getInforDoctor(this.props.IDBacSi);
        this.setState({
            dataProfile: data
        });
    }

    getInforDoctor = async (id) => {
        let result = {};
        if (id) {
            let res = await getProfileDoctorById(id);
            if (res && res.errCode === 0) {
                result = res.data
            }
        }
        return result;
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.IDBacSi !== prevProps.IDBacSi) {
            let data = await this.getInforDoctor(this.props.IDBacSi);
            this.setState({
                dataProfile: data,
            });
        }
    }

    renderTimeBooking = (dataTime) => {
        const { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            const time = dataTime.timeTypeData;
            const date = moment.unix(+dataTime.date / 1000).locale(language === LANGUAGES.VI ? 'vi' : 'en').format('dddd - DD/MM/YYYY');
            return (
                <>
                    <div className="time">{time} | {date}</div>
                    <div className="booking-info">Miễn phí đặt lịch</div>
                </>
            );
        }
        return null;
    };

    render() {
        const { dataProfile } = this.state;
        const { language, isShowDescriptionDoctor, isShowAddressDoctor } = this.props;

        let nameVi = '', nameEn = '';
        if (dataProfile && dataProfile.hoten) {
            nameVi = `${dataProfile.HocVan} | ${dataProfile.hoten}`;
            nameEn = `${dataProfile.HocVan} | ${dataProfile.hoten}`;
        }

        return (
            <div className="profile-doctor">
                <div className="intro-doctor">
                    <div className="content-left">
                        <div className="img" style={{ backgroundImage: `url(${dataProfile && dataProfile.image ? dataProfile.image : ''})` }}></div>
                    </div>
                    <div className="content-right">
                        <div className="title-doctor">
                            {language === LANGUAGES.VI ? nameVi : nameEn}
                        </div>
                        <div className="content-doctor">
                            {isShowDescriptionDoctor ? (
                                <p>{dataProfile.MoTa}</p>
                            ) : (
                                <>
                                    <div className="time-booking">
                                        {this.renderTimeBooking(dataProfile.dataTime)}
                                    </div>
                                </>
                            )}
                        </div>
                        {isShowAddressDoctor && dataProfile && dataProfile.bacsi_khoa && (
                            <div className="address-price">
                                {dataProfile.bacsi_khoa.map((item, index) => (
                                    <div key={index} className="address-item">
                                        <label><FormattedMessage id="detail-doctor.department" />:</label>
                                        <p>{item.khoa.TenKhoa}</p>
                                        <label><FormattedMessage id="detail-doctor.position" />:</label>
                                        <p>{item.ChucVu}</p>
                                    </div>
                                ))}
                                <div className="address-item">
                                    <label><FormattedMessage id="detail-doctor.address" />:</label>
                                    <p>{dataProfile.Doctor_Infor ? dataProfile.khoa.TenKhoa : ''}</p>
                                </div>
                                {/* <div className="address-item">
                                    <label><FormattedMessage id="detail-doctor.price" />:</label>
                                    <p>{language === LANGUAGES.VI ? `${dataProfile.Doctor_Infor.priceTypeData.valueVi} VND` : `${dataProfile.Doctor_Infor.priceTypeData.valueEn} $`}</p>
                                </div> */}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    language: state.app.language
});

export default connect(mapStateToProps)(ProfileDoctor);
