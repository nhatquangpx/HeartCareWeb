import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils';
import { changeLanguageApp } from '../../store/actions/appActions';
import { withRouter } from 'react-router';
import { getAllSpecialty } from '../../services/userService';
import { processLogout } from '../../store/actions/userActions'; // Import processLogout action

class HomeHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listSpecialties: [],
            isSearchActive: false,
            placeholderIndex: 0,
        };
    }

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    }

    async componentDidMount() {
        this.fetchDataSpecialties();
        this.placeholderInterval = setInterval(this.updatePlaceholder, 3000);
    }

    componentWillUnmount() {
        clearInterval(this.placeholderInterval);
    }

    fetchDataSpecialties = async () => {
        let res = await getAllSpecialty();
        if (res && res.errCode === 0) {
            this.setState({ listSpecialties: res.data });
        }
    }

    toggleSearchList = () => {
        this.setState(prevState => ({ isSearchActive: !prevState.isSearchActive }));
    }

    handleInputBlur = () => {
        setTimeout(() => {
            this.setState({ isSearchActive: false });
        }, 200);
    }

    handleRedirectSpecialty = (item) => {
        this.props.history.push(`/detail-specialty/${item.IDKhoa}`);
    }

    updatePlaceholder = () => {
        const { listSpecialties, placeholderIndex } = this.state;
        if (listSpecialties.length > 0) {
            const newIndex = (placeholderIndex + 1) % listSpecialties.length;
            this.setState({ placeholderIndex: newIndex });
        }
    }

    handleLogout = () => {
        this.props.processLogout(); // Dispatch processLogout action
        this.props.history.push('/home'); // Redirect to home page after logout
    }

    render() {
        let language = this.props.language;
        let { listSpecialties, isSearchActive, placeholderIndex } = this.state;
        let placeholderSpecialty =
            listSpecialties.length > 0 ? listSpecialties[placeholderIndex].name : '';

        return (
            <>
                <div className="home-header-container">
                    <div className="home-header-content">
                        <div className="one-content">
                            <div onClick={() => this.props.history.push(`/home`)} className="header-logo"></div>
                        </div>
                        <div className="two-content">
                            <div className="child-content">
                                <div onClick={() => this.props.history.push(`/specialty`)}><b><FormattedMessage id="home-header.speciality" /></b></div>
                            </div>
                            <div className="child-content">
                                <div onClick={() => this.props.history.push(`/list-doctor`)}><b><FormattedMessage id="home-header.Doctor" /></b></div>
                            </div>
                            <div className="child-content">
                                <div><b><FormattedMessage id="home-header.Checkup package" /></b></div>
                            </div>
                            <div className='child-content'>
                                <div onClick={() => this.props.history.push(`/predict`)}><b>Chẩn đoán</b></div>
                            </div>
                            <div className='child-content'>
                                <div onClick={() => this.props.history.push(`/update-profile`)}><b>Cá nhân</b></div>
                            </div>
                        </div>

                        <div className='three-content'>
                            <div className="search">
                                <i className="fas fa-search"></i>
                                <input
                                    type="text"
                                    placeholder={placeholderSpecialty || 'Tìm chuyên khoa'}
                                    onFocus={this.toggleSearchList}
                                    onBlur={this.handleInputBlur}
                                />
                                <div className="specialty-search-list">
                                    {isSearchActive && listSpecialties && listSpecialties.length > 0
                                        && listSpecialties.map((item, i) => {
                                            return (
                                                <div
                                                    className="list-specialty"
                                                    key={item.IDKhoa}
                                                    onClick={() => this.handleRedirectSpecialty(item)}
                                                >
                                                    {item.TenKhoa}
                                                </div>
                                            )
                                        }
                                        )
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="four-content">
                            <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'} >
                                <span onClick={() => { this.changeLanguage(LANGUAGES.VI) }}>
                                    VN
                                </span>
                            </div>
                            <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'} >
                                <span onClick={() => { this.changeLanguage(LANGUAGES.EN) }}>
                                    EN
                                </span>
                            </div>
                            {this.props.isLoggedIn ? (
                                <div className="homepage_signin" onClick={this.handleLogout}>
                                    Đăng xuất
                                </div>
                            ) : (
                                <div className="homepage_signin" onClick={() => this.props.history.push('/login')}>
                                    Đăng nhập
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: language => dispatch(changeLanguageApp(language)),
        processLogout: () => dispatch(processLogout()) // Map processLogout action to props
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));