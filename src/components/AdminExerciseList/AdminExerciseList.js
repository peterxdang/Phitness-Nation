import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { withRouter } from 'react-router-dom';
import swal from 'sweetalert';
import { styled } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';

const styles = {
    palette: {
        backgroundColor: "teal",
        color: "white",
        marginLeft: 50,
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
    }
};
const MyTextField = styled(TextField)({
    padding: 10,
    margin: 5,
    textAlign: "center",
    fontFamily: 'PT Sans Narrow',
});
//gets the list of the exercises for the admin to perform CRUD
class AdminExerciseList extends Component {

    state = {
        listExercises: [],
        newExerciseOpen: false,
        newExerciseName: '',
        newExerciseDescription: '',
        exerciseDescriptionOpen: false,
        exerciseDetails: {},
        editModal: false,
        updateName: '',
        updateDescription: '',
        filterValue: '',
    }

    //display list of admin's list of exercises
    componentDidMount() {
        this.listExercises();
    }

    //Store new Exercise name in the local state
    handleChange = (event) => {
        this.setState({
            ...this.state,
            newExerciseName: event.target.value,
        });
    }

    //Edit exercise changes stored in the local state
    handleUpdateName = (event) => {
        this.setState({
            ...this.state,
            updateName: event.target.value
        })
    }

    //storing exercise description value in the local state
    handleUpdateDescription = (event) => {
        this.setState({
            ...this.state,
            updateDescription: event.target.value
        })
    }

    //When selected on exercise, admin will be directed to exercise detail page
    exerciseDescription = (exercise) => {
        this.props.history.push(`/exerciseDetail/${exercise.id}`)
    }

    //Activate modal that allows admin to add new exercise to their list
    handleNewExerciseOpen = () => {
        this.setState({
            ...this.state,
            newExerciseOpen: true
        })
    }

    //Deactivate modal that allows admin to add new exercise to their list
    handleNewExerciseClose = () => {
        this.setState({
            ...this.state,
            newExerciseOpen: false
        })
    }

    //Activate modal for exercise description
    //display the exercise detail in the modal
    handleExerciseDescriptionOpen = (exercise) => {
        this.setState({
            ...this.state,
            exerciseDescriptionOpen: true,
            exerciseDetails: exercise
        })
    }

    //Deactivate modal for exercise description
    handleExerciseDescriptionClose = () => {
        this.setState({
            ...this.state,
            exerciseDescriptionOpen: false
        })
    }

    //Button that allows admin to edit exercise name and description
    //Admin activates the edit exercise modal
    setEditMode = () => {
        this.setState({
            ...this.state,
            editModal: true,
            updateName: this.state.exerciseDetails.name,
            updateDescription: this.state.exerciseDetails.links
        })
    }
    //Admin deactivate the edit exercise modal
    setEditModeFalse = () => {
        this.setState({
            ...this.state,
            editModal: false
        })
    }

    //Get request to dsplay admin's list of active exercises from their database library
    listExercises = () => {
        const active = true
        axios.get(`/api/admin/exercise/${active}`).then((response) => {
            this.setState({
                ...this.state,
                listExercises: response.data
            })
        })
    }

    //Dispatch call to add new exercise in admin's exercise list
    //Display updated exercise list on the page
    handleSubmit = () => {
        this.props.dispatch({ type: 'ADD_EXERCISE', payload: { name: this.state.newExerciseName, description: this.state.newExerciseDescription } });
        this.setState({
            ...this.state,
            newExerciseOpen: false
        });
        this.listExercises()
    }

    //Store exercise description changes in the local state
    addDescriptionChange = (event) => {
        this.setState({
            ...this.state,
            newExerciseDescription: event.target.value,
        });
    }

    //Save Exercise changes in the database
    //Deactivate the edit Modal and exercise description modal
    saveChanges = (idIn) => {
        this.props.dispatch({ type: 'EDIT_EXERCISE', payload: { id: idIn, name: this.state.updateName, links: this.state.updateDescription } })
        this.setState({
            ...this.state,
            editModal: false,
            exerciseDescriptionOpen: false
        });
        this.listExercises()
    }

    //allow admin to archive/deactivate exercises from the list of exercises
    archiveExercise = (exercise, archive) => {
        const active = { active: archive };
        axios.put(`/api/admin/exerciseArchive/${exercise.id}`, active).then((response) => {
            swal("Updated!", "Archiving Exercise Complete");
            this.listExercises();
        }).catch((err) => {
            console.log('error when archiving exercise', err)
        })
    }

    //admin can find particular exercises from input field
    setFilter = (event) => {
        this.setState({ filterValue: event.target.value })
    }

    render() {
        let editModal;
        if (this.state.editModal == false) {
            editModal = <><DialogContent>
                <h4 className="edit-ex-modal">Exercise Name:</h4>
                {this.state.exerciseDetails.name}
                <br></br>
                <br></br>
                <h4 className="edit-ex-modal">Description / Links: </h4>
                {this.state.exerciseDetails.links}
            </DialogContent>
                <DialogActions>
                    <button onClick={this.handleExerciseDescriptionClose}>
                        CLOSE
                            </button>
                    <button onClick={this.setEditMode}>
                        EDIT
                        </button>
                </DialogActions>
            </>
        } else {
            editModal = <>
                <DialogContent className="edit-exercise-modal" ><h4 className="edit-ex-modal">Exercise Name: </h4>
                    <input className="editExerciseInput"
                        onChange={this.handleUpdateName}
                        placeholder={this.state.exerciseDetails.name}></input>
                    <br></br>
                    <h4 className="edit-ex-modal">Description / Links: </h4>
                    <textarea className="editExerciseInput"
                        onChange={this.handleUpdateDescription}
                        placeholder={this.state.exerciseDetails.links}></textarea>
                </DialogContent>
                <DialogActions>
                    <button onClick={this.setEditModeFalse}>
                        CANCEL
                            </button>
                    <button onClick={(event) => this.saveChanges(this.state.exerciseDetails.id)}>
                        SAVE CHANGES
                        </button>
                </DialogActions>
            </>
        }

        return (
            <div className="admin-exercise-wrapper">
                <h4>Click the exercise to see details.</h4>
                <div>
                    <div style={{ display: 'inline' }}>
                        <MyTextField
                            label="Search Exercises"
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
                        <Fab style={styles.palette} aria-label="Add" onClick={() => this.handleNewExerciseOpen()}>
                            <AddIcon color={styles.palette.color} size="large" />
                        </Fab>
                    </div>
                    <table className="admin-exercises">
                        <tbody>
                            {this.state.listExercises.map((exercise) => {
                                if (exercise.name.indexOf(this.state.filterValue) > -1) {
                                    return (
                                        <>
                                            <tr key={exercise.id} className="admin-exercises-tr">
                                                <td className="admin-exercises-td" onClick={() => this.handleExerciseDescriptionOpen(exercise)}>{exercise.name}</td>
                                                <td className="admin-exercises-td">
                                                    <button className="archive-exercise" onClick={() => this.archiveExercise(exercise, false)}>ARCHIVE</button>
                                                </td>
                                            </tr>
                                        </>
                                    );
                                } else if (this.state.filterValue === '') {
                                    return (
                                        <>
                                            <tr key={exercise.id} className="admin-exercises-tr">
                                                <td className="admin-exercises-td" onClick={() => this.handleExerciseDescriptionOpen(exercise)}>{exercise.name}</td>
                                                <td className="admin-exercises-td">
                                                    <button className="archive-exercise" onClick={() => this.archiveExercise(exercise, false)}>ARCHIVE</button>
                                                </td>
                                            </tr>
                                        </>
                                    );
                                }
                            })}
                        </tbody>
                    </table>
                    <div className="add-exercise-wrapper">
                    </div>
                    <Dialog open={this.state.newExerciseOpen} onClose={this.handleNewExerciseClose}>
                        <DialogTitle id="form-dialog-title"><h3>Add New Exercise:</h3></DialogTitle>
                        <DialogContent>
                            New exercise name: <input className="newUserInput" onChange={this.handleChange}></input>
                            Description / links: <textarea className="editExerciseInput" onChange={this.addDescriptionChange} rows="4"></textarea>
                        </DialogContent>
                        <DialogActions>
                            <button onClick={this.handleNewExerciseClose}>
                                CANCEL
                                        </button>
                            <button onClick={this.handleSubmit}>
                                ADD EXERCISE
                                        </button>
                        </DialogActions>
                    </Dialog>
                    <Dialog className="edit-exercise-modal" open={this.state.exerciseDescriptionOpen} onClose={this.handleExerciseDescriptionClose}>
                        {editModal}
                    </Dialog>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user
});

export default withRouter(connect(mapStateToProps)(AdminExerciseList));