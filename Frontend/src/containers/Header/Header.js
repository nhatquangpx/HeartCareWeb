import React, { Component } from 'react';  
import { connect } from 'react-redux';
import _ from 'lodash'; 
import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import './Header.scss';
import { LANGUAGES } from '../../utils';
import { FormattedMessage } from 'react-intl';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuApp: [],
        }
    }

    handleChangeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    }

    componentDidMount() {
        this.updateMenu();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.userInfo !== this.props.userInfo) {
            this.updateMenu();
        }
    }

    updateMenu = () => {
        let { userInfo } = this.props;
        let menu = [];
        if (userInfo && !_.isEmpty(userInfo)) {
            let userType = userInfo.userType; // Use userType instead of roleId
            if (userType === 'Admin') {
                menu = adminMenu;
            } else if (userType === 'BacSi') {
                menu = doctorMenu;
            }
        }
        this.setState({
            menuApp: menu,
        });
    }

    render() {
        const { processLogout, language, userInfo } = this.props;

        return (
            <div className="header-container">
                <div className="header-tabs-container">
                    <Navigator menus={this.state.menuApp} />
                </div>

                <div className="languages">
                    <span className='welcome'><FormattedMessage id="home-header.welcome" />,<span>&nbsp;</span>
                        {userInfo.firstName ? userInfo.firstName : ' '}!</span>
                    <span className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}
                        onClick={() => this.handleChangeLanguage(LANGUAGES.VI)}>
                        VN
                    </span>
                    <span className={language === LANGUAGES.EN ? "language-en active" : "language-en"}
                        onClick={() => this.handleChangeLanguage(LANGUAGES.EN)}>
                        EN
                    </span>

                    <div className="btn btn-logout" onClick={processLogout} title='Log out'>
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>
            </div>
        );
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
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: language => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);