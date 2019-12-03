import React, { Component } from 'react';
import { connect } from 'react-redux';
import './weeksPage.css';
import { styled } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { flexbox } from '@material-ui/system';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';

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
const MyTextField = styled(TextField)({
  padding: 10,
  margin: 5,
  textAlign: "center",
  fontFamily: 'PT Sans Narrow',
});
//renders the weeks for the user so they can choose which one to start
class  UserDashboard extends Component {

  state = {
    filterValue: ''
  }

  componentDidMount = () => {
    this.props.dispatch({type: 'FETCH_WORKOUTS'});
  }
  setFilter = (event) =>{
    this.setState({ filterValue: event.target.value})
  }
  render() {
    const weeksArray = []
    this.props.reduxState.workouts.workoutsReducer.map((workout) => {
        weeksArray.push(workout.week)
      })
   let weeksArrayObject = new Set(weeksArray)
    let newWeeksArray = [...weeksArrayObject]
    return (
      <div className="weeks-page">
        <h1>Workouts by Week</h1>
            <MyTextField
                label="Search Weeks"
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
        {newWeeksArray.map((week) => {
          if(week == this.state.filterValue){
            return(
              <MyCard className="workout-weeks" onClick={(props) => this.props.history.push(`/workouts/week/${week}`)}>
                <div>
                  <h4>Week {week}</h4>
                </div>
              </MyCard>
            )
          }else if( this.state.filterValue === ''){
            return(
              <MyCard className="workout-weeks" onClick={(props) => this.props.history.push(`/workouts/week/${week}`)}>
                <div>
                  <h4>Week {week}</h4>
                </div>
              </MyCard>
            )
          }
          })
        }
      </div>
    );
  }
}
const mapStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapStateToProps)(UserDashboard);