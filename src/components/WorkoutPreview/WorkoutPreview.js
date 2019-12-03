import React, { Component } from 'react';
import { connect } from 'react-redux';
import { styled } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { flexbox } from '@material-ui/system';


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
  fontSize:24,
  display: flexbox,
  textAlign: "center",
});

//this will give users a preview of the workout before they start it
class WorkoutPreview extends Component {
  componentDidMount = () => {
    this.props.dispatch({ type: 'FETCH_EXERCISE_WORKOUTS', payload: this.props.match.params.id})
  }
  render() {

    let firstExerciseArray = this.props.reduxState.exerciseWorkouts.exerciseWorkoutReducer.map((exercise) => {
      return exercise.id
    });

    let exerciseOrderArray = this.props.reduxState.exerciseWorkouts.exerciseWorkoutReducer.map((exercise) => {
      return exercise.order
    });

    return (
      <div className="workout-preview">
        <h1>Workout {this.props.match.params.id} Overview:</h1>
        {this.props.reduxState.exerciseWorkouts.exerciseWorkoutReducer.map((exercise) => {
          return (
            <MyCard>
              <h2>{exercise.name}</h2>
              Reps: {exercise.assigned_reps} | 
              Sets: {exercise.assigned_sets} |
                Weight: {exercise.assigned_weight}
            </MyCard>
          )
        })}
        <br/><br/>
        <div className="workout-preview-btns">
        <button onClick ={(props) => this.props.history.push(`/workouts/week/${this.props.match.params.id}`)}>BACK</button>
          <button onClick={(props) => this.props.history.push(`/exercise/${this.props.match.params.id}-${exerciseOrderArray[0]}`)}>BEGIN WORKOUT</button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapStateToProps)(WorkoutPreview);