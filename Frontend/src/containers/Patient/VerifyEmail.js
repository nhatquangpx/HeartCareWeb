import React, { Component } from 'react';
import { connect } from "react-redux";
import { postVerifyBookAppointment } from '../../services/userService';
import HomeHeader from '../HomePage/HomeHeader';
import './VerifyEmail.scss';
import { withRouter } from 'react-router-dom';

class VerifyEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusVerify: false,
            errCode: 0
        }
    }

    async componentDidMount() {
        if (this.props.location.search && this.props.location) {
            let urlParams = new URLSearchParams(this.props.location.search);
            let token = urlParams.get('token');
            let doctorId = urlParams.get('doctorId');
            let res = await postVerifyBookAppointment({
                token: token,
                doctorId: doctorId
            })
            if (res && res.errCode === 0) {
                this.setState({
                    statusVerify: true,
                    errCode: res.errCode
                })
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() {
        let { statusVerify, errCode } = this.state;
        let { language } = this.props;

        return (
            <>
                <HomeHeader />
                {
                    statusVerify === false ?
                        <div className="">Loading data...</div>
                        :
                        <div>
                            {errCode === 0 ?
                                <div className="message-success">
                                    <p className='success'>Đặt lịch khám bệnh thành công.</p>
                                    <p>Vui lòng đến khám đúng giờ để chúng tôi hỗ trợ tốt nhất cho bạn.</p>
                                    <p>Xin cảm ơn!</p>
                                </div>
                                :
                                <div className="message-fail">
                                    <p className='fail'>Đặt lịch thất bại!</p>
                                    <a className='home' onClick={() => this.props.history.push(`/home`)}>Quay lại trang chủ</a>
                                </div>
                            }
                        </div>
                }
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VerifyEmail));
