import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from '../../../store/actions';
import './ListDoctor.scss';
import { getAllDoctorsService } from '../../../services/userService';
import 'react-toastify/dist/ReactToastify.css';
import { withRouter } from 'react-router';
import { LANGUAGES } from '../../../utils';
import removeDiacritics from 'remove-diacritics';
import { FormattedMessage } from 'react-intl';

class ListDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doctors: [],
            searchTerm: '',
            hideTitle: false,
        };
    }

    async componentDidMount() {
        this.fetchDoctors();
    }

    fetchDoctors = async () => {
        let res = await getAllDoctorsService();
        console.log('Response from API:', res); // Kiểm tra response từ API
        if (res.errCode === 0 && res.data) {
            const formattedDoctors = res.data.map(item => ({
                id: item.IDBacSi, // Đảm bảo ID phù hợp với đối tượng của bạn
                hoten: item.hoten,
                image: item.image || 'default-image-url',
                bacsi_khoa: [{
                    ChucVu: item.bacsi_khoa.ChucVu,
                    khoa: {
                        IDKhoa: item.bacsi_khoa.khoa.IDKhoa,
                        tenKhoa: item.bacsi_khoa.khoa.TenKhoa,
                    },
                }],
            }));
    
            this.setState({
                doctors: formattedDoctors,
            }, () => {
                console.log('Doctors in state:', this.state.doctors); // Log để kiểm tra dữ liệu sau khi setState
            });
        }
    }
    

    async componentDidUpdate(prevProps, prevState) {
        if (prevState.searchTerm !== this.state.searchTerm) {
            const { doctors, searchTerm } = this.state;
            const filteredDoctors = doctors.filter(item => {
                const hoten = removeDiacritics(item.hoten).toLowerCase();
                const searchValue = removeDiacritics(searchTerm).toLowerCase();
                return hoten.includes(searchValue);
            });

            this.setState({
                hideTitle: filteredDoctors.length === 0,
            });
        }
    }

    handleRedirectDetailDoctor = (item) => {
        if (this.props.history) {
            this.props.history.push(`/detail-doctor/${item.id}`);
        }
    }

    handleSearchChange = (event) => {
        this.setState({ searchTerm: event.target.value });
    };

    render() {
        const { doctors, searchTerm, hideTitle } = this.state;
    
        if (!doctors || doctors.length === 0) {
            return <div>Loading...</div>;
        }
    
        const filteredDoctors = doctors.filter(item => {
            const hoten = removeDiacritics(item.hoten).toLowerCase();
            const searchValue = removeDiacritics(searchTerm).toLowerCase();
            return hoten.includes(searchValue);
        });
    
        return (
            <div className='d-container'>
                <div className='d-body'>
                    <div className="d-header">
                        <i onClick={() => this.props.history.push(`/home`)} className="fas fa-arrow-left"></i>
                        <FormattedMessage id={"home-header.Doctor"} />
                    </div>
                    <div className="search-doctor">
                        <input
                            type="text"
                            placeholder='Search doctors / Tìm kiếm bác sĩ'
                            value={searchTerm}
                            onChange={this.handleSearchChange}
                        />
                    </div>
                    <div className="title-name" style={{ display: hideTitle ? 'none' : 'block' }}>
                        <FormattedMessage id={"detail-doctor.outstanding-doctor"} />
                    </div>
                    {filteredDoctors.length > 0 ? (
                        filteredDoctors.map(item => {
                            const doctorPosition = item.bacsi_khoa[0].ChucVu; // Lấy ChucVu từ mảng bacsi_khoa
                            const doctorName = item.hoten;
    
                            return (
                                <div className="content" key={item.id} onClick={() => this.handleRedirectDetailDoctor(item)}>
                                    <div className="i-img" style={{ backgroundImage: `url(${item.image})` }}></div>
                                    <div className="content-right">
                                        <label className="">{doctorPosition} || {doctorName}</label>
                                        <label className='clinic-name'>
                                            {item.bacsi_khoa[0].khoa.tenKhoa}
                                        </label>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="no-result-text">
                            {`Không tìm thấy bác sĩ "${searchTerm}". Vui lòng nhập các từ khóa chung hơn.`}
                        </div>
                    )}
                </div>
            </div>
        );
    }
    
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allRequireDoctorInfor: state.admin.allRequireDoctorInfor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListDoctor));
