import React, { Component } from 'react';
import { connect } from 'react-redux';

class AdminAddUser extends Component {
    state = {
        username: '',
        password: '',
    };

    //Dispatch call to add user based on the condition if username/password = true
    //direct admin to adminviewuser page
    addUser = (event) => {
        event.preventDefault();

        if (this.state.username && this.state.password) {
            this.props.dispatch({
                type: 'ADD_USER',
                payload: {
                    username: this.state.username,
                    password: this.state.password,
                },
            })
            this.props.history.push('/adminviewuser');
        } else {
            this.props.dispatch({ type: 'REGISTRATION_INPUT_ERROR' });
        }
    } // end registerUser


    //store input field values into the local state
    handleInputChangeFor = propertyName => (event) => {
        this.setState({
            [propertyName]: event.target.value,
        });
    }

    render() {
        return (
            <div>
                {this.props.errors.registrationMessage && (
                    <h2
                        className="alert"
                        role="alert"
                    >
                        {this.props.errors.registrationMessage}
                    </h2>
                )}
                <form onSubmit={this.addUser}>
                    <h1>Add New Client</h1>
                    <div>
                        <label htmlFor="username">
                            Name:
              <input
                                type="text"
                                name="username"
                                value={this.state.username}
                                onChange={this.handleInputChangeFor('username')}
                            />
                        </label>
                    </div>
                    <div>
                        <label htmlFor="password">
                            Password:
              <input
                                type="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleInputChangeFor('password')}
                            />
                        </label>
                    </div>
                    <div>
                        <input
                            className="adduser"
                            type="submit"
                            name="submit"
                            value="Add User"
                        />
                    </div>
                </form>

            </div>
        );
    }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
    errors: state.errors,
});

export default connect(mapStateToProps)(AdminAddUser);

