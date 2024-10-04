import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import { withRouter } from 'react-router';

// Import ảnh
import KhoaCapCuu from '../../../assets/Speciality/Khoa_cap_cuu.jpg';
import KhoaChanDoanHinhAnh from '../../../assets/Speciality/Khoa_chan_doan_hinh_anh.jpg';
import KhoaDinhDuong from '../../../assets/Speciality/Khoa_dinh_duong.jpg';
import KhoaHoiSucTichCuc from '../../../assets/Speciality/Khoa_hoi_suc_tich_cuc.jpg';
import KhoaNgoaiTimMach from '../../../assets/Speciality/Khoa_ngoai_tim_mach.jpg';
import KhoaNhi from '../../../assets/Speciality/Khoa_nhi.jpg';
import KhoaNoiTimMach from '../../../assets/Speciality/Khoa_noi_tim_mach.jpg';
import KhoaPhucHoiChucNang from '../../../assets/Speciality/Khoa_phuc_hoi_chuc_nang.jpg';
import KhoaSinhHoaTimMach from '../../../assets/Speciality/Khoa_sinh_hoa_tim_mach.jpg';
import KhoaTimMachCanThiep from '../../../assets/Speciality/Khoa_tim_mach_can_thiep.jpg';

class Speciality extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSpecialty: [
                { id: 1, name: 'Khoa cấp cứu', image: KhoaCapCuu },
                { id: 2, name: 'Khoa chẩn đoán hình ảnh', image: KhoaChanDoanHinhAnh },
                { id: 3, name: 'Khoa dinh dưỡng', image: KhoaDinhDuong },
                { id: 4, name: 'Khoa hồi sức tích cực', image: KhoaHoiSucTichCuc },
                { id: 5, name: 'Khoa ngoại tim mạch', image: KhoaNgoaiTimMach },
                { id: 6, name: 'Khoa nhi', image: KhoaNhi },
                { id: 7, name: 'Khoa nội tim mạch', image: KhoaNoiTimMach },
                { id: 8, name: 'Khoa phục hồi chức năng', image: KhoaPhucHoiChucNang },
                { id: 9, name: 'Khoa sinh hóa tim mạch', image: KhoaSinhHoaTimMach },
                { id: 10, name: 'Khoa tim mạch can thiệp', image: KhoaTimMachCanThiep }
            ]
        }
    }

    handleViewDetailSpecialty = (item) => {
        if (this.props.history) {
            this.props.history.push(`/detail-specialty/${item.id}`)
        }
    }

    render() {
        let { dataSpecialty } = this.state;

        return (
            <div className="section-share section-speciality">
                <div className="section-container">
                    <div className="section-header">
                        <span>Chuyên khoa</span>
                        <button>Xem thêm</button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            {dataSpecialty && dataSpecialty.length > 0 &&
                                dataSpecialty.map((item, index) => {
                                    return (
                                        <div className='slider-customize'>
                                            <div className='slider-wrapper wrapper-speciality'  key={index}
                                            onClick={() => this.handleViewDetailSpecialty(item)}>
                                                <div className="bg-image img-speciality"
                                                    style={{ backgroundImage: `url(${item.image})` }}></div>
                                                <div className='text text-speciality'>{item.name}</div>
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

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Speciality));
