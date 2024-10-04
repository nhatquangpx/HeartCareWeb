import React, { useState } from 'react';
import UserHeader from './User_header';
import './UserSchedule.scss';

const UserSchedule = () => {
    const [isCancel, setIsCancel] = useState(false);
    const [showModel, setShowModel] = useState(false);
    const [showModel2, setShowModel2] = useState(false);

    const handleCancelClick = () => {
        setShowModel(true);
    };

    const handleNotSureClick = () => {
        setShowModel(false);
    };

    const handleSureClick = () => {
        setShowModel(false);
        setShowModel2(true);
        setTimeout(() => {
            setShowModel2(false);
        }, 1000);
        setIsCancel(true);
    };

    return (
        <div>
            <UserHeader />
            <section id="content">
                <div className="user-schedule__container">
                    <div className="user-schedule__appointment-schedule">
                        <form action="">
                            <div className="user-schedule__form-group-schedule">
                                <label htmlFor="schedule">Lịch hẹn của bạn</label>
                                <input type="text" name="schedule" id="input-schedule" className="user-schedule__input-schedule" placeholder="Nhập thông tin" />
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </div>
                        </form>
                    </div>

                    <div className="user-schedule__box-container">
                        <div className="user-schedule__box">
                            <div className="user-schedule__box-left">
                                <div className="user-schedule__avt">
                                    <img src="./img/doctor1.jpg" alt="Bệnh nhân" />
                                    <span><strong>Nguyễn Văn A</strong></span>
                                </div>
                                <div className="user-schedule__time">
                                    <p><i className="fa-regular fa-clock"></i> : <span>12:10 CH</span></p>
                                    <p><i className="fa-solid fa-calendar-days"></i> : <span>15/06/2024</span></p>
                                </div>
                            </div>
                            <div className="user-schedule__box-right">
                                <div className="user-schedule__info">
                                    <p><strong>Chuyên khoa: </strong>Tim</p>
                                    <p><strong>Bác sĩ: </strong>Nguyễn Văn B</p>
                                    <p><strong>Địa điểm: </strong>Hà Nội</p>
                                    <p><strong>Lý do khám: </strong>Đau ngực</p>
                                    <p><strong>Trạng thái: </strong><span className="user-schedule__status-booking">{isCancel ? 'Đã huỷ' : 'Đã đặt thành công'}</span></p>
                                </div>
                                <div className="user-schedule__cancel">
                                    <button className="user-schedule__btn-cancel" onClick={handleCancelClick}>Hủy lịch</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {showModel && (
                <div className="user-schedule__model show">
                    <div className="user-schedule__box-cancel">
                    <p>Bạn có chắc chắn sẽ hủy lịch không?</p>
                        <div className="user-schedule__sure-or-not-sure">
                            <button className="user-schedule__btn-sure" onClick={handleSureClick}>Có</button>
                            <button className="user-schedule__btn-not-sure" onClick={handleNotSureClick}>Không</button>
                        </div>
                    </div>
                </div>
            )}

            {showModel2 && (
                <div className="user-schedule__model_2 show2">
                    <div className="user-schedule__box-cancel-2">
                        <p>Bạn đã hủy lịch</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserSchedule;
