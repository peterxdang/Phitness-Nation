import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './UserPage.css';
import { styled } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { flexbox } from '@material-ui/system';
import {ProgressBar} from 'react-bootstrap';
import {BarChart, CartesianGrid, XAxis, YAxis, Tooltip
, Legend, Bar, Label} from 'recharts';

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
  fontSize: 20,
  display: flexbox,
  textAlign: "left"
});
//user landing page
class UserPage extends Component{
  componentDidMount = () =>{
    this.getWorkouts();
  }
  getWorkouts = () =>{
    this.props.dispatch({ type: 'FETCH_WORKOUTS' })
    this.props.dispatch({ type:'FETCH_COMPLIANCE', payload: this.props.reduxState.user.id})
  }
  
  render() {
    let data = this.props.reduxState.exerciseWorkouts.complianceReducer

    return(
      <>
      <div className="user-page">
        <h1 >
          Welcome, { this.props.reduxState.user.name }!
        </h1>
          <MyCard>
            {this.props.reduxState.user.philosophy}—Phil
          </MyCard>
        <h3>
          Streak:
          </h3>
          <div className="streak">
              <ProgressBar now={this.props.reduxState.user.current_streak} />
            <p>{this.props.reduxState.user.current_streak} workouts in a row!</p>
            </div>
            <div className="compliance-chart">
          <BarChart width={300} height={300} data={data}>
            <CartesianGrid strokeDasharray="1 1" />
              <XAxis dataKey="week" >
                <Label value="Week Number" offset={0} position="insideBottom" />
              </XAxis>
              <YAxis label={{ value: 'Number of Exercises', angle: -90, position: 'insideBottomLeft' }} />
            <Legend />
            <Bar name="Completed Exercises" dataKey="completed" stackId="a" fill="#3d6363" />
              <Bar name="Incomplete Exercises" dataKey="incomplete" stackId="a" fill="#d2d2d4" />
          </BarChart>
          </div>
      </div>
      </>
    )
  }
}

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = reduxState => ({
  reduxState,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);
