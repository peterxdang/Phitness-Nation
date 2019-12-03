import React, { Component } from 'react';
import AddGoalModal from '../AddGoalModal/AddGoalModal';
import { connect } from 'react-redux';
import { styled } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { flexbox } from '@material-ui/system';
import EditGoalModal from '../EditGoalModal/EditGoalModal.js';
import DeleteGoalModal from '../DeleteGoalModal/DeleteGoalModal.js'

const mapStateToProps = reduxState => ({
    reduxState,
});
const MyCard = styled(Card)({
    background: '#84c8b9',
    border: 0,
    borderRadius: 3,
    width: "50%",
    padding: 10,
    margin: 5,
    fontSize: 16,
    display: flexbox,
    textAlign: "center",
    fontFamily: "'PT Sans Narrow', sans-serif;"
});
//allows a user to edit their goals
class Goals extends Component {

    //Display user's goals
    componentDidMount() {
        this.props.dispatch({ type: 'ADMIN_FETCH_GOALS', payload: this.props.userId })
    }

    render() {
        return (
            <>
                <h2>Short Term Goals:</h2>
                <div className="goals-display">
                    {this.props.reduxState.goals.goalsReducer.map((goal) => {
                        if (goal.type == 'short term') {
                            return (
                                <MyCard>{goal.description}
                                    <div className="goal-buttons">
                                        <div className="single-goal-button">
                                            <EditGoalModal goal={goal} />
                                        </div>
                                        <div className="single-goal-button">
                                            <DeleteGoalModal goal={goal} />
                                        </div>
                                    </div>
                                </MyCard>
                            )
                        }
                    }
                    )}
                    <AddGoalModal />
                </div>
                <h2>Long Term Goals:</h2>
                <div className="goals-display">
                    {this.props.reduxState.goals.goalsReducer.map((goal) => {
                        if (goal.type == 'long term') {
                            return (
                                <MyCard>{goal.description}
                                    <div className="goal-buttons">
                                        <div className="single-goal-button">
                                            <EditGoalModal goal={goal} />
                                        </div>
                                        <div className="single-goal-button">
                                            <DeleteGoalModal goal={goal} />
                                        </div>
                                    </div>
                                </MyCard>
                            )
                        }
                    }
                    )}
                    <AddGoalModal />
                </div>
                <h2>Completed Goals:</h2>
                <div className="goals-display">
                    {this.props.reduxState.goals.goalsReducer.map((goal) => {
                        if (goal.type == 'completed') {
                            return (
                                <MyCard>{goal.description}
                                    <div className="goal-buttons">
                                        <div className="single-goal-button">
                                            <EditGoalModal goal={goal} />
                                        </div>
                                        <div className="single-goal-button">
                                            <DeleteGoalModal goal={goal} />
                                        </div>
                                    </div>
                                </MyCard>
                            )
                        }
                    }
                    )}
                </div>
                <h2>Streaks:</h2>
                <h3>Current: {this.props.reduxState.user.current_streak}</h3>
                <h3>Longest: {this.props.reduxState.user.longest_streak}</h3>
            </>
        )
    }
}

export default connect(mapStateToProps)(Goals);