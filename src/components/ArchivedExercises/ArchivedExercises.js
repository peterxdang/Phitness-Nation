import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import swal from 'sweetalert';
import { styled } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { flexbox } from '@material-ui/system';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';

const MyCard = styled(Card)({
    background: '#d2d2d4',
    border: 0,
    borderRadius: 3,
    // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    // // color: 'white',
    height: "70%",
    width: "47%",
    padding: 10,
    margin: 5,
    fontSize: 16,
    display: flexbox,
    fontFamily: 'PT Sans Narrow'
});
const MyTextField = styled(TextField)({
    padding: 10,
    margin: 5,
    textAlign: "center",
    fontFamily: 'PT Sans Narrow',
  });
//renders the archived exercises
class ArchivedExercises extends Component {

    state = {
        listExercises: [],
        deleteOpen: false,
        exerciseToDelete: 0,
        filterValue: '',
    }

    componentDidMount() {
        this.listExercises();
    }

    permanentlyDeleteExercise = (id) => {
        console.log('the id to delete is:', id)
        this.props.dispatch({ type: 'PERMANENTLY_DELETE_EXERCISE', payload: id });
        this.listExercises();
        this.handleDeleteClose();
    }

    handleDeleteOpen = (id) => {
        this.setState({
            ...this.state,
            deleteOpen: true,
            exerciseToDelete: id
        })
    };

    handleDeleteClose = () => {
        this.setState({
            ...this.state,
            deleteOpen: false
        })
    };

    listExercises = () => {
        const active = false;
        axios.get(`/api/admin/exercise/${active}`).then((response) => {
            console.log("grabbing exercise list:", response.data)
            this.setState({...this.state,
                listExercises: response.data
            })
        })
    }


    //Reactivate exercise, allow admin to reactivate exercise in library
    reactivateExercise = (exercise, archive) => {
        const active = {active: archive};
        axios.put(`/api/admin/exerciseArchive/${exercise.id}`, active).then((response) => {
            swal("Updated!", "Reactivate Exercise Complete");
            this.listExercises();
        }).catch((err) => {
            console.log('error when archiving exercise', err)
        })
    }
    setFilter = (event) =>{
        this.setState({ filterValue: event.target.value})
    }
    render() {
        return (
            <div>
                 <div>
                 <MyTextField
                    label="Search Exercises"
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
                        {this.state.listExercises.map((exercise) => {
                            if(exercise.name.indexOf(this.state.filterValue) > -1){
                                if (exercise.active === false) { 
                                return (
                                    <MyCard>
                                        <div key={exercise.id}>
                                            <h5 className="styled-h5">Name:</h5> {exercise.name} <br />
                                            <button className="archived-btns" onClick={() => this.reactivateExercise(exercise, true)}>REACTIVATE</button>
                                            <button className="archived-btns" onClick={() => this.handleDeleteOpen(exercise.id)}>PERMANENTLY DELETE</button><br /><br />
                                        </div>
                                    </MyCard>
                                );
                                }
                            }else if(this.state.filterValue === ''){
                                if (exercise.active === false) { 
                                    return (
                                        <MyCard>
                                            <div key={exercise.id}>
                                                <h5 className="styled-h5">Name:</h5> {exercise.name} <br />
                                                <button className="archived-btns" onClick={() => this.reactivateExercise(exercise, true)}>REACTIVATE</button>
                                                <button className="archived-btns" onClick={() => this.handleDeleteOpen(exercise.id)}>PERMANENTLY DELETE</button><br /><br />
                                            </div>
                                        </MyCard>
                                    );
                                } 
                            }
                        })}
                    <Dialog open={this.state.deleteOpen} onClose={this.deleteClose}>
                        <DialogTitle id="form-dialog-title"><h3>Are you sure you want to permanently delete this exercise?</h3></DialogTitle>
                        <DialogActions>
                            <button onClick={this.handleDeleteClose}>
                                CANCEL
                                        </button>
                            <button onClick={(e) => this.permanentlyDeleteExercise(this.state.exerciseToDelete)}>
                                YES
                                        </button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(ArchivedExercises);