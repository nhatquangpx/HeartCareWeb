import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import './ManageDoctor.scss';
import * as actions from '../../../store/actions'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils';
import { getDetailInfoDoctorService } from '../../../services/userService'

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //save to markdown table
            contentHTML: '',
            contentMarkDown: '',
            selectedOption: '',
            description: '',
            listDoctors: [],
            hasOldData: false,

            //save to doctor_infor table
            listPrice: [],
            listPayment: [],
            listProvince: [],
            listClinic: [],
            listSpecialty: [],

            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            selectedClinic: '',
            selectedSpecialty: '',

            nameClinic: '',
            addressClinic: '',
            note: '',
            clinicId: '',
            specialtyId: '',
        }
    }

    initState() {
        this.setState({
            selectedOption: '',
            contentHTML: '',
            contentMarkDown: '',
            description: '',
            addressClinic: '',
            nameClinic: '',
            note: '',
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            selectedSpecialty: '',
            selectedClinic: '',
        })
    }

    componentDidMount() {
        this.props.fetchAllDoctor();
        this.props.getAllRequiredDoctorInfor();
    }

    buildDataInputSelect = (data, type) => {
        let result = [];
        let { language } = this.props;

        if (data && data.length > 0) {
            if (type === 'USERS') {
                data.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.lastName} ${item.firstName}`
                    let labelEn = `${item.firstName} ${item.lastName}`

                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.id;
                    result.push(object);
                })
            }
            if (type === 'PRICE') {
                data.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.valueVi}`
                    let labelEn = `${item.valueEn} USD`

                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object);
                })
            }
            if (type === 'PAYMENT' || type === 'PROVINCE') {
                data.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.valueVi}`
                    let labelEn = `${item.valueEn}`

                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object);
                })
            }
            if (type === 'SPECIALTY') {
                data.map((item, index) => {
                    let object = {};

                    object.label = item.name;
                    object.value = item.id;
                    result.push(object);
                })
            }
            if (type === 'CLINIC') {
                data.map((item, index) => {
                    let object = {};

                    object.label = item.name;
                    object.value = item.id;
                    result.push(object);
                })
            }
        }
        return result;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS');
            this.setState({
                listDoctors: dataSelect
            })
        }
        if (prevProps.language !== this.props.language) {
            let dataSelectDoctor = this.buildDataInputSelect(this.props.allDoctors, 'USERS');
            let { resPayment, resPrice, resProvince } = this.props.allRequireDoctorInfor;

            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE');
            let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT');
            let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE');


            this.setState({
                listDoctors: dataSelectDoctor,
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince
            })
        }

        if (prevProps.allRequireDoctorInfor !== this.props.allRequireDoctorInfor) {
            this.getDataRequireSelection();
        }
    }

    getDataRequireSelection() {
        let { resPayment, resPrice, resProvince, resSpecialty, resClinic } = this.props.allRequireDoctorInfor;

        let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE');
        let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT');
        let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE');
        let dataSelectSpecialty = this.buildDataInputSelect(resSpecialty, 'SPECIALTY');
        let dataSelectClinic = this.buildDataInputSelect(resClinic, 'CLINIC');

        this.setState({
            listPrice: dataSelectPrice,
            listPayment: dataSelectPayment,
            listProvince: dataSelectProvince,
            listSpecialty: dataSelectSpecialty,
            listClinic: dataSelectClinic
        });
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentHTML: html,
            contentMarkDown: text
        });
    }

    handleSavecontentMarkDown = () => {
        let { hasOldData } = this.state;

        this.props.saveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkDown: this.state.contentMarkDown,
            description: this.state.description,
            doctorId: this.state.selectedOption.value,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note,
            clinicId: this.state.selectedClinic.value,
            specialtyId: this.state.selectedSpecialty.value,
        });
        this.initState();
    }

    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedOption });
        let { listPayment, listPrice, listProvince, listSpecialty, listClinic } = this.state;
        let res = await getDetailInfoDoctorService(selectedOption.value);

        if (res && res.errCode === 0 && res.data && res.data.MarkDown) {
            let markDown = res.data.MarkDown;
            let addressClinic = '', nameClinic = '', note = '',
                paymentId = '', priceId = '', provinceId = '',
                selectedPayment = '', selectedPrice = '', selectedProvince = '',
                specialtyId = '', selectedSpecialty = '',
                clinicId = '', selectedClinic = ''

            if (res.data.Doctor_Infor) {
                addressClinic = res.data.Doctor_Infor.addressClinic;
                nameClinic = res.data.Doctor_Infor.nameClinic;
                note = res.data.Doctor_Infor.note;
                paymentId = res.data.Doctor_Infor.paymentId;
                priceId = res.data.Doctor_Infor.priceId;
                provinceId = res.data.Doctor_Infor.provinceId;
                //
                specialtyId = res.data.Doctor_Infor.specialtyId;
                selectedSpecialty = listSpecialty.find(item => {
                    return item && item.value === specialtyId
                })
                //
                clinicId = res.data.Doctor_Infor.clinicId;
                selectedClinic = listClinic.find(item => {
                    return item && item.value === clinicId
                })

                selectedPrice = listPrice.find(item => {
                    return item && item.value === priceId
                })
                selectedPayment = listPayment.find(item => {
                    return item && item.value === paymentId
                })
                selectedProvince = listProvince.find(item => {
                    return item && item.value === provinceId
                })
            }

            this.setState({
                contentHTML: markDown.contentHTML,
                contentMarkDown: markDown.contentMarkDown,
                description: markDown.description,
                hasOldData: true,
                addressClinic: addressClinic,
                nameClinic: nameClinic,
                note: note,
                selectedPrice: selectedPrice,
                selectedPayment: selectedPayment,
                selectedProvince: selectedProvince,
                selectedSpecialty: selectedSpecialty,
                selectedClinic: selectedClinic,
            })
        } else {
            this.initState();
        }
    }

    hanldeOnChangeSelectdDoctor = async (selectedOption, name) => {
        let stateName = name.name;
        let stateCopy = { ...this.state };
        stateCopy[stateName] = selectedOption;
        this.setState(stateCopy);
    }

    handleOnChangeText = (e, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = e.target.value;
        this.setState({
            ...stateCopy
        })
    }

    render() {
        let { hasOldData } = this.state;
        console.log('check props', this.props);

        return (
            <>
                <Container>
                    <div className="manage-doctor-container">
                        <div className="title mb-5">
                            Doctor details
                        </div>
                        <div className="more-info">
                            <div className="content-left form-group">
                                <label className='mb-2'><FormattedMessage id="manage-doctor.selected-doctor" />:</label>
                                <Select
                                    value={this.state.selectedOption}
                                    onChange={this.handleChangeSelect}
                                    options={this.state.listDoctors}
                                    placeholder={'Chọn bác sĩ'}
                                />
                            </div>
                            <div className="content-right">
                                <label className='mb-2'><FormattedMessage id="manage-doctor.info-doctor" />:</label>
                                <textarea onChange={(e) => this.handleOnChangeText(e, 'description')}
                                    value={this.state.description} name="" id="" className='form-control'>
                                </textarea>
                            </div>
                        </div>
                        <div className="more-infor-extra row">
                            <div className="col-md-3 form-group">
                                <label className='mb-2'>Chon gia:</label>
                                <Select
                                    value={this.state.selectedPrice}
                                    onChange={this.hanldeOnChangeSelectdDoctor}
                                    options={this.state.listPrice}
                                    placeholder={'Chọn giá'}
                                    name='selectedPrice'
                                />
                            </div>
                            <div className="col-md-3 form-group">
                                <label className='mb-2'>Chon phuong thuc thanh toan:</label>
                                <Select
                                    value={this.state.selectedPayment}
                                    onChange={this.hanldeOnChangeSelectdDoctor}
                                    options={this.state.listPayment}
                                    placeholder={'Phương thức thanh toán'}
                                    name='selectedPayment'
                                />
                            </div>
                            <div className="col-md-3 form-group">
                                <label className='mb-2'>Chon tinh thanh:</label>
                                <Select
                                    value={this.state.selectedProvince}
                                    onChange={this.hanldeOnChangeSelectdDoctor}
                                    options={this.state.listProvince}
                                    placeholder={'Chọn tỉnh thành'}
                                    name='selectedProvince'
                                />
                            </div>
                            <div className="col-md-3 form-group">
                                <label className='mb-2'>ten phong kham:</label>
                                <input type="text" className='form-control'
                                    onChange={(e) => this.handleOnChangeText(e, 'nameClinic')}
                                    value={this.state.nameClinic} />
                            </div>
                            <div className="col-md-3 form-group">
                                <label className='mb-2'>dia chi phong kham:</label>
                                <input type="text" className='form-control'
                                    onChange={(e) => this.handleOnChangeText(e, 'addressClinic')}
                                    value={this.state.addressClinic} />
                            </div>
                            <div className="col-md-3 form-group">
                                <label className='mb-2'>note:</label>
                                <input type="text" className='form-control'
                                    onChange={(e) => this.handleOnChangeText(e, 'note')}
                                    value={this.state.note} />
                            </div>
                            <div className="col-md-3 form-group">
                                <label className='mb-2'>Chon chuyen khoa:</label>
                                <Select
                                    value={this.state.selectedSpecialty}
                                    onChange={this.hanldeOnChangeSelectdDoctor}
                                    options={this.state.listSpecialty}
                                    placeholder={'Chọn chuyên khoa'}
                                    name='selectedSpecialty'
                                />
                            </div>
                            <div className="col-md-3 form-group">
                                <label className='mb-2'>Chon phong kham:</label>
                                <Select
                                    value={this.state.selectedClinic}
                                    onChange={this.hanldeOnChangeSelectdDoctor}
                                    options={this.state.listClinic}
                                    placeholder={'Chọn phòng khám'}
                                    name='selectedClinic'
                                />
                            </div>
                        </div>
                        <div className="manage-doctor-editor mt-3">
                            <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)}
                                onChange={this.handleEditorChange}
                                value={this.state.contentMarkDown} />
                        </div>
                        <button onClick={() => this.handleSavecontentMarkDown()}
                            className={hasOldData === true ? "btn-edit" : "btn-save"}>
                            {hasOldData === true ?
                                <span><FormattedMessage id="manage-doctor.edit" /></span>
                                : <span><FormattedMessage id="manage-doctor.save" /></span>}
                        </button>
                    </div>
                </Container>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        allRequireDoctorInfor: state.admin.allRequireDoctorInfor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
        getAllRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
