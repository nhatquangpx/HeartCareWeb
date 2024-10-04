import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from '../../../store/actions';
import './ManageClinic.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import commonUtils from '../../../utils/CommonUtils';
import { getAllClinic, updateClinicByIdService } from '../../../services/userService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Lightbox from 'react-18-image-lightbox'
import { Container } from 'reactstrap';
import Select from 'react-select';

const mdParser = new MarkdownIt(/* Thêm các tùy chọn của Markdown-it nếu cần */);

class EditClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',

            listClinic: [],
            selectedClinic: '',
            clinicId: '',

            previewImgUrl: '',
            isOpen: false,

            dataClinics: [],
        }
    }

    componentDidMount() {
        this.props.getAllRequiredDoctorInfor()
        this.fetchClinics();
    }

    buildDataInputSelect = (data) => {
        let result = [];

        if (data && data.length > 0) {
            data.map((item, index) => {
                let object = {};

                object.label = item.name;
                object.value = item.id;
                result.push(object);
            })
        }
        return result;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allRequireDoctorInfor !== this.props.allRequireDoctorInfor) {
            this.getDataRequireSelection();
        }
    }

    getDataRequireSelection() {
        let { resClinic } = this.props.allRequireDoctorInfor;
        let dataSelectClinic = this.buildDataInputSelect(resClinic);

        this.setState({
            listClinic: dataSelectClinic
        });
    }

    fetchClinics = async () => {
        let res = await getAllClinic();
        if (res.errCode === 0 && res.data) {
            this.setState({
                dataClinics: res.data,
            });
        }
    }

    handleOnChangeInput = (e, id) => {
        const stateCopy = { ...this.state };
        stateCopy[id] = e.target.value;
        this.setState({
            ...stateCopy
        })
    }


    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text
        })
    }

    handleOnChangeImage = async (e) => {
        const data = e.target.files;
        const file = data[0];
        if (file) {
            const base64 = await commonUtils.getBase64(file);
            const objectUrl = URL.createObjectURL(file);
            this.setState({
                imageBase64: base64,
                previewImgUrl: objectUrl,
            })
        }
    }

    openPreviewImage = () => {
        if (!this.state.previewImgUrl) return;
        this.setState({
            isOpen: true
        });
    }

    hanldeOnChangeSelectdClinic = async (selectedOption, name) => {
        // Lấy tên của trạng thái từ tham số 'name'
        let stateName = name.name;

        // Tạo một bản sao của trạng thái hiện tại
        let stateCopy = { ...this.state };

        // Cập nhật trạng thái mới với tùy chọn được chọn
        stateCopy[stateName] = selectedOption;

        // Tìm thông tin phòng khám dựa trên ID của tùy chọn
        const selectedClinic = this.state.dataClinics.find(
            clinic => clinic.id === selectedOption.value);

        if (selectedClinic) {
            stateCopy.clinicId = selectedClinic.id;
            stateCopy.name = selectedClinic.name;
            stateCopy.address = selectedClinic.address;
            stateCopy.descriptionHTML = selectedClinic.descriptionHTML;
            stateCopy.descriptionMarkdown = selectedClinic.descriptionMarkdown;
            stateCopy.imageBase64 = selectedClinic.image;
        }

        this.setState(stateCopy);
    }

    hanldeSave = async () => {
        let { clinicId, name, address, imageBase64,
            descriptionHTML, descriptionMarkdown } = this.state;
        try {

            // Gọi hàm cập nhật ở đây và truyền thông tin cần thiết
            let res = await updateClinicByIdService(clinicId, {
                address,
                name,
                descriptionHTML,
                descriptionMarkdown,
                image: imageBase64
            });

            if (res.errCode === 0) {
                toast.success('Cập nhật thành công!');
                // Update the dataClinics state
                const updatedClinics = this.state.dataClinics.map(clinic => {
                    if (clinic.id === clinicId) {
                        return {
                            ...clinic,
                            name,
                            address,
                            descriptionHTML,
                            descriptionMarkdown,
                            image: imageBase64
                        };
                    }
                    return clinic;
                });
                this.setState({
                    dataClinics: updatedClinics,
                    address: '',
                    name: '',
                    descriptionHTML: '',
                    descriptionMarkdown: '',
                    imageBase64: '',
                    selectedClinic: '',
                });
            } else {
                toast.error('Cập nhật thất bại!')
            }
        } catch (error) {
            console.log("Error", error);
        }
    }

    render() {

        return (
            <Container>
                <div className="manage-specialty-container">
                    <div className="title mb-5">Chỉnh sửa phòng khám</div>
                    <div className="add-new-specialty row">
                        <div className="col-md-5 form-group">
                            <label className='mb-2'>Chon phong kham:</label>
                            <Select
                                value={this.state.selectedClinic}
                                onChange={this.hanldeOnChangeSelectdClinic}
                                options={this.state.listClinic}
                                placeholder={'Chọn phòng khám'}
                                name='selectedClinic'
                            />
                        </div>
                        <div className="col-md-5">
                            <div className="previewImgContent">
                                <input onChange={(e) => this.handleOnChangeImage(e)} id='previewImg' type="file" hidden />
                                <label className='lable-upload' htmlFor="previewImg">
                                    Tải ảnh <i className='fas fa-upload'></i>
                                </label>
                                {this.state.imageBase64 && (
                                    <div className="preview-img" style={{
                                        backgroundImage: `url(${this.state.imageBase64})`,
                                    }}
                                        onClick={() => this.openPreviewImage()}>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="col-md-5 form-group">
                            <label htmlFor="">Địa chỉ phòng khám</label>
                            <input type="text" className='form-control'
                                value={this.state.address}
                                onChange={(e) => this.handleOnChangeInput(e, 'address')} />
                        </div>
                        <div className="col-12 mt-4">
                            <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)}
                                onChange={this.handleEditorChange}
                                value={this.state.descriptionMarkdown}
                            />
                        </div>
                        <div className="col-2 mx-auto mb-3">
                            <button onClick={() => this.hanldeSave()}>
                                Lưu
                            </button>
                        </div>
                    </div>
                    {this.state.isOpen === true &&
                        <Lightbox
                            mainSrc={this.state.previewImgUrl}
                            onCloseRequest={() => this.setState({ isOpen: false })}
                        />
                    }
                </div>
            </Container>
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
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditClinic);
