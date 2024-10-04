import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils'
import * as actions from '../../../store/actions';
import './UserRedux.scss'
import Lightbox from 'react-18-image-lightbox'
import TableManageUser from './TableManageUser';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgUrl: '',
            isOpen: false,

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',
            userEditId: '',

            arrCheck: { email: 'Email', password: 'Mật khẩu', firstName: 'Tên', lastName: 'Họ', phoneNumber: 'Số điện thoại', address: 'Địa chỉ' },

            action: ''
        }
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux;
            this.setState({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : ''
            })
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRoles = this.props.roleRedux;
            this.setState({
                roleArr: arrRoles,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : ''
            })
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPositions = this.props.positionRedux;
            this.setState({
                positionArr: arrPositions,
                position: arrPositions.length > 0 ? arrPositions[0].keyMap : ''
            })
        }
        if (prevProps.listUsers !== this.props.listUsers) {
            let arrGenders = this.props.genderRedux;
            let arrRoles = this.props.roleRedux;
            let arrPositions = this.props.positionRedux;
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
                phoneNumber: '',
                avatar: '',
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : '',
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : '',
                action: CRUD_ACTIONS.CREATE,
                previewImgUrl: '',
            })
        }

    }

    handleOnChangeImage = async (e) => {
        let data = e.target.files;
        let file = data[0];

        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgUrl: objectUrl,
                avatar: base64
            })
        }
    }

    openPreviewImage = () => {
        if (!this.state.previewImgUrl) return
        this.setState({
            isOpen: true
        });
    }

    onChangeInput = (e, id) => {
        let copyState = { ...this.state };
        copyState[id] = e.target.value;
        this.setState({
            ...copyState
        });
    }

    handleSaveUser = (e) => {
        e.preventDefault();
        let isValid = this.checkValidInput();
        let { action } = this.state;
        if (action === CRUD_ACTIONS.EDIT) {
            //fire redux action edit
            this.props.editUserRedux({
                id: this.state.userEditId,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                phoneNumber: this.state.phoneNumber,
                avatar: this.state.avatar
            })
            toast.success('Update user successfully!');
        }
        if (isValid === true) {
            //fire redux action
            this.props.createUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                phoneNumber: this.state.phoneNumber,
                avatar: this.state.avatar
            })
        }
    }

    checkValidInput = () => {
        let isValid = true;
        if (this.props.language === 'en') {
            this.setState({
                arrCheck: { email: 'Email', password: 'Password', firstName: 'First name', lastName: 'Last name', phoneNumber: 'Phone number', address: 'Address' }
            })
        } else {
            this.setState({
                arrCheck: { email: 'Email', password: 'Mật khẩu', firstName: 'Tên', lastName: 'Họ', phoneNumber: 'Số điện thoại', address: 'Địa chỉ' }
            })
        }
        for (let i = 0; i < Object.keys(this.state.arrCheck).length; i++) {
            let key = Object.keys(this.state.arrCheck)[i];
            if (!this.state[key]) {
                isValid = false;
                if (this.props.language === 'en') {
                    alert('This input is required: ' + this.state.arrCheck[key]);
                } else {
                    alert('Bạn chưa nhập ' + this.state.arrCheck[key]);
                }
                break;
            }
        }
        return isValid;
    }

    handleEditUserFromParent = (user) => {
        let imageBase64 = '';
        if (user.image) {
            imageBase64 = new Buffer(user.image, 'base64').toString('binary');
        }
        this.setState({
            email: user.email,
            password: 'hardcode',
            firstName: user.firstName,
            lastName: user.lastName,
            address: user.address,
            phoneNumber: user.phoneNumber,
            gender: user.gender,
            role: user.roleId,
            position: user.positionId,
            avatar: imageBase64,
            previewImgUrl: imageBase64,
            action: CRUD_ACTIONS.EDIT,
            userEditId: user.id
        })
    }



    render() {
        let genders = this.state.genderArr;
        let roles = this.state.roleArr;
        let positions = this.state.positionArr;
        let language = this.props.language;
        // let isLoadingGender = this.props.isLoadingGender;

        let { email, password, firstName, lastName, phoneNumber, address, gender,
            position, role, avatar } = this.state;

        return (
            <div className="user-redux-container">
                <div className="title">
                    Add new user
                </div>
                {/* <div className="">{isLoadingGender === true ? 'loading genders' : ''}</div> */}
                <div className="user-redux-body">
                    <div className="container">
                        <div className="row">
                            <form class="row g-3 border">
                                <div class="col-md-6">
                                    <label for="inputEmail4" class="form-label">Email</label>
                                    <input value={email} disabled={this.state.action === CRUD_ACTIONS.EDIT}
                                        onChange={(e) => this.onChangeInput(e, 'email')} type="email" class="form-control" id="inputEmail4" />
                                </div>
                                <div class="col-md-6">
                                    <label for="inputPassword4" class="form-label">Password</label>
                                    <input value={password} disabled={this.state.action === CRUD_ACTIONS.EDIT}
                                        onChange={(e) => this.onChangeInput(e, 'password')} type="password" class="form-control" id="inputPassword4" />
                                </div>
                                <div class="col-md-6">
                                    <label for="inputAddress" class="form-label">First name</label>
                                    <input value={firstName}
                                        onChange={(e) => this.onChangeInput(e, 'firstName')} type="text" class="form-control" id="inputAddress" />
                                </div>
                                <div class="col-md-6">
                                    <label for="inputAddress2" class="form-label">Last name</label>
                                    <input value={lastName}
                                        onChange={(e) => this.onChangeInput(e, 'lastName')} type="text" class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" />
                                </div>
                                <div class="col-md-4">
                                    <label for="inputCity" class="form-label">Phone number</label>
                                    <input value={phoneNumber}
                                        onChange={(e) => this.onChangeInput(e, 'phoneNumber')} type="text" class="form-control" id="inputCity" />
                                </div>
                                <div class="col-md-4">
                                    <label for="inputCity" class="form-label">Address</label>
                                    <input value={address}
                                        onChange={(e) => this.onChangeInput(e, 'address')} type="text" class="form-control" id="inputCity" />
                                </div>
                                <div class="col-md-4">
                                    <label class="form-label">Gender</label>
                                    <select class="form-select" value={gender}
                                        onChange={(e) => this.onChangeInput(e, 'gender')}>
                                        {genders && genders.length > 0 &&
                                            genders.map((item, index) => {
                                                return (
                                                    <option value={item.keyMap} key={index}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div class="col-md-4">
                                    <label class="form-label">Chức danh</label>
                                    <select class="form-select" value={position}
                                        onChange={(e) => this.onChangeInput(e, 'position')}>
                                        {positions && positions.length > 0 &&
                                            positions.map((item, index) => {
                                                return (
                                                    <option value={item.keyMap} key={index}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div class="col-md-4">
                                    <label class="form-label">Role</label>
                                    <select class="form-select" value={role}
                                        onChange={(e) => this.onChangeInput(e, 'role')}>
                                        {roles && roles.length > 0 &&
                                            roles.map((item, index) => {
                                                return (
                                                    <option value={item.keyMap} key={index}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div class="col-md-4">
                                    <label for="inputState" class="form-label">Image</label>
                                    <div className="previewImgContent">
                                        <input onChange={(e) => this.handleOnChangeImage(e)} id='previewImg' type="file" hidden />
                                        <label className='lable-upload' htmlFor="previewImg">Tải ảnh <i className='fas fa-upload'></i></label>
                                        <div className="preview-img" style={{ backgroundImage: `url(${this.state.previewImgUrl})` }}
                                            onClick={() => this.openPreviewImage()}
                                        >
                                        </div>
                                    </div>
                                </div>
                                <div class="col-2 mx-auto mb-3">
                                    <button className={this.state.action === CRUD_ACTIONS.EDIT ? "btn btn-warning" : "btn btn-primary"}
                                        onClick={(e) => this.handleSaveUser(e)} type="submit" class="btn btn-primary">
                                        {this.state.action === CRUD_ACTIONS.EDIT ?
                                            <FormattedMessage id="manage-user.edit" /> :
                                            <FormattedMessage id="manage-user.save" />
                                        }
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <TableManageUser
                    handleEditUserFromParent={this.handleEditUserFromParent}
                    action={this.state.action}
                />
                {this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.previewImgUrl}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                }
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        roleRedux: state.admin.roles,
        positionRedux: state.admin.positions,
        isLoadingGender: state.admin.isLoadingGender,
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createUser: (data) => dispatch(actions.createUser(data)),
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        editUserRedux: (data) => dispatch(actions.editUser(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
