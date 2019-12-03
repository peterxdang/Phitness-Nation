import React, { Component } from 'react';
import { connect } from 'react-redux';
import { styled } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { flexbox } from '@material-ui/system';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const MyCard = styled(Card)({
    background: '#d2d2d4',
    border: 0,
    borderRadius: 3,
    width: "100%",
    padding: 10,
    fontSize: 100,
    height: "100%",
    textAlign: "center",
    fontFamily: 'PT Sans Narrow'
});
const MyTextField = styled(TextField)({
    padding: 10,
    margin: 5,
    textAlign: "center"
});
//renders the exercise in the workout card and dialog to edit the exercise
class ExerciseWorkoutCard extends Component {
    state = {
        open: false,
        confirm: false,
    }
    componentDidMount = () =>{
        this.setExercises();
    }
    setExercises = () =>{
        this.setState({ ...this.props.exercise })
    }
    setOpen = () =>{
        this.setState({ open: true })
    }
    setClose = () =>{
        this.setState({ open: false })
    }
    handleChange = (event, propertyName) =>{
        this.setState({ [propertyName]: event.target.value })
    }
    handleSubmit = () =>{
        this.props.dispatch({ 
            type: 'ADMIN_UPDATE_EXERCISE_WORKOUTS', 
            payload: {
                user_id: this.props.userId,
                exercise: {
                    id: this.state.id, 
                    assigned_reps: this.state.assigned_reps, 
                    assigned_sets: this.state.assigned_sets, 
                    tips: this.state.tips 
                }
            }
        })
        this.setClose();
    }
    handleDelete = () =>{
        this.props.dispatch({ type: 'DELETE_EXERCISE_WORKOUTS', payload: {id: this.state.id, user_id: this.props.userId }})
        this.confirmToggle();
    }
    confirmToggle = () =>{
        this.setState({confirm: !this.state.confirm })
    }
    render() {
        return (
            <>
            <div className="exercise-workout-card">
                <MyCard>
                    <div className="exercise-workout-int">
                    <Typography>{this.props.exercise.name}: {this.state.tips}</Typography>
                    <EditIcon onClick = {this.setOpen}/>
                    <DeleteIcon onClick = {this.confirmToggle}/>
                    </div>
                </MyCard>
                </div>
                <Dialog
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.setClose}
                >
                    <DialogTitle id="form-dialog-title"><h1>Exercise Overview:</h1></DialogTitle>
                    <DialogContent>
                        <MyTextField
                            label="Sets"
                            value={this.state.assigned_sets}
                            onChange={(event) => this.handleChange(event, 'assigned_sets')}
                            margin="normal"
                        />
                        <MyTextField
                            label="Reps"
                            value={this.state.assigned_reps}
                            onChange={(event) => this.handleChange(event, 'assigned_reps')}
                            margin="normal"
                        />
                        <MyTextField
                            label="Weight"
                            value={this.state.assigned_weight}
                            onChange={(event) => this.handleChange(event, 'assigned_weight')}
                            margin="normal"
                        />
                        <MyTextField
                            multiline={true}
                            rows={2}
                            rowsMax={4}
                            fullWidth
                            label="Tips"
                            value={this.state.tips}
                            onChange={(event) => this.handleChange(event, 'tips')}
                            margin="normal"
                        />
                <Dialog
                    disableBackdropClick
                    disableEscapeKeyDown
                    maxWidth="xs"
                    aria-labelledby="confirmation-dialog-title"
                    open={this.state.confirm}
                    >
                    <DialogTitle id="confirmation-dialog-title">Phone Ringtone</DialogTitle>
                    <DialogContent dividers>
                    <Typography>Are you sure you want to delete this exercise?</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={this.confirmToggle} color="primary">
                        Cancel
                        </Button>
                        <Button onClick={this.handleDelete} color="primary">
                        Ok
                        </Button>
                    </DialogActions>
                   </Dialog>
                        Completed Sets: {this.state.completed_sets}
                        <br></br>
                        Completed Reps: {this.state.completed_reps}
                        <br></br>
                        Completed Weight: {this.state.completed_weight}
                        <br></br>
                        Feedback: {this.state.feedback}
                        <br></br>
                        <button onClick={this.handleSubmit}>
                            SAVE CHANGES
                        </button>
                        <button onClick = {this.setClose }>
                            CANCEL
                        </button>
                   </DialogContent>
                </Dialog>
            </>
        )
    }
}
const mapStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapStateToProps)(ExerciseWorkoutCard);