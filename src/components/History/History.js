import React, { Component } from 'react';
import { connect } from 'react-redux';

import Select from 'react-select';
import TextField from '@material-ui/core/TextField';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const MyTextField = styled(TextField)({
    padding: 10,
    margin: 5,
    textAlign: "center"
});
//shows the history of exercises to users
class History extends Component {
    state = {
        user_id: this.props.reduxState.user.id,
        listExercises: [],
        tempExercise: ""
    }
    componentDidMount = () => {
        this.getExercises();
    }

    //Fetching user's list of exercises and insert it as options in the select box
    getExercises = () => {
        this.props.dispatch({ type: 'FETCH_USER_EXERCISE_LIST', payload: this.state.user_id });
        setTimeout(() => {
            this.props.reduxState.userExerciseReducer.map((exercise) => {
                this.setState({ listExercises: [...this.state.listExercises, { value: exercise.id, label: exercise.name }] })
            })
        }, 100)
    }

    //Storing value in select box in local store to fetch workout history
    handleSelectChange = (value) => {
        if(value != null){
            this.setState({
                tempExercise: value.label
            })
        }else{
            this.setState({
                tempExercise: ''
            })
        }
    };

    //fetch workout history
    submitFunction = () => {
        this.props.dispatch({ type: 'FETCH_USER_EXERCISE_HISTORY', payload: this.state.tempExercise });
    }

    render() {
        return (
            <div className="history-wrapper">
                <h1>Workout History</h1>
                {/* {JSON.stringify(this.state)}
            {JSON.stringify(this.props.reduxState)} */}

                <Select
                    isClearable
                    onChange={this.handleSelectChange}
                    options={this.state.listExercises}
                />

                <Button
                    variant="contained"
                    onClick={this.submitFunction}>
                    Search
            </Button>
                <table className="admin-exercises">
                    <tbody>
                        {this.props.reduxState.userExerciseHistoryReducer.map((exercise) => {
                            return (<tr className="admin-exercises-tr">
                                <td className="admin-exercises-td">week {exercise.week}</td>
                                <td className="admin-exercises-td">{exercise.completed_weight}lbs</td>
                                <td className="admin-exercises-td">{exercise.completed_sets}sets</td>
                                <td className="admin-exercises-td">{exercise.completed_reps}reps</td>
                            </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}
const mapStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapStateToProps)(History);