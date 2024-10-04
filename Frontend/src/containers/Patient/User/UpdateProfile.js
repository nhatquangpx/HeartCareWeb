import React, { useState } from 'react';
import './UpdateProfile.scss';
import UserHeader from './User_header';

const UpdateProfile = () => {
    const [messageVisible, setMessageVisible] = useState(false);

    const handleClick = () => {
        console.log('Update button clicked'); // Thêm dòng này để kiểm tra
        setMessageVisible(true);
        setTimeout(() => {
            setMessageVisible(false);
        }, 2500);
    };

    return (
        <>
        <UserHeader />
        <div className="update-profile__container">
            <h1>Cập nhật thông tin người dùng</h1>
            <form>
                <div className="update-profile__form-group">
                    <label htmlFor="address">Họ & tên</label>
                    <input type="text" name="name" className="update-profile__input-control" id="input-name" placeholder="Nhập họ & tên ở đây..." />
                </div>
                <div className="update-profile__form-group">
                    <label htmlFor="date">Ngày/Tháng/Năm</label>
                    <input type="date" name="date" className="update-profile__input-control" id="input-date" />
                </div>
                <div className="update-profile__form-group">
                    <label htmlFor="address">Địa chỉ</label>
                    <input type="text" name="address" className="update-profile__input-control" id="input-address" placeholder="Địa chỉ..." />
                </div>
                <div className="update-profile__form-group">
                    <label htmlFor="phone-number">Số điện thoại</label>
                    <input type="text" name="phone-number" className="update-profile__input-control" id="input-phone-number" placeholder="Số điện thoại..." pattern="\d*" title="Vui lòng chỉ nhập số" />
                </div>
                <div className="update-profile__form-group">
                    <label htmlFor="gender">Giới tính</label>
                    <select id="input-gender" name="gender" className="update-profile__input-control" required>
                        <option value="" disabled selected></option>
                        <option value="male">Nam</option>
                        <option value="female">Nữ</option>
                    </select>
                </div>
                <div className="update-profile__form-group">
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" className="update-profile__input-control" id="input-email" placeholder="Email..." />
                </div>
                <button type="button" className="update-profile__btn" onClick={handleClick}>Update</button>
            </form>
            {messageVisible && (
                <div id="message" className="update-profile__message-container">
                    <div className="update-profile__message">
                        <i className="fa-regular fa-circle-check"></i>
                        <span className="update-profile__mes"> Cập nhật thông tin thành công</span>
                        <span className="update-profile__timeline"></span>
                    </div>
                </div>
            )}
        </div>
        </>
    );
};

export default UpdateProfile;