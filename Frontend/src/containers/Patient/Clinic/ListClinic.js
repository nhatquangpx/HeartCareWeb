import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from '../../../store/actions';
import './ListClinic.scss';
import { getAllClinic } from '../../../services/userService';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from 'reactstrap';
import HomeHeader from '../../HomePage/HomeHeader';
import removeDiacritics from 'remove-diacritics'; // Thêm thư viện remove-diacritics
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';

class ListClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clinics: [],
            searchTerm: '',
        };
    }

    async componentDidMount() {
        this.fetchClinics();
    }

    fetchClinics = async () => {
        let res = await getAllClinic();
        if (res.errCode === 0 && res.data) {
            this.setState({
                clinics: res.data,
            });
        }
    }

    async componentDidUpdate(prevProps, prevState) {
        this.fetchClinics();
    }

    hanldeViewDetailClinic = (clinicId) => {
        this.props.history.push(`/detail-clinic/${clinicId.id}`);
    }

    handleSearchChange = (event) => {
        this.setState({ searchTerm: event.target.value });
    };

    render() {
        const { clinics, searchTerm } = this.state;
        const { language } = this.props;

        const filteredClinics = clinics.filter(item => {
            const name = removeDiacritics(item.name.toLowerCase()); // Loại bỏ dấu và chuyển thành chữ thường
            const searchValue = removeDiacritics(searchTerm.toLowerCase()); // Loại bỏ dấu và chuyển thành chữ thường
            return name.includes(searchValue);
        });

        return (
            <>
                <HomeHeader />
                <Container>
                    <div className="c-header">
                        <label><FormattedMessage id={"home-header.Health facilities"} /></label>
                        <div className="c-h-right">
                            <div className="btn-province"><FormattedMessage id={"detail-doctor.province"} /></div>
                            <div className="btn-search">
                                <input
                                    type='text'
                                    placeholder={language === LANGUAGES.EN ? 'Search' : 'Tìm kiếm'}
                                    value={searchTerm}
                                    onChange={this.handleSearchChange}
                                />
                                <i className="fas fa-search"></i>
                            </div>
                        </div>
                    </div>
                    <hr />

                    <div className="row">
                        {filteredClinics.length > 0 ? (
                            filteredClinics.map((item, index) => (
                                <div className='col-md-3 slider-customize' key={item.id} onClick={() => this.hanldeViewDetailClinic(item)}>
                                    <div className="bg-image img-medical-facility" style={{ backgroundImage: `url(${item.image})` }}></div>
                                    <div className='text text-center'>{item.name}</div>
                                </div>
                            ))
                        ) : (
                            <div className="no-result-text">
                                {language === LANGUAGES.VI
                                    ? `Không tìm thấy cơ sở y tế phù hợp. Vui lòng nhập các từ khóa chung chung hơn.`
                                    : `No matching medical facilities found. Please enter more general keywords.`}
                            </div>

                        )}
                    </div>
                </Container>
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(ListClinic);
