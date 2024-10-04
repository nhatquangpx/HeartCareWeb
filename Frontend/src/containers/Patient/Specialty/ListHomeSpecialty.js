import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from '../../../store/actions';
import './ListHomeSpecialty.scss';
import { getAllSpecialty } from '../../../services/userService';
import 'react-toastify/dist/ReactToastify.css';
import { withRouter } from 'react-router';
import { LANGUAGES } from '../../../utils';
import removeDiacritics from 'remove-diacritics';
import { FormattedMessage } from 'react-intl';

class ListHomeSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            specialties: [],
            searchTerm: '',
        };
    }

    componentDidMount() {
        this.fetchSpecialties();
    }

    fetchSpecialties = async () => {
        let res = await getAllSpecialty();
        if (res.errCode === 0 && res.data) {
            this.setState({
                specialties: res.data,
            });
        }
    }

    // async componentDidUpdate(prevProps, prevState) {
    //     this.fetchSpecialties();
    // }

    handleRedirectDetailSpecialty = (item) => {
        if (this.props.history) {
            this.props.history.push(`/detail-specialty/${item.IDKhoa}`)
        }
    }

    handleSearchChange = (event) => {
        this.setState({ searchTerm: event.target.value });
    };

    render() {
        const { specialties, searchTerm } = this.state;
        const { language } = this.props;

        const filteredSpecialties = specialties.filter(item => {
            if (item.TenKhoa) {
                const name = removeDiacritics(item.TenKhoa.toLowerCase()); // Remove diacritics and convert to lowercase
                const searchValue = removeDiacritics(searchTerm.toLowerCase()); // Remove diacritics and convert to lowercase
                return name.includes(searchValue);
            }
            return false; // If item.name is undefined or null, filter it out
        });

        return (
            <div className='s-container'>
                <div className='s-body'>
                    <div className="s-header">
                        <i onClick={() => this.props.history.push(`/home`)} className="fas fa-arrow-left"></i>
                        <FormattedMessage id={"home-header.speciality"} />
                    </div>
                    <div className="search-specialty">
                        <input
                            type="text"
                            placeholder={language === LANGUAGES.EN ? 'Search specialties' : 'Tìm kiếm chuyên khoa'}
                            value={searchTerm}
                            onChange={this.handleSearchChange}
                        />
                    </div>
                    {filteredSpecialties.length > 0 ? 
                    (
                        filteredSpecialties.map((item, index) => (
                            <div className="content" key={item.IDKhoa}>
                                <div className='i-img' onClick={() => this.handleRedirectDetailSpecialty(item)}>
                                    {item.image && (
                                        <img className='img' src={item.image} alt={item.TenKhoa} />
                                    )}
                                </div>
                                <div onClick={() => this.handleRedirectDetailSpecialty(item)}
                                    className='i-name'>{item.TenKhoa}</div>
                            </div>
                        ))) : (
                        <div className="no-result-text">
                            {language === LANGUAGES.EN
                                ? "No matching specialties found. Please enter more general keywords."
                                : "Không tìm thấy chuyên khoa phù hợp. Vui lòng nhập các từ khóa chung chung hơn."}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListHomeSpecialty));
