import React, { useState } from 'react';
import HomeHeader from '../../HomePage/HomeHeader';
import './Predict.scss';

const Predict = () => {
    const [formData, setFormData] = useState({
        age: '',
        sex: '',
        cp: '',
        trestbps: '',
        chol: '',
        fbs: '',
        restecg: '',
        thalach: '',
        exang: '',
        oldpeak: '',
        slope: '',
        ca: '',
        thal: ''
    });
    const [resultText, setResultText] = useState('');
    const [showOverlay, setShowOverlay] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const inputs = document.querySelectorAll('input, select');
        let valid = true;
        inputs.forEach(input => {
            if (!input.checkValidity()) {
                input.style.borderColor = 'red';
                valid = false;
            } else {
                input.style.borderColor = '#ccc';
            }
        });

        if (!valid) {
            alert('Vui lòng điền đầy đủ thông tin vào các trường.');
            return;
        }

        let result = 'Tim bạn hoàn toàn khỏe mạnh';
        if (formData.age > 60 || formData.trestbps > 140 || formData.chol > 240 || formData.fbs === 1 || formData.exang === 1) {
            result = 'Bạn nên đi khám';
        }
        setResultText(result);
        setShowOverlay(true);
    };

    return (
        <>
        <HomeHeader />
        <div className='predict-page'>
            <div className="container">
            <h2>Form chẩn đoán</h2>
            <form id="healthForm" onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="age">Tuổi:</label>
                        <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} required />
                    </div>
                    <div className="form-group medium">
                        <label htmlFor="sex">Giới tính:</label>
                        <select id="sex" name="sex" value={formData.sex} onChange={handleChange} required>
                            <option value="" disabled></option>
                            <option value="0">Nam</option>
                            <option value="1">Nữ</option>
                        </select>
                    </div>
                    <div className="form-group large">
                        <label htmlFor="cp">Loại đau ngực:</label>
                        <select id="cp" name="cp" value={formData.cp} onChange={handleChange} required>
                            <option value="" disabled></option>
                            <option value="0">Đau thắt ngực điển hình</option>
                            <option value="1">Đau thắt ngực không điển hình</option>
                            <option value="2">Đau không do tim</option>
                            <option value="3">Không có triệu chứng</option>
                        </select>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="trestbps">Huyết áp khi nghỉ (mm Hg):</label>
                        <input type="number" id="trestbps" name="trestbps" value={formData.trestbps} onChange={handleChange} required />
                    </div>
                    <div className="form-group medium">
                        <label htmlFor="chol">Cholesterol trong huyết thanh (mg/dl):</label>
                        <input type="number" id="chol" name="chol" value={formData.chol} onChange={handleChange} required />
                    </div>
                    <div className="form-group large">
                        <label htmlFor="fbs">Đường huyết lúc đói &gt 120 mg/dl:</label>
                        <select id="fbs" name="fbs" value={formData.fbs} onChange={handleChange} required>
                            <option value="" disabled></option>
                            <option value="0">Sai</option>
                            <option value="1">Đúng</option>
                        </select>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="restecg">Kết quả điện tâm đồ khi nghỉ:</label>
                        <select id="restecg" name="restecg" value={formData.restecg} onChange={handleChange} required>
                            <option value="" disabled></option>
                            <option value="0">Bình thường</option>
                            <option value="1">Có bất thường ST-T</option>
                            <option value="2">Phì đại thất trái</option>
                        </select>
                    </div>
                    <div className="form-group medium">
                        <label htmlFor="thalach">Nhịp tim tối đa đạt được:</label>
                        <input type="number" id="thalach" name="thalach" value={formData.thalach} onChange={handleChange} required />
                    </div>
                    <div className="form-group large">
                        <label htmlFor="exang">Đau thắt ngực do gắng sức:</label>
                        <select id="exang" name="exang" value={formData.exang} onChange={handleChange} required>
                            <option value="" disabled></option>
                            <option value="0">Không</option>
                            <option value="1">Có</option>
                        </select>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="oldpeak">ST chênh xuống do gắng sức:</label>
                        <input type="number" step="0.1" id="oldpeak" name="oldpeak" value={formData.oldpeak} onChange={handleChange} required />
                    </div>
                    <div className="form-group medium">
                        <label htmlFor="slope">Độ dốc của đoạn ST:</label>
                        <select id="slope" name="slope" value={formData.slope} onChange={handleChange} required>
                            <option value="" disabled></option>
                            <option value="0">Dốc lên</option>
                            <option value="1">Bằng phẳng</option>
                            <option value="2">Dốc xuống</option>
                        </select>
                    </div>
                    <div className="form-group large">
                        <label htmlFor="ca">Số lượng mạch chính (0-4):</label>
                        <input type="number" id="ca" name="ca" value={formData.ca} onChange={handleChange} required />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group large">
                        <label htmlFor="thal">Kết quả kiểm tra Thalium:</label>
                        <select id="thal" name="thal" value={formData.thal} onChange={handleChange} required>
                            <option value="" disabled></option>
                            <option value="0">Bình thường</option>
                            <option value="1">Khiếm khuyết cố định</option>
                            <option value="2">Khiếm khuyết có thể hồi phục</option>
                        </select>
                    </div>
                </div>
                <div className="form-row">
                    <button type="submit">Gửi</button>
                </div>
            </form>
            {showOverlay && (
                <div id="overlay" onClick={() => setShowOverlay(false)}>
                    <div className="message">{resultText}</div>
                </div>
            )}
        </div>
        </div>
        </>
    );
};

export default Predict;