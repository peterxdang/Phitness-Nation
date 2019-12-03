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
  fontSize: 100,
  display: flexbox,
  textAlign: "left",
});
//when a user clicks on a weeks they will see this page with the completed and incompleted workouts
class  WorkoutsPage extends Component {
  
  componentDidMount = () => {
    this.props.dispatch({ type: 'FETCH_WORKOUTS' });
  }

  render() {
    return (
      <div>
        <h1>Your Workouts For Week {this.props.match.params.id}</h1>
        <h2>Incomplete:</h2>
        {this.props.reduxState.workouts.workoutsReducer.map((workout) => {
          if (workout.week == this.props.match.params.id && workout.complete == false){
          return (
            <>
            <MyCard className="workout-weeks" onClick={(props) => this.props.history.push(`/preview/${workout.id}`)}>
              <div>
                <h4>Workout {workout.id}</h4>
              </div>
            </MyCard>
            </>
          )
          }
        })}

        <h2>Complete:</h2>
        {this.props.reduxState.workouts.workoutsReducer.map((workout) => {
          if (workout.week == this.props.match.params.id && workout.complete == true) {
            return (
              <>
                <MyCard className="workout-weeks" onClick={(props) => this.props.history.push(`/preview/${workout.id}`)}>
                  <div>
                    <h4>Workout {workout.id}</h4>
                  </div>
                </MyCard>
              </>
            )
          }
        })}
      </div>
    );
  }
}
const mapStateToProps = reduxState => ({
  reduxState,
});
export default connect(mapStateToProps)(WorkoutsPage);