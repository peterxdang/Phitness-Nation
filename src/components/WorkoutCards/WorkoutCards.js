import React, { Component } from 'react';
import { connect } from 'react-redux';
import { styled } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { flexbox } from '@material-ui/system';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DoneIcon from '@material-ui/icons/Done';
import axios from 'axios';
import ExerciseWorkoutCard from '../ExerciseWorkoutCard/ExerciseWorkoutCard';
import AddExerciseToWorkout from '../AddExerciseToWorkout/AddExerciseToWorkout';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import './WorkoutCards.css'

const MyCard = styled(Card)({
  background: '#d2d2d4',
  border: 0,
  borderRadius: 3,
  width: "100%",
  height: "20%",
  justifyContent: "center",
  padding: 10,
  margin: 5,
  fontSize: 100,
  display: flexbox,
  textAlign: "center",
});

const MyExpansionPanel = styled(ExpansionPanel)({
    width: "100%",
    flexDirection: 'column'
});

//renders expansion panels for the admin to see the weeks, workouts, and finally the exercises for each user
class WorkoutCards extends Component {
    state = {
        
    }

    getExercises = () =>{
        axios.get('/api/admin/exercises')
    }
    render() {
        return (
            <div>
            {this.props.reduxState.workouts.workoutsReducer.map((week) => {
                return(
                    <div>
                    <MyExpansionPanel>
                        <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                        <Typography>Week {week.week}</Typography>
                        </ExpansionPanelSummary>
                        {week.workouts ? 
                        <ExpansionPanelDetails>
                            <div className="expansion-wrapper">
                            {week.workouts.map((workout) =>{
                                return(
                                    <div className="expansion-single">
                                    <MyExpansionPanel>
                                        <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                        >
                                        <Typography>Workout {workout.id}: {workout.feedback}</Typography>
                                        </ExpansionPanelSummary>
                                            <ExpansionPanelDetails>
                                                <div className="exercise-workout-card-wrapper">
                                            {workout.exercises ?
                                            <>
                                            {workout.exercises.map((exercise) =>{
                                                return(
                                                    <ExerciseWorkoutCard
                                                    userId = {this.props.userId} exercise = {exercise}/>
                                                )
                                            })}
                                      
                                            </>
                                            : '' }
                                            <div className="add-ex-wrapper">
                                            <AddExerciseToWorkout workout_id = {workout.id} userId = {this.props.userId} order = {workout.exercises ? workout.exercises.length : 1}/>
                                                    </div>
                                            </div>
                                        </ExpansionPanelDetails>
                                    </MyExpansionPanel>
                                    </div>
                                )
                            })}
                            </div>
                        </ExpansionPanelDetails>
                        : '' }
                    </MyExpansionPanel>
                    <br/>
                    </div>
                )})
            }   
        </div>
        );
    }
}
const mapStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapStateToProps)(WorkoutCards);