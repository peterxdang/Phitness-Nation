import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { styled } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
const mapStateToProps = reduxState => ({
    reduxState,
});

const useStyles = makeStyles(theme => ({
    palette: {
        backgroundColor: "teal",
        color: "white"
    },
    fab: {
        margin: theme.spacing(1),
        backgroundColor: "teal",
        color: "white"
    },
    button: {
        color: "teal"
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
}));
//modal to confirm that you want to delete a goal
export default connect(mapStateToProps)(function FormDialog(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const classes = useStyles();

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        props.dispatch({type: 'DELETE_GOAL', payload: props.goal.id})
        handleClose()
    }

    return (
        <div>
            <Fab className={classes.fab} aria-label="edit" onClick={handleClickOpen} size="small">
                <DeleteIcon />
            </Fab>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Are you sure you want to delete this goal?</DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose} className={classes.button}>
                        Cancel
          </Button>
                    <Button onClick={handleDelete} className={classes.button}>
                        Delete
             </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
})