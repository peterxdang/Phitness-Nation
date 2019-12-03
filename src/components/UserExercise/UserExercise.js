import React, { Component } from 'react';
import { connect } from 'react-redux';
import { styled } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { flexbox } from '@material-ui/system';
import Slider from '@material-ui/core/Slider';
import { ProgressBar } from 'react-bootstrap';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Radio from '@material-ui/core/Radio';

const MySlider = styled(Slider)({
    color: '#3d6363',
})

const MyCard = styled(Card)({
    background: '#d2d2d4',
    border: 0,
    borderRadius: 3,
    // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    // // color: 'white',
    // height: 60,
    width: "100%",
    padding: 15,
    margin: 5,
    fontSize: 24,
    display: flexbox,
    textAlign: "center",
});

//page that walks the user through a workout with the exercise information
class UserExercise extends Component {

    state = {
        exerciseId: 0,
        workoutId: 0,
        exerciseOrder: 0,
        weightAchieved: 0,
        repsAchieved: 0,
        setsAchieved: 0,
        feedbackOpen: false,
        feedback: 0
    }

    handleClickOpen = () => {
        this.setState({
            ...this.state,
            feedbackOpen: true})
    };

    handleClose = () => {
        this.setState({
            ...this.state,
            feedbackOpen: false
        })
    };

    handleRadioChange = (event) => {
        this.setState({
            ...this.state,
            feedback: parseInt(event.target.value)
        })
    }

    handleSubmit = (idIn) => {
        this.props.dispatch({ type: 'UPDATE_EXERCISE_WORKOUTS', payload:{
            id: idIn,
            completed_reps: this.state.repsAchieved,
            completed_sets: this.state.setsAchieved,
            completed_weight: this.state.weightAchieved,
            feedback: this.state.feedback,
            completed: true}});
        this.handleClick();
        this.handleClose();
    }

    handleWeightChange = (name, value) => {
        let newWeight = parseInt(value.target.innerText)
        this.setState({ ...this.state, [name]: newWeight});
    };

    handleRepsChange = (name, value) => {
        let newReps = parseInt(value.target.innerText)
        this.setState({ ...this.state, repsAchieved: newReps });
    };

    handleSetsChange = (name, value) => {
        let newSets = parseInt(value.target.innerText)
        this.setState({ ...this.state, [name]: newSets });
    };

    handleClick = (props) => {
        if (this.state.exerciseOrder == this.props.reduxState.exerciseWorkouts.exerciseWorkoutReducer.length){
            this.props.history.push(`/summary/${this.state.workoutId}`)
        }
        else {
        this.props.history.push(`/exercise/${this.state.workoutId}-${this.state.exerciseOrder + 1}`);
        this.setState({...this.state,
            workoutId: this.state.workoutId,
            exerciseOrder: this.state.exerciseOrder +=1,
            weightAchieved: 0,
            repsAchieved: 0,
            setsAchieved: 0,
            feedback: 0
        })
    }
    }

    handleBack = (props) => {
            if (this.state.exerciseOrder == 1) {
                this.props.history.push(`/preview/${this.state.workoutId}`)
            }
            else {
                this.props.history.push(`/exercise/${this.state.workoutId}-${this.state.exerciseOrder - 1}`)
            }
        this.setState({...this.state,
            workoutId: this.state.workoutId,
            exerciseOrder: this.state.exerciseOrder -= 1
        })
    }

    componentDidMount = () => {
        let workoutExerciseIds = this.props.match.params.id.split('-')
        let workoutId = parseInt(workoutExerciseIds[0])
        let exerciseOrder = parseInt(workoutExerciseIds[1])
        this.setState({...this.state,
            workoutId: workoutId,
            exerciseOrder: exerciseOrder
        })
        this.props.dispatch({ type: 'FETCH_EXERCISE_WORKOUTS', payload: workoutId })
    }

    render() {
        return (
            <div className="exercise-page">
                {this.props.reduxState.exerciseWorkouts.exerciseWorkoutReducer.map((exercise) => {
                    if (exercise.order == this.state.exerciseOrder)
                    return (<>
                    <MyCard>
                            <h1>{exercise.name}</h1>
                                <h5>Weight: {exercise.assigned_weight} |
                                Reps / Duration: {exercise.assigned_reps} |
                                Sets: {exercise.assigned_sets}</h5>
                    < h3 > Instructor Notes:</h3 > {exercise.tips}
                    </MyCard>
                    <div className="exercise-feedback">
                    <h2>How did you do?</h2>
                        Weight: <MySlider
                            defaultValue={exercise.assigned_weight}
                            aria-labelledby="discrete-slider"
                            valueLabelDisplay="auto"
                            step={((exercise.assigned_weight)/5)}
                            marks
                            min={0}
                            max={(exercise.assigned_weight*1.5)}
                            onChange={(value) => this.handleWeightChange('weightAchieved', value)}
                            // valueLabelDisplay="on"
                        />
                        Reps / Duration: <MySlider
                            defaultValue={exercise.assigned_reps}
                            aria-labelledby="discrete-slider"
                            valueLabelDisplay="auto"
                            step={1}
                            marks
                            min={0}
                            max={(exercise.assigned_reps * 1.5)}
                            onChange={(value) => this.handleRepsChange('repsAchieved', value)}
                        // valueLabelDisplay="on"
                        />
                        Sets: <MySlider
                            defaultValue={exercise.assigned_sets}
                            aria-labelledby="discrete-slider"
                            valueLabelDisplay="auto"
                            step={1}
                            marks
                            min={0}
                            max={(exercise.assigned_sets * 1.5)}
                                onChange={(value) => this.handleSetsChange('setsAchieved', value)}
                        // valueLabelDisplay="on"
                        />
                        </div>
            <div className="exercise-buttons-wrapper">
            <button onClick={(props) => this.handleBack(props)}>BACK</button>
            <button onClick={this.handleClickOpen}>NEXT</button>
                <Dialog open={this.state.feedbackOpen} onClose={this.handleClose}>
                                <DialogTitle id="form-dialog-title">How did this exercise pheel?</DialogTitle>
                                <DialogContent>
                                    <Radio
                                        checked={this.state.feedback === 1}
                                        onChange={this.handleRadioChange}
                                        value="1"
                                        color="default"
                                        name="radio-button-demo"
                                    />
                                    <label>1</label>
                                    <Radio
                                        checked={this.state.feedback === 2}
                                        onChange={this.handleRadioChange}
                                        value="2"
                                        color="default"
                                        name="radio-button-demo"
                                    />
                                    <label>2</label>
                                    <Radio
                                        checked={this.state.feedback === 3}
                                        onChange={this.handleRadioChange}
                                        value="3"
                                        color="default"
                                        name="radio-button-demo"
                                    />
                                    <label>3</label>
                                    <Radio
                                        checked={this.state.feedback === 4}
                                        onChange={this.handleRadioChange}
                                        value="4"
                                        color="default"
                                        name="radio-button-demo"
                                    />
                                    <label>4</label>
                                    <Radio
                                        checked={this.state.feedback === 5}
                                        onChange={this.handleRadioChange}
                                        value="5"
                                        color="default"
                                        name="radio-button-demo"
                                    />
                                    <label>5</label>
                                </DialogContent>
                                <DialogActions>
                                    <button onClick={this.handleClose}>
                                        CANCEL
                                        </button>
                                    <button onClick={(event) => this.handleSubmit(exercise.id)}>
                                        SAVE
                                        </button>
                                </DialogActions>
                            </Dialog>
            </div>
                        <ProgressBar now={((this.state.exerciseOrder-1) / (this.props.reduxState.exerciseWorkouts.exerciseWorkoutReducer.length)*100)} />
                        <p>{(this.state.exerciseOrder-1)} out of {this.props.reduxState.exerciseWorkouts.exerciseWorkoutReducer.length} exercises complete!</p>
                </>
                    )
                })}
            </div>
        );
    }
}

const mapStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapStateToProps)(UserExercise);