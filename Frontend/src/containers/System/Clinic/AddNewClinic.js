import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from '../../../store/actions';
import './ManageClinic.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import commonUtils from '../../../utils/CommonUtils';
import { createClinic, getDetailClinicById } from '../../../services/userService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Lightbox from 'react-18-image-lightbox'
import { Container } from 'reactstrap';

const mdParser = new MarkdownIt(/* Thêm các tùy chọn của Markdown-it nếu cần */);

class ManageClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',

            previewImgUrl: '',
            isOpen: false,
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


    hanldeSave = async () => {
        const res = await createClinic(this.state);
        if (res && res.errCode === 0) {
            toast.success('Thêm mới thành công!');
            this.setState({
                name: '',
                address: '',
                imageBase64: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
                previewImgUrl: '',
                isOpen: false,
            })
        } else {
            toast.error('Thêm mới thất bại!')
        }
    }

    openPreviewImage = () => {
        if (!this.state.previewImgUrl) return;
        this.setState({
            isOpen: true
        });
    }

    render() {

        return (
            <Container>
                <div className="manage-specialty-container">
                    <div className="title mb-5">Thêm phòng khám</div>
                    <div className="add-new-specialty row">
                        <div className="col-md-5 form-group">
                            <label htmlFor="">Tên phòng khám</label>
                            <input type="text" className='form-control'
                                value={this.state.name}
                                onChange={(e) => this.handleOnChangeInput(e, 'name')} />
                        </div>
                        <div className="col-md-4">
                            <div className="previewImgContent">
                                <input onChange={(e) => this.handleOnChangeImage(e)} id='previewImg' type="file" hidden />
                                <label className='lable-upload' htmlFor="previewImg">Tải ảnh <i className='fas fa-upload'></i></label>
                                <div className="preview-img" style={{ backgroundImage: `url(${this.state.previewImgUrl})` }}
                                    onClick={() => this.openPreviewImage()}>
                                </div>
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
        dataClinicById: state.admin.dataClinicById
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
        fetchDataClinicById: () => dispatch(actions.fetchClinicById())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
