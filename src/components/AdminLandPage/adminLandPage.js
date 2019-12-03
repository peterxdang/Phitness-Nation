import React, { Component } from 'react';
import AdminLandTabs from '../AdminLandTabs/AdminLandTabs';
import './Admin.css';

//Admin's main home page allowing admin to see list of users and exercises
class AdminLandPage extends Component {
    render() {
        return (
            <>
            <div className="admin-landing-wrapper">
                <AdminLandTabs />
            </div>
            </>
        )
    }
}

//OLD CODE FROM BEFORE TABS WERE CREATED
// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import axios from 'axios';
// import Fab from '@material-ui/core/Fab';
// import AddIcon from '@material-ui/icons/Add';
// import { confirmAlert } from 'react-confirm-alert';
// import 'react-confirm-alert/src/react-confirm-alert.css';
// import swal from 'sweetalert';

// const styles = {
//     palette: {
//         backgroundColor: "navy",
//         color: "white"
//     },
//     fab: {
//         width: "100%",
//         position: "fixed",
//         bottom: "0",
//         height: "21%",
//         left: "0%",
//         size: "large"

//     },
//     add: {
//         color: "white",
//         fontSize: "large"
//     }
// };

// export default Archived;
// class AdminLandPage extends Component {

//     state = {
//         clientId:'',
//         UsertoExercise: true,
//         listUser: [],
//         listExercises: [],
//         selecteduser: {
//             name: '',
//             pronouns: '',
//             phone: '',
//             email: '',
//             emergencyContactName: '',
//             emergencyContactPhone: '',
//             dateOfBirth: ''

//         }
//     }


//     componentDidMount() {
//         this.listUsers();
//         this.listExercises();
//     }





//     //TOGGLE betwen tabs: List of workouts and users
//     toggleTab = (toggle) => {
//         this.setState({
//             UsertoExercise: toggle
//         })
//     }
//     //GET  client id and sends to reducer  
//     fetchClientID = (event) => {
//         this.setState({
//             ...this.state.clientID,
//             clientID: event.target.value
//         })


//         this.props.dispatch({ type: 'ACCESS_USER_INFO', payload: event.target.value });
//         // this.props.dispatch({ type: 'ACCESS_USER_PROFILE', payload: event})
//         this.props.history.push(`/adminviewuser/${event.target.value}`);

//     }

//     //GET request displaying admin's list of clients (users)
//     listUsers = () => {
//         axios.get('/api/admin').then((response) => {
//             console.log("grabbing user list:", response.data)
//             this.setState({
//                 listUser: response.data
//             })
//         })
//     }

//     // onCick function directing Admin to exercise detail's page
//     exerciseDescription = (exercise) => {
//         this.props.history.push(`/exerciseDetail/${exercise.id}`)
//     }

//     addUserBtn = () => {
//         this.props.dispatch({ type: 'SET_TO_ADD_USER_MODE' });
//         this.props.history.push('/adminadduser')
//     }

//     listExercises = () => {
//         const active = true
//         axios.get(`/api/admin/exercise/${active}`).then((response) => {
//             this.setState({
//                 listExercises: response.data
//             })
//         })
//     }


//     deleteAlert = (exercise) => {
//         confirmAlert({
//             message: `Are you sure you want to delete this exercise?`,
//             buttons: [
//                 {
//                     label: 'Yes',
//                     onClick: () => this.deleteExerciseFunction(exercise)
//                 },
//                 {
//                     label: 'No',
//                 }
//             ]
//         })
//     };

//      //DELETE exercise from library in database
//      deleteExerciseFunction = (exercise) => {
//         axios.delete(`/api/admin/exerciseDetail/${exercise.id}`).then(() => {
//             this.listExercises();
//         }
//         ).catch((err) => {
//             alert('delete exercise from library error', err)
//         })
//     }

//     //Add Exercise button directing admin to addExercise Page
//     fabFunction = () => {
//         this.props.history.push('/addExercise');
//     }

//     //Archive exercise, allow admin to remove exercise from library
//     //but save it in archive component
//     archiveExercise = (exercise, archive) => {
//         const active = {active: archive};
//         axios.put(`/api/admin/exerciseArchive/${exercise.id}`, active).then((response) => {
//             swal("Updated!", "Archiving Exercise Complete");
//             this.listExercises();
//         }).catch((err) => {
//             console.log('error when archiving exercise', err)
//         })
//     }

//     render() {

//         return (
//             <div>
//                 {/* {JSON.stringify(this.state.listUser)} */}
//                 <div onClick={() => this.toggleTab(true)}>User</div>
//                 <div onClick={() => this.toggleTab(false)}>Workout</div>
//                 <button
//                     type="button"
//                     className="link-button"
//                     onClick={() => this.addUserBtn() }
//                 >
//                     Add User
//           </button>
//                 {(this.state.UsertoExercise) ?
//                     <div>
//                         <h1>User List</h1>
//                         {this.state.listUser.map((user) => {
//                             if (user.active === true) {
//                                 return (
//                                     <div key={user.id}>
//                                         <p>{user.name}<br/>
//                                         <button className="clientCard" onClick={this.fetchClientID} value={user.id} >USER PROFILE</button>
//                                         </p>
//                                     </div>
//                                 );
//                             }
//                         })}
//                         <Fab style={styles.palette} aria-label="Add" onClick={() => this.props.history.push('/adminadduser')}>
//                             <AddIcon color={styles.palette.color} size="large" />
//                         </Fab>
//                     </div>
//                     : <div>
//                         <h1>Exercise List</h1>
//                         <div><input placeholder = "Search Exercise"/> <button>Search</button></div>
//                         <table>
//                             <tbody>
//                                 {this.state.listExercises.map((exercise) => {
//                                     return (
//                                         <tr key={exercise.id}>
//                                             <td onClick={() => this.exerciseDescription(exercise)}>{exercise.name}</td>
//                                             <td>
//                                                 <button onClick={() => this.deleteAlert(exercise)}>Delete</button>
//                                                 <button onClick={() => this.archiveExercise(exercise, false)}>Archived</button>
//                                             </td>
//                                         </tr>
//                                     );
//                                 })}
//                             </tbody>
//                         </table>
//                         <Fab style={styles.palette} aria-label="Add" onClick={() => this.fabFunction()}>
//                             <AddIcon color={styles.palette.color} size="large" />
//                         </Fab>

//                     </div>}
//             </div>
//         );
//     }
// }


// const mapStateToProps = reduxStore => ({
//     reduxStore 
// });

export default AdminLandPage;