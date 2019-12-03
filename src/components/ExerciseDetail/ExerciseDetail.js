import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import swal from 'sweetalert';


class ExerciseDetail extends Component {

    state = {
        editToggle: false,
        exerciseId: this.props.match.params.id,
        exercise: {
            name: '',
            default_sets: '',
            default_reps: '',
            default_weight: '',
            links: '',
            units: ''
        }
    }

    componentDidMount() {
        this.exerciseDetail();
    }

    //getting exercise details to display
    exerciseDetail = () => {
        axios.get(`/api/admin/exerciseDetail/${this.state.exerciseId}`).then((response) => {
            this.setState({
                exercise: {
                    name: response.data.name,
                    default_sets: response.data.default_sets,
                    default_reps: response.data.default_reps,
                    default_weight: response.data.default_weight,
                    links: response.data.links,
                    units: response.data.units
                }
            });
        }).catch((error) => {
            console.log('Error adding exercise', error)
        });
    }

    //saving edit changes in the local state
    exerciseInputChange = (event, propertyName) => {
        this.setState ({
            exercise: {
                ...this.state.exercise,
                [propertyName]: event.target.value
            }
        });
    }

    //On-click function allowing admin to edit exercise details
    allowExerciseEdit = (toggle) => {
        this.setState({
            editToggle: toggle
        })

    }

    //Saving changes made when editing exercise's detail
    saveExerciseChanges = () => {
        axios.put(`/api/admin/exerciseDetail/${this.state.exerciseId}`, this.state.exercise).then((response) => {
            swal("Saved!", "Edit Exercise Complete");
            this.allowExerciseEdit(false);
        }).catch((err) => {
            console.log('error when updating exercise details', err)
        })
    }

    render() {
        return (
            <div>
                <h1>Exercise Detail</h1>
            
                {(!this.state.editToggle) ?
                    <div>
                        <h1>{this.state.exercise.name}</h1>
                        <p>{this.state.exercise.default_weight}lbs</p>
                        <p>Sets: {this.state.exercise.default_sets}</p>
                        <p>{this.state.exercise.default_reps}{this.state.exercise.units}</p>
                        <p>Link: {this.state.exercise.links}</p>
                        <button onClick={() => this.props.history.push('/admin')}>Back</button>
                        <button onClick={() => this.allowExerciseEdit(true)}>Edit</button>
                    </div> :
                    <div>
                        <input onChange = {(event) => this.exerciseInputChange(event, 'name')} defaultValue ={this.state.exercise.name}/>
                        <input onChange = {(event) => this.exerciseInputChange(event, 'default_weight')} defaultValue ={this.state.exercise.default_weight}/><span> lbs</span>
                        <input onChange = {(event) => this.exerciseInputChange(event, 'default_sets')} defaultValue ={this.state.exercise.default_sets}/>
                        <input onChange = {(event) => this.exerciseInputChange(event, 'default_reps')} defaultValue ={this.state.exercise.default_reps}/>
                        <input onChange = {(event) => this.exerciseInputChange(event, 'exercise.units')} defaultValue ={this.state.exercise.units}/>
                        <input onChange = {(event) => this.exerciseInputChange(event, 'links')} defaultValue = {this.state.exercise.links}/>
                        <button onClick={() => this.allowExerciseEdit(false)}>Cancel</button>
                        <button onClick={() => this.saveExerciseChanges()}>Save</button>
                    </div>
                }
            </div>
        )
    }
}


const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(ExerciseDetail);