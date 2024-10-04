import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from '../../../store/actions';
import './ManageSpecialty.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import commonUtils from '../../../utils/CommonUtils';
import { editSpecialtyById, getAllClinic, getAllSpecialty, updateClinicByIdService } from '../../../services/userService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Lightbox from 'react-18-image-lightbox'
import { Container } from 'reactstrap';
import Select from 'react-select';

const mdParser = new MarkdownIt(/* Thêm các tùy chọn của Markdown-it nếu cần */);

class EditSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',

            listSpecialty: [],
            selectedSpecialty: '',
            specialtyId: '',

            previewImgUrl: '',
            isOpen: false,

            dataSpecialties: [],
        }
    }

    componentDidMount() {
        this.props.getAllRequiredDoctorInfor()
        this.fetchSpecialties();
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
        let { resSpecialty } = this.props.allRequireDoctorInfor;
        let dataSelectSpecialty = this.buildDataInputSelect(resSpecialty);

        this.setState({
            listSpecialty: dataSelectSpecialty
        });
    }

    fetchSpecialties = async () => {
        let res = await getAllSpecialty();
        if (res.errCode === 0 && res.data) {
            this.setState({
                dataSpecialties: res.data,
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

    hanldeOnChangeSelectdSpecialty = async (selectedOption, name) => {
        // Lấy tên của trạng thái từ tham số 'name'
        let stateName = name.name;

        // Tạo một bản sao của trạng thái hiện tại
        let stateCopy = { ...this.state };

        // Cập nhật trạng thái mới với tùy chọn được chọn
        stateCopy[stateName] = selectedOption;

        // Tìm thông tin chuyên khoa dựa trên ID của tùy chọn
        const selectedSpecialty = this.state.dataSpecialties.find(
            item => item.id === selectedOption.value);

        if (selectedSpecialty) {
            stateCopy.specialtyId = selectedSpecialty.id;
            stateCopy.name = selectedSpecialty.name;
            stateCopy.descriptionHTML = selectedSpecialty.descriptionHTML;
            stateCopy.descriptionMarkdown = selectedSpecialty.descriptionMarkdown;
            stateCopy.imageBase64 = selectedSpecialty.image;
        }

        this.setState(stateCopy);
    }

    hanldeSave = async () => {
        let { specialtyId, name, imageBase64,
            descriptionHTML, descriptionMarkdown } = this.state;
        try {
            let res = await editSpecialtyById(specialtyId, {
                name,
                descriptionHTML,
                descriptionMarkdown,
                image: imageBase64
            });

            if (res.errCode === 0) {
                toast.success('Cập nhật thành công!');
                // Update the dataSpecialties state
                const updatedSpecialty = this.state.dataSpecialties.map(item => {
                    if (item.id === specialtyId) {
                        return {
                            ...item,
                            name,
                            descriptionHTML,
                            descriptionMarkdown,
                            image: imageBase64
                        };
                    }
                    return item;
                });
                this.setState({
                    dataSpecialties: updatedSpecialty,
                    name: '',
                    descriptionHTML: '',
                    descriptionMarkdown: '',
                    imageBase64: '',
                    selectedSpecialty: '',
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
                    <div className="title mb-5">Chỉnh sửa chuyên khoa</div>
                    <div className="add-new-specialty row">
                        <div className="col-md-5 form-group">
                            <label className='mb-2'>Chon phong kham:</label>
                            <Select
                                value={this.state.selectedSpecialty}
                                onChange={this.hanldeOnChangeSelectdSpecialty}
                                options={this.state.listSpecialty}
                                placeholder={'Chọn chuyên khoa'}
                                name='selectedSpecialty'
                            />
                        </div>
                        <div className="col-md-5 mb-5">
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

export default connect(mapStateToProps, mapDispatchToProps)(EditSpecialty);
