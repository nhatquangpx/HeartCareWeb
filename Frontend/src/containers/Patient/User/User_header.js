import React from 'react';
import { useHistory } from 'react-router-dom';
import './User_header.scss';

const UserHeader = () => {
    const history = useHistory();

    const handleLogoClick = () => {
        history.push('/home');
    };

    const handleHomeClick = () => {
        history.push('/home');
    };

    const handleScheduleClick = () => {
        history.push('/user-schedule');
    };

    return (
        <header>
            <div className="user-header__container">
                <div className="user-header__nav">
                    <div onClick={handleLogoClick} className="user-header__logo"></div>
                    <ul className="user-header__nav-bar">
                        <li><a href="#" onClick={handleHomeClick}>Trang chủ</a></li>
                        <li><a href="#" onClick={handleScheduleClick}>Lịch hẹn</a></li>
                        <li><a href="#">Đặt lịch</a></li>
                        <li><a href="#">Hồ sơ</a></li>
                    </ul>
                </div>
            </div>
        </header>
    );
};

export default UserHeader;