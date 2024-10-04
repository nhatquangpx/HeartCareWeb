import React, { Component } from 'react';
import { connect } from "react-redux";
import './ModalRemedy.scss';
import { Modal } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import { CommonUtils } from '../../../utils';
import { async } from 'q';

class ModalRemery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            imageBase64: '',

            previewImgUrl: '',
            isOpen: false,
            isLoading: false,
        }
    }

    async componentDidMount() {
        if (this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            });
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.dataModal !== this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            });
        }
    }

    handleOnChangeEmail = (e) => {
        this.setState({
            email: e.target.value
        });
    }

    handleOnChangeImage = async (e) => {
        let data = e.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            const objectUrl = URL.createObjectURL(file);
            this.setState({
                imageBase64: base64,
                previewImgUrl: objectUrl,
            });
        }
    }

    handleSendRemedy = async () => {
        this.setState({ isLoading: true });

        try {
            await this.props.sendRemedy(this.state);
            this.setState({ isLoading: false });
            this.props.clossRemedyModal();
        } catch (error) {
            // Xử lý lỗi nếu cần
            this.setState({ isLoading: false });
        }
    }


    openPreviewImage = () => {
        if (!this.state.previewImgUrl) return;
        this.setState({
            isOpen: true
        });
    }

    handleReset = () => {
        this.setState({
            previewImgUrl: '',
        })
    }

    render() {
        let { isOpenModal, clossRemedyModal, dataModal } = this.props;

        return (
            <div className='m-r-container'>
                <Modal
                    isOpen={isOpenModal}
                    size='md'
                    centered
                >
                    <div className="remedy-modal-content remedy">
                        <div className="remedy-modal-header">
                            <span className='left'><FormattedMessage id={"manage-patient.bill"} /></span>
                            <span className='right'>
                                <i onClick={clossRemedyModal} className='fas fa-times'></i>
                            </span>
                        </div>
                        <div className="remedy-modal-body">
                            <div className="row">
                                <div className="col-md-12 form-group">
                                    <label><FormattedMessage id={"manage-patient.email"} /></label>
                                    <input type="email" name="" id="" className='form-control'
                                        value={dataModal.email}
                                        onChange={(e) => this.handleOnChangeEmail(e)} />
                                </div>
                                <div className="col-md-6 form-group choose-file">
                                    <label htmlFor='choose'><FormattedMessage id={"manage-patient.chooseFile"} /></label>
                                    <input hidden type="file" name="" id="choose" className='form-control-file'
                                        onChange={(e) => this.handleOnChangeImage(e)} />
                                </div>
                                <div className="col-md-6 previewImgContent">
                                    <div className="preview-img" style={{ backgroundImage: `url(${this.state.previewImgUrl})` }}></div>
                                </div>
                            </div>
                        </div>
                        <div className="remedy-modal-footer">
                            {this.state.isLoading ? (
                                <div className="loading-overlay">
                                    <span>Loading...</span>
                                </div>
                            ) : (
                                <div>
                                    <button className='btn-confirm' onClick={() => { this.handleSendRemedy(); this.handleReset() }}><FormattedMessage id={"detail-doctor.confirm"} /></button>{''}
                                    <button className='btn-cancel' onClick={() => { clossRemedyModal(); this.handleReset(); }}><FormattedMessage id={"detail-doctor.cancel"} /></button>
                                </div>
                            )}
                        </div>
                    </div>

                </Modal>
            </div >
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalRemery);
