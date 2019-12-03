import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';

const MyTextField = styled(TextField)({
    padding: 10,
    margin: 5,
    textAlign: "center",
    fontFamily: "'PT Sans Narrow', sans-serif;"
});
//allows the admin to edit a users profile.
class AdminEditUserProfile extends Component {
    state = {
        name: '',
        pronouns: '',
        phone: '',
        email: '',
        emergencyContactName: '',
        emergencyContactPhone: '',
        dateOfBirth: '',
    }


    //Display user's info on the page
    componentDidMount = () => {
        this.getInfo();
    }

    //Dispatch call that allows admin to view user's profile information
    getInfo = () => {
        this.props.dispatch({ type: 'ADMIN_FETCH_USER', action: this.props.userId })
        setTimeout(() => {
            this.setState({
                name: this.props.reduxState.adminToUserReducer.adminEditUserReducer.name,
                pronouns: this.props.reduxState.adminToUserReducer.adminEditUserReducer.pronouns,
                phone: this.props.reduxState.adminToUserReducer.adminEditUserReducer.phone,
                email: this.props.reduxState.adminToUserReducer.adminEditUserReducer.email,
                emergencyContactName: this.props.reduxState.adminToUserReducer.adminEditUserReducer.emergency_contact_name,
                emergencyContactPhone: this.props.reduxState.adminToUserReducer.adminEditUserReducer.emergency_contact_phone,
                dateOfBirth: this.props.reduxState.adminToUserReducer.adminEditUserReducer.age,
            })
        }, 1200)
    }

    //Allow admin to make changes to user's profile information
    handleChange = (event, propertyName) => {
        this.setState({
            [propertyName]: event.target.value
        })
    };

    //Dispatch call to change user's profile information in the database
    handleSubmit = event => {
        this.props.dispatch({
            type: 'ADMIN_UPDATE_USER',
            payload: {
                id: this.props.userId,
                name: this.state.name,
                pronouns: this.state.pronouns,
                phone: this.state.phone,
                email: this.state.email,
                emergencyContactName: this.state.emergencyContactName,
                emergencyContactPhone: this.state.emergencyContactPhone,
                dateOfBirth: this.state.dateOfBirth,
            }
        })
        this.props.history.push('/adminviewuser/' + this.props.userId)
    };

    //Button function to direct admin back to user's page
    handleCancel = event => {
        this.props.history.push('/adminviewuser/' + this.props.userId)
    }

    //Admin can deactivate the user and prevent them from accessing app's functionalities
    archiveUser = (id) => {
        this.props.dispatch({ type: 'ARCHIVE_USER', payload: [id] });
        this.props.history.push('/admin')
    };
    render() {
        return (
            <div className="inputs-wrapper">
                <MyTextField
                    label="Name"
                    value={this.state.name}
                    onChange={(event) => this.handleChange(event, 'name')}
                    margin="normal"
                />
                <MyTextField
                    label="Pronouns (ex.: she/her/hers)"
                    value={this.state.pronouns}
                    onChange={(event) => this.handleChange(event, 'pronouns')}
                    margin="normal"
                />
                <MyTextField
                    label="Phone"
                    value={this.state.phone}
                    onChange={(event) => this.handleChange(event, 'phone')}
                    margin="normal"
                />
                <MyTextField
                    label="Email"
                    value={this.state.email}
                    onChange={(event) => this.handleChange(event, 'email')}
                    margin="normal"
                />
                <MyTextField
                    label="Emergency Contact Name"
                    value={this.state.emergencyContactName}
                    onChange={(event) => this.handleChange(event, 'emergencyContactName')}
                    margin="normal"
                />
                <MyTextField
                    label="Emergency Contact Phone"
                    value={this.state.emergencyContactPhone}
                    onChange={(event) => this.handleChange(event, 'emergencyContactPhone')}
                    margin="normal"
                />
                <MyTextField
                    label="Date of Birth"
                    value={this.state.dateOfBirth}
                    onChange={(event) => this.handleChange(event, 'dateOfBirth')}
                    margin="normal"
                />
                <div className="save-buttons">
                    <button onClick={this.handleSubmit}>
                        SAVE CHANGES
            </button>
                </div>
                <div className="save-buttons">
                    <button onClick={this.handleCancel}>
                        CANCEL
            </button>
                </div>
                <div className="save-buttons">
                    <button onClick={() => this.archiveUser(this.props.userId)}>
                        ARCHIVE USER
            </button>
                </div>
            </div>
        );
    }
}
const mapStateToProps = reduxState => ({
    reduxState,
});
export default withRouter(connect(mapStateToProps)(AdminEditUserProfile));