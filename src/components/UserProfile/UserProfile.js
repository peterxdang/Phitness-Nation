import React, { Component } from 'react';
import UserTabs from '../UserTabs/UserTabs';
import './UserProfile.css';
import Placeholder from './Placeholder-Woman-img-1.jpg';
import { connect } from 'react-redux';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

const mapStateToProps = reduxState => ({
    reduxState,
});
//user profile where they can edit their information as well as injuries and goals
class Profile extends Component {

    state = {
        newDescription: {
            userId: this.props.reduxState.user.id,
            img: ''
        },
        img: null,
        open: false,
    }
    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_USER' })
        this.props.dispatch({ type: 'FETCH_INJURIES' })
        this.getImage();
    }

    getImage = () => {
        axios.get(`/api/user/profile/${this.state.newDescription.userId}`).then(
            (response) => {
                this.setState({
                    img: response.data.img
                })
            }
        ).catch((error) => {
            console.log('Error getting profile pic', error)
        })
    }
    setImg = (imgUrl) => {
        this.setState({
            newDescription: {
                ...this.state.newDescription,
                img: imgUrl
            }
        })
    }
    onChange = (e) => {
        let image = e.target.files;
        let reader = new FileReader();
        reader.readAsDataURL(image[0]);
        reader.onload = (e) => {
            const formData = { image: e.target.result }
            this.setImg(formData.image)
            console.log(formData.image)
        }
    }

    clickFunction = () => {
        this.props.dispatch({type: 'UPDATE_USER_IMG', payload: this.state.newDescription });
        this.toggleFunction();
        this.setState({
            newDescription: {
                ...this.state.newDescription,
                img: ''
            }
        });
        // axios.put('/api/user/profilePic', this.state.newDescription).then((response) => {
        //     this.setState({
        //         newDescription: {
        //             userId: this.props.reduxState.user.id,
        //             img: ''
        //         }
        //     })
        // }).catch((err) => {
        //     console.log('ERROR UPDATING USER PROFILE', err)
        // })
    }

    toggleFunction = () => {
        this.setState({
            open: !this.state.open
        })
    }

    render() {
        let value = 'test'
        return (
            <>
                {/* {JSON.stringify(this.state.img)} */}

                <Dialog
                    disableBackdropClick
                    disableEscapeKeyDown
                    maxWidth="xs"
                    aria-labelledby="confirmation-dialog-title"
                    open={this.state.open}
                >
                    <DialogTitle id="confirmation-dialog-title">Upload Image</DialogTitle>
                    <DialogContent dividers>
                    {(this.state.newDescription.img === '') ? <div></div> : <div><img src={this.state.newDescription.img} height="55%" width="55%"></img></div>}
                        <div onSubmit={this.onFormSubmit}>
                            <input type="file" name="file" onChange={(event) => this.onChange(event)} />
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={this.toggleFunction} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.clickFunction} color="primary">
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>
                <div className="placeholder-wrapper">
                    {(this.props.reduxState.user.img === null) ? <img onClick={() => this.toggleFunction()} className="placeholder" src={Placeholder}></img> : <img onClick={() => this.toggleFunction()} className="placeholder" src={this.props.reduxState.user.img} height="55%" width="55%"></img>}

                </div>
                <div>
                    <UserTabs />
                </div>
            </>
        )
    }
}

export default connect(mapStateToProps)(Profile);