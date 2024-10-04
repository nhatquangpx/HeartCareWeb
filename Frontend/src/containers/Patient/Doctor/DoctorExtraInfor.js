import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../../utils';
import './DoctorExtraInfor.scss'
import { getExtraInforDoctorByIdService } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
import NumberFormat from 'react-number-format';

class DoctorExtraInfor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfor: false,
            extraInfor: {},
        }
    }

    async componentDidMount() {
        if (this.props.doctorIdFromParent) {
            let res = await getExtraInforDoctorByIdService(this.props.doctorIdFromParent);
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfor: res.data
                })
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            let res = await getExtraInforDoctorByIdService(this.props.doctorIdFromParent);
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfor: res.data
                })
            }
        }
    }

    showHideDetailInfor = (status) => {
        this.setState({
            isShowDetailInfor: status
        })
    }

    render() {
        let { isShowDetailInfor, extraInfor } = this.state;
        let language = this.props.language

        return (
            <>
                <div className="doctor-extra-infor-container">
                    <div className="content-up">
                        <div className="text-address"><FormattedMessage id={"detail-doctor.address"} /></div>
                        <div className="name-clinic">
                            {extraInfor && extraInfor.nameClinic ? extraInfor.nameClinic : ''}
                        </div>
                        <div className="detail-address">
                            {extraInfor && extraInfor.addressClinic ? extraInfor.addressClinic : ''}
                        </div>
                    </div>
                    <div className="content-down">
                        {isShowDetailInfor === false &&
                            <div className='short-infor'>
                                <label><FormattedMessage id={"detail-doctor.price"} />:</label>
                                {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.VI
                                    && <NumberFormat
                                        className={'currency'}
                                        value={extraInfor.priceTypeData.valueVi}
                                        displayType={'text'}
                                        thousandsSeparator={true}
                                        suffix={'VND.'}
                                    />
                                }
                                {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.EN
                                    && <NumberFormat
                                        className={'currency'}
                                        value={extraInfor.priceTypeData.valueEn}
                                        displayType={'text'}
                                        thousandsSeparator={true}
                                        suffix={'$.'}
                                    />
                                }
                                (<span onClick={() => this.showHideDetailInfor(true)}>
                                    <FormattedMessage id={"detail-doctor.detail"} />
                                </span>)
                            </div>
                        }
                        {isShowDetailInfor === true &&
                            <>
                                <div className='title-price'>
                                    <FormattedMessage id={"detail-doctor.price"} />
                                </div>
                                <div className="detail-infor">
                                    <div className="price">
                                        <span className='left'><FormattedMessage id={"detail-doctor.price"} /></span>
                                        <span className='right'>
                                            {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.VI
                                                && <NumberFormat
                                                    className={'currency'}
                                                    value={extraInfor.priceTypeData.valueVi}
                                                    displayType={'text'}
                                                    thousandsSeparator={true}
                                                    suffix={'VND'}
                                                />
                                            }
                                            {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.EN
                                                && <NumberFormat
                                                    className={'currency'}
                                                    value={extraInfor.priceTypeData.valueEn}
                                                    displayType={'text'}
                                                    thousandsSeparator={true}
                                                    suffix={'$'}
                                                />
                                            }
                                        </span>
                                    </div>
                                    <div className="note">
                                        {extraInfor && extraInfor.note ? extraInfor.note : ''}
                                    </div>
                                </div>
                                <div className="payment">
                                    {extraInfor && extraInfor.paymentTypeData && language === LANGUAGES.VI
                                        ? extraInfor.paymentTypeData.valueVi : ''}
                                    {extraInfor && extraInfor.paymentTypeData && language === LANGUAGES.EN
                                        ? extraInfor.paymentTypeData.valueEn : ''}
                                </div>
                                <div className="hide-price">
                                    <span onClick={() => this.showHideDetailInfor(false)}>
                                        <FormattedMessage id={"detail-doctor.hide"} />
                                    </span>
                                </div>
                            </>
                        }
                    </div>
                </div>
            </ >
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
