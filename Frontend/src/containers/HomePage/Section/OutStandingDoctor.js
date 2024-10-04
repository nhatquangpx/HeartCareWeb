import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
import { withRouter } from 'react-router';

class OutStandingDoctor extends Component {
    // Khởi tạo state arrDoctors để lưu danh sách bác sĩ
    constructor(props) {
        super(props);
        this.state = {
            arrDoctors: [],
        }
    }

    // loadTopDoctors: để tại danh sách bác sĩ nổi bật khi component được gắn vào DOM
    componentDidMount() {
        this.props.loadTopDoctors();
    }

    // componentDidUpdate: Cập nhật state arrDoctors khi nhận được danh sách bác sĩ mới từ props
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
            this.setState({
                arrDoctors: this.props.topDoctorsRedux
            });
        }
    }

    // hanldeViewDetailDoctor: để đi đến trang chi tiết bác sĩ khi nhấn vào bác sĩ
    hanldeViewDetailDoctor = (doctor) => {
        this.props.history.push(`/detail-doctor/${doctor.IDBacSi}`)
    }

    render() {
        let arrDoctors = this.state.arrDoctors;
        console.log('data', arrDoctors);
        let { language } = this.props;
        return (
            <div className="section-share section-outstandingdoctor">
                <div className="section-container">
                    <div className="section-header">
                        <span>Bác sĩ nổi bật</span>
                        <button>Xem thêm</button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            {arrDoctors && arrDoctors.length > 0 &&
                                arrDoctors.map((item, index) => {
                                    let imageBase64 = '';
                                    if (item.image) {
                                        imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                                    }
                                    let name = `${item.lastName} ${item.firstName}`;
                                    return (
                                        <div className='slider-customize' key={index}>
                                            <div className='slider-wrapper wrapper-doctor' onClick={() => this.hanldeViewDetailDoctor(item)}>
                                                <div className="bg-image img-outstandingdoctor"
                                                    style={{ backgroundImage: `url(${imageBase64})` }}>
                                                </div>
                                                <div className='text text-doctor'>
                                                    <div className="">{item.hoten}</div>
                                                    <div className="">{item.bacsi_khoa.khoa.TenKhoa}</div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                        </Slider>
                    </div>
                </div>
            </div>
        )
    }
}

// Lấy dữ liệu từ Redux store và chuyển vào props của component
const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        topDoctorsRedux: state.admin.topDoctors,
        language: state.app.language
    };
};

// Định nghĩa các hàm để dispatch hành động Redux
const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctors: () => dispatch(actions.fetchTopDoctor())
    };
};

// Kết nối component với React Router để có thể sử dụng this.prop.history
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor));
