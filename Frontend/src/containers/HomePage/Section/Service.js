import React from 'react';
import './Service.scss';
import Icon_tu_van_dinh_duong from '../../../assets/service/Icon_tu_van_dinh_duong.png';
import Icon_goi_phau_thuat from '../../../assets/service/Icon_goi_phau_thuat.png';
import Icon_dien_tam_do from '../../../assets/service/Icon_dien_tam_do.png';
import Icon_kham_tong_quat from '../../../assets/service/Icon_kham_tong_quat.png';
import Icon_kham_tim_co_ban from '../../../assets/service/Icon_kham_tim_co_ban.png';
import Icon_xet_nghiem from '../../../assets/service/Icon_xet_nghiem_y_hoc.png';
import Icon_chup_mrt from '../../../assets/service/Icon_chup_mrt.png';
import Icon_chup_xquang from '../../../assets/service/Icon_chup_xquang.png';
import Icon_hoi_suc from '../../../assets/service/Icon_hoi_suc.png';
import Icon_tu_van_tim_mach_tre from '../../../assets/service/Icon_tu_van_tim_mach_tre.png';

const Service = () => {
    return (
        <div className="service">
            <h1>Dịch vụ</h1>
            <div className="service-grid">
                <div className="service-item">
                    <div className="icon-wrapper">
                        <img src={Icon_dien_tam_do} alt="Điệm tâm đồ" />
                    </div>
                    <p>Điện tâm đồ</p>
                </div>
                <div className="service-item">
                    <div className="icon-wrapper">
                        <img src={Icon_kham_tim_co_ban} alt="Khám tim cơ bản" />
                    </div>
                    <p>Khám tim cơ bản</p>
                </div>
                <div className="service-item">
                    <div className="icon-wrapper">
                        <img src={Icon_kham_tong_quat} alt="Khám tổng quát" />
                    </div>
                    <p>Khám tổng quát</p>
                </div>
                <div className="service-item">
                    <div className="icon-wrapper">
                        <img src={Icon_goi_phau_thuat} alt="Gói phẫu thuật" />
                    </div>
                    <p>Gói phẫu thuật</p>
                </div>
                <div className="service-item">
                    <div className="icon-wrapper">
                        <img src={Icon_xet_nghiem} alt="Xét nghiệm y học" />
                    </div>
                    <p>Xét nghiệm y học</p>
                </div>
                <div className="service-item">
                    <div className="icon-wrapper">
                        <img src={Icon_chup_mrt} alt="Chụp MRT" />
                    </div>
                    <p>Chụp MRT</p>
                </div>
                <div className="service-item">
                    <div className="icon-wrapper">
                        <img src={Icon_chup_xquang} alt="Chụp X quang" />
                    </div>
                    <p>Chụp X-quang</p>
                </div>
                <div className="service-item">
                    <div className="icon-wrapper">
                        <img src={Icon_hoi_suc} alt="Hồi sức" />
                    </div>
                    <p>Hồi sức</p>
                </div>
                <div className="service-item">
                    <div className="icon-wrapper">
                        <img src= {Icon_tu_van_dinh_duong} alt="Tư vấn dinh dưỡng" />
                    </div>
                    <p>Tư vấn dinh dưỡng</p>
                </div>
                <div className="service-item">
                    <div className="icon-wrapper">
                        <img src={Icon_tu_van_tim_mach_tre} alt="Tư vấn tim mạch trẻ" />
                    </div>
                    <p>Tư vấn tim mạch trẻ nhỏ</p>
                </div>
            </div>
        </div>
    );
};

export default Service;