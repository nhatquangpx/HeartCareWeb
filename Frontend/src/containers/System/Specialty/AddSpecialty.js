import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from '../../../store/actions';
import './ManageSpecialty.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import commonUtils from '../../../utils/CommonUtils';
import { createNewSpecialty } from '../../../services/userService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Lightbox from 'react-18-image-lightbox'
import { Container } from 'reactstrap';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class AddSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',

            previewImgUrl: '',
            isOpen: false,
        }
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    handleOnChangeInput = (e, id) => {
        let stateCopy = { ...this.state };
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
        let data = e.target.files;
        let file = data[0];
        if (file) {
            let base64 = await commonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                imageBase64: base64,
                previewImgUrl: objectUrl,
            })
        }
    }

    hanldeSave = async () => {
        let res = await createNewSpecialty(this.state);
        if (res && res.errCode === 0) {
            toast.success('Add new succcessfully!')
        } else {
            toast.error('Add new failed!')
        }
    }

    openPreviewImage = () => {
        if (!this.state.previewImgUrl) return
        this.setState({
            isOpen: true
        });
    }

    render() {

        return (
            <Container>
                <div className="manage-specialty-container">
                    <div className="title mb-5">Thêm chuyên khoa</div>
                    <div className="add-new-specialty row">
                        <div className="col-md-4 form-group">
                            <label htmlFor="">Ten chuyen khoa</label>
                            <input type="text" className='form-control'
                                value={this.state.name}
                                onChange={(e) => this.handleOnChangeInput(e, 'name')} />
                        </div>
                        <div class="col-md-4">
                            <div className="previewImgContent">
                                <input onChange={(e) => this.handleOnChangeImage(e)} id='previewImg' type="file" hidden />
                                <label className='lable-upload' htmlFor="previewImg">Tải ảnh <i className='fas fa-upload'></i></label>
                                <div className="preview-img" style={{ backgroundImage: `url(${this.state.previewImgUrl})` }}
                                    onClick={() => this.openPreviewImage()}>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 mt-4">
                            <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)}
                                onChange={this.handleEditorChange}
                                value={this.state.descriptionMarkdown}
                            />
                        </div>
                        <div class="col-2 mx-auto mb-3">
                            <button onClick={() => this.hanldeSave()}>
                                save
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddSpecialty);
