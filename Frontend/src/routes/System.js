import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import UserRedux from '../containers/System/Admin/UserRedux';
import Header from '../containers/Header/Header';
import ManageDoctor from '../containers/System/Admin/ManageDoctor';
import ListClinic from '../containers/System/Clinic/ListClinic';
import ManageHandBook from '../containers/System/HandBook/ManageHandBook';
import AddNewClinic from '../containers/System/Clinic/AddNewClinic';
import EditClinic from '../containers/System/Clinic/EditClinic';
import ListSpecialty from '../containers/System/Specialty/ListSpecialty';
import EditSpecialty from '../containers/System/Specialty/EditSpecialty';
import AddSpecialty from '../containers/System/Specialty/AddSpecialty';
import ListHomeSpecialty from '../containers/System/Specialty/ListSpecialty';
class System extends Component {
    render() {
        const { systemMenuPath, isLoggedIn } = this.props;
        return (
            <>
                {isLoggedIn && <Header />}
                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            {/* <Route path="/system/user-manage" component={UserManage} /> */}
                            <Route path="/system/user-redux" component={UserRedux} />
                            <Route path="/system/manage-doctor" component={ManageDoctor} />
                            <Route path="/system/add-speciality" component={AddSpecialty} />
                            <Route path="/system/list-speciality" component={ListSpecialty} />
                            <Route path="/system/edit-speciality" component={EditSpecialty} />
                            <Route path="/system/manage-clinic" component={AddNewClinic} />
                            <Route path="/system/list-clinic" component={ListClinic} />
                            <Route path="/system/edit-clinic" component={EditClinic} />
                            <Route path="/system/manage-handbook" component={ManageHandBook} />

                            <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
                        </Switch>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
