import React, { Component } from 'react';
import { connect } from 'react-redux';
import { styled } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { flexbox } from '@material-ui/system';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const MyCard = styled(Card)({
  background: '#d2d2d4',
  border: 0,
  borderRadius: 3,
  // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  // // color: 'white',
  // height: 60,
  width: "100%",
  padding: 10,
  margin: 5,
  fontSize: 24,
  display: flexbox,
  textAlign: "center",
});
//when a user is done with a workout they will be directed here to get a summary of the work that they did
class WorkoutSummary extends Component {

  componentDidMount = () => {
    this.props.dispatch({ type: 'FETCH_EXERCISE_WORKOUTS', payload: this.props.match.params.id })
  }

  state = {
    feedback: 'Add any overall workout feedback you have here: what felt good, what felt not so good, what you liked, etc.',
    confirmOpen: false,
    userId: this.props.reduxState.user.id
  }

  handleClickOpen = () => {
    this.setState({
      ...this.state,
      confirmOpen: true
    })
  };

  handleClose = () => {
    this.setState({
      ...this.state,
      confirmOpen: false
    })
  };

  handleChange = (event) => {
    this.setState({
      feedback: event.target.value
    })
  }

  handleSubmit = () => {
    this.props.dispatch({ type: 'UPDATE_WORKOUTS', payload: {id: this.props.match.params.id, feedback: this.state.feedback}})
    this.props.dispatch({type: 'UPDATE_STREAK', payload: this.state.userId})
    this.props.history.push(`/home`)
  }

  render() {
    return (
      <div className="workout-summary">
        <h1 className="workout-summary-h1">Congratulations! You have completed this workout.</h1>
        <div className="workout-feedback-wrapper"><h3 className="workout-summary-h3">Workout Summary:</h3>
        </div>
        {this.props.reduxState.exerciseWorkouts.exerciseWorkoutReducer.map((exercise) => {
          return (
            <MyCard>
              <h4 className="workout-summary-h4">{exercise.name}</h4>
              Reps: {exercise.completed_reps} |
              Sets: {exercise.completed_sets} |
                Weight: {exercise.completed_weight}
                <br></br>
                Feedback: {exercise.feedback}
            </MyCard>
          )
        })}
        <div className="workout-feedback-wrapper">
        <h3 className="workout-summary-h3">Overall Feedback:</h3>
        </div>
        <div className="workout-feedback-wrapper">
        <textarea className="workout-feedback"
          placeholder={this.state.feedback}
          onChange={this.handleChange}
        />
        </div>
        <div className="submit-workout-btn">
          <button onClick={this.handleClickOpen}>SUBMIT WORKOUT</button>
          <Dialog open={this.state.confirmOpen} onClose={this.handleClose}>
            <DialogTitle id="form-dialog-title">Are you sure you would like to submit this workout?</DialogTitle>
            <DialogContent>
            </DialogContent>
            <DialogActions>
              <button onClick={this.handleClose}>
                CANCEL
                                        </button>
              <button onClick={this.handleSubmit}>
               YES
                                        </button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    );
  }
}
const mapStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapStateToProps)(WorkoutSummary);