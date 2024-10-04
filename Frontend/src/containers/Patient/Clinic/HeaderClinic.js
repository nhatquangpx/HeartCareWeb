import React, { Component } from 'react';
import { connect } from "react-redux";
import './HeaderClinic.scss';
import { getClinicById } from '../../../services/userService';

class HeaderClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataClinics: [],
        }
    }

    async componentDidMount() {
        this.fetchDataClinic();
    }

    fetchDataClinic = async () => {
        let id = this.props.getIdFromParent;
        let res = await getClinicById(id);
        if (res.errCode === 0 && res.data) {
            this.setState({
                dataClinics: res.data,
            });
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() {
        let { dataClinics } = this.state;
        console.log(dataClinics);

        return (
            <>
                <div className='container-header-clinic'>
                    <div className=" img-header"></div>
                    <div className="nav">
                        <div className="top">
                            {dataClinics && (
                                <>
                                    <img className="img" src={dataClinics.image} alt="Clinic Image" />
                                    <div className="top-text">
                                        <label className='text-name'>{dataClinics.name}</label>
                                        <label className='text-address'>{dataClinics.address}</label>
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="bot">
                            <p>giới thiệu</p>
                            <p>thế mạnh chuyên môn</p>
                            <p>trang thiết bị</p>
                            <p>vị trí</p>
                            <p>quy trình khám</p>
                        </div>
                    </div>
                    <div className="des">
                        <div className="des-top">
                            BookingCare là Nền tảng Y tế chăm sóc sức khỏe toàn diện hàng đầu Việt Nam kết nối người dùng với trên 200 bệnh viện - phòng khám uy tín, hơn 1,500 bác sĩ chuyên khoa giỏi và hàng nghìn dịch vụ, sản phẩm y tế chất lượng cao.
                        </div>
                    </div>
                </div>

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

export default connect(mapStateToProps, mapDispatchToProps)(HeaderClinic);
