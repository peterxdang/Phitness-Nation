import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { withRouter } from 'react-router-dom';
import { styled } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { flexbox } from '@material-ui/system';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';


const MyTextField = styled(TextField)({
    padding: 10,
    margin: 5,
    textAlign: "center",
    fontFamily: 'PT Sans Narrow',
});
const MyCard = styled(Card)({
    background: '#d2d2d4',
    border: 0,
    borderRadius: 3,
    height: 200,
    width: 150,
    padding: 10,
    margin: 5,
    fontSize: 16,
    display: flexbox,
    textAlign: "center",
    fontFamily: 'PT Sans Narrow'
});

const styles = {
    palette: {
        backgroundColor: "teal",
        color: "white"
    },
    fab: {
        width: "100%",
        position: "fixed",
        bottom: "0",
        height: "21%",
        left: "0%",
        size: "large"

    },
    add: {
        color: "white",
        fontSize: "large"
    },
    bigAvatar: {
        width: "200%",
        height: "200%"
    }
};
//lets admin see the list of users
class AdminUserList extends Component {

    state = {
        listUser: [],
        newUserOpen: false,
        newPhilOpen: false,
        phil: '',
        username: '',
        password: '',
        selectedId: '',
        philosophy: '',
        filterValue: '',
    }


    //Allowing Admin to add user to their user's list
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
            this.handleNewUserClose();
            this.listUsers();
        } else {
            this.props.dispatch({ type: 'REGISTRATION_INPUT_ERROR' });
        }
    } // end registerUser

    //Storing input changes in the local state for new user
    handleInputChangeFor = propertyName => (event) => {
        this.setState({
            [propertyName]: event.target.value,
        });
    }
    //Displaying list of users
    componentDidMount() {
        this.listUsers();
    }

    //Axios request to storing list of users array in the local state
    listUsers = () => {
        axios.get('/api/admin').then((response) => {
            console.log("grabbing user list:", response.data)
            this.setState({
                ...this.state,
                listUser: response.data
            })
        })
    }
    //Activate newUser modal
    handleNewUserOpen = () => {
        this.setState({
            ...this.state,
            newUserOpen: true,
        })
    }
    //Deactivate newUser modal
    handleNewUserClose = () => {
        this.setState({
            ...this.state,
            newUserOpen: false
        });
        this.listUsers();
        this.props.dispatch({ type: 'SET_TO_ADD_USER_MODE' });

    }

    //Add admin's philosophy for the user
    addPhil = (event) => {
        event.preventDefault();
        if (this.state.philosophy) {
            this.props.dispatch({
                type: 'ADD_PHIL',
                payload: {
                    philosophy: this.state,
                },
            })
            this.handleNewPhilClose();
        } return
    }

    //Storing edited changes to admin's philosophy in the local state
    handleInputChangeForPhil = propertyName => (event) => {
        this.setState({
            [propertyName]: event.target.value,
        });
    }

    //Activate philosophy modal
    handleNewPhilOpen = () => {
        this.setState({
            newPhilOpen: true,
        })
    }
    //Deactivate philosophy modal
    handleNewPhilClose = () => {
        this.setState({
            newPhilOpen: false,
        });
    }

    //Directing admin to user's information page
    //Dispatch call to store user's information in the reduxState
    fetchClientID = (event) => {
        this.props.dispatch({ type: 'ACCESS_USER_INFO', payload: event });
        this.props.history.push(`/adminviewuser/${event}`);
    }

    //Storing user/client's id and philosophy in the local state
    fetchClientIDPhil = (event) => {
        console.log(event.target);
        this.setState({
            selectedId: event.target.value,
        });
        this.handleNewPhilOpen();
        this.state.listUser.forEach(element => {
            if (element.id == event.target.value)
                this.setState({
                    philosophy: element.philosophy
                })
        })
    }

    //testing to see local state values
    test = () => {
        console.log(this.state);

    }
    //Filter feature to search for specific user from the list
    setFilter = (event) => {
        this.setState({ filterValue: event.target.value })
    }
    render() {
        return (
            <div className="clients-wrapper">
                <div style={{ display: 'inline' }}>
                    <MyTextField
                        label="Search Users"
                        value={this.state.filterValue}
                        onChange={this.setFilter}
                        margin="normal"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Fab style={styles.palette} aria-label="Add" onClick={() => this.handleNewUserOpen()}>
                        <AddIcon color={styles.palette.color} size="large" />
                    </Fab>
                </div>
                {this.state.listUser.map((user) => {
                    if (user.name.indexOf(this.state.filterValue) > -1) {
                        if (user.active === true) {
                            return (
                                <MyCard className="client-card-wrapper">
                                    <p><h1 className="client-header1">{user.name} ({user.username})</h1>
                                        <div className="client-profile-wrapper">
                                            <img onClick={() => { this.fetchClientID(user.id) }} className="bigAvatar" src={user.img} />
                                            {/* <button className="clientCard" onClick={this.fetchClientID} value={user.id} >USER PROFILE</button> */}
                                            <div className="add-phil-wrapper">

                                                <button value={user.id} aria-label="PHIL" onClick={this.fetchClientIDPhil}>
                                                    ADD PHILOSOPHY
                                            </button>
                                                <Dialog open={this.state.newPhilOpen} onClose={this.handleNewPhilClose} className="philolog">
                                                    <DialogTitle><h3>
                                                        Add New Philosophy:
                                                            </h3></DialogTitle>
                                                    <DialogContent >
                                                        <form onSubmit={this.addPhil}>
                                                            <textarea
                                                                rows="5"
                                                                name="phil"
                                                                placeholder={this.state.philosophy}
                                                                value={this.state.philosophy}
                                                                onChange={this.handleInputChangeForPhil('philosophy')}
                                                                className="newPhilInput"
                                                                className="philput"
                                                            />
                                                            <div className="newPhilBtnWrapper">
                                                                <input
                                                                    className="addPhil"
                                                                    type="submit"
                                                                    name="submit"
                                                                    value="ADD PHIL"
                                                                    className="newPhilBtns"
                                                                />
                                                                <input
                                                                    type="button"
                                                                    value="CANCEL"
                                                                    className="newPhilBtns"
                                                                    onClick={(e) => this.handleNewPhilClose()}
                                                                />
                                                            </div>
                                                        </form>
                                                    </DialogContent>
                                                </Dialog>
                                            </div>
                                        </div>
                                    </p>
                                </MyCard>
                            )
                        }
                    }
                    else if (this.state.filterValue === '') {
                        if (user.active === true) {
                            return (
                                <MyCard className="client-card-wrapper">
                                    <p><h1 className="client-header1">{user.name} ({user.username})</h1>
                                        <div className="client-profile-wrapper">
                                            <button className="clientCard" onClick={this.fetchClientID} value={user.id} >USER PROFILE</button>
                                            <div className="add-phil-wrapper">
                                                <button value={user.id} aria-label="PHIL" onClick={this.fetchClientIDPhil}>
                                                    ADD PHILOSOPHY
                                            </button>
                                                <Dialog open={this.state.newPhilOpen} onClose={this.handleNewPhilClose}  >
                                                    <DialogTitle id="form-dialog-title"><h1>Add New philosophy:</h1></DialogTitle>
                                                    <DialogContent >
                                                        {this.props.errors.registrationMessage && (
                                                            <h2
                                                                className="alert"
                                                                role="alert"
                                                            >
                                                                {this.props.errors.registrationMessage}
                                                            </h2>
                                                        )}
                                                        <form onSubmit={this.addPhil}>
                                                            <div>

                                                                <label htmlFor="phil">
                                                                    Philosophy:
                                                                <input
                                                                        type="text"
                                                                        name="phil"
                                                                        placeholder={this.state.philosophy}
                                                                        value={this.state.philosophy}
                                                                        onChange={this.handleInputChangeForPhil('philosophy')}
                                                                        className="newPhilInput"
                                                                    />
                                                                </label>
                                                            </div>
                                                            <div>
                                                                <input
                                                                    className="addPhil"
                                                                    type="submit"
                                                                    name="submit"
                                                                    value="ADD PHIL"
                                                                    className="newUserBtns"
                                                                />
                                                                <input
                                                                    type="button"
                                                                    value="CANCEL"
                                                                    className="newUserBtns"
                                                                    onClick={(e) => this.handleNewPhilClose()}
                                                                />
                                                            </div>
                                                        </form>
                                                    </DialogContent>
                                                </Dialog>
                                            </div>
                                        </div>
                                    </p>
                                </MyCard>
                            )
                        }
                    }
                })}
                <div className="add-client-wrapper">
                    <Dialog open={this.state.newUserOpen} onClose={this.handleNewUserClose}>
                        <DialogTitle id="form-dialog-title"><h1>Add New User:</h1></DialogTitle>
                        <DialogContent>
                            {this.props.errors.registrationMessage && (
                                <h2
                                    className="alert"
                                    role="alert"
                                >
                                    {this.props.errors.registrationMessage}
                                </h2>
                            )}
                            <form onSubmit={this.addUser}>
                                <div>
                                    <label htmlFor="username">
                                        Name:
                                        <input
                                            type="text"
                                            name="username"
                                            value={this.state.username}
                                            onChange={this.handleInputChangeFor('username')}
                                            className="newUserInput"
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
                                            className="newUserInput"
                                        />
                                    </label>
                                </div>
                                <div>
                                    <input
                                        className="adduser"
                                        type="submit"
                                        name="submit"
                                        value="ADD USER"
                                        className="newUserBtns"
                                    />
                                    <input
                                        type="button"
                                        value="CANCEL"
                                        className="newUserBtns"
                                        onClick={(e) => this.handleNewUserClose()}
                                    />
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    errors: state.errors,
});

export default withRouter(connect(mapStateToProps)(AdminUserList));