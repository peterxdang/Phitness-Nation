import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import { styled } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';


const mapStateToProps = reduxState => ({
    reduxState,
});

const MySelect = styled(Select)({
    padding: 10,
    margin: 5,
    textAlign: "center",
    width: "75%"
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

const MyTextField = styled(TextField)({
    padding: 10,
    margin: 5,
    width: "75%",
    textAlign: "center"
});
//modal that appears when you hit the plus button that allows you to add a goal
export default connect(mapStateToProps)(function FormDialog(props) {
    const [open, setOpen] = React.useState(false);

    const classes = useStyles();

    //activate/deactivate material UI modal
    const handleClickOpen = () => {
        setOpen(true);
    };

    //activate/deactivate material UI modal
    const handleClose = () => {
        setOpen(false);
    };

    //Dispatch call to post user's new goal
    const handleSubmit = () => {
        props.dispatch({ type: 'POST_GOAL', payload: values });
        handleClose()
    }

    //Defining the local state
    const [values, setValues] = React.useState({
        type: '',
        description: '',
    });

    //changed values entered in the dialog content stored in the local state
    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    return (
        <div>
            <Fab className={classes.fab} width="100%" onClick={handleClickOpen} size="small">
                <AddIcon size="small" />
            </Fab>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Goal</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <MySelect
                            value={values.type}
                            onChange={handleChange('type')}
                        >
                            <MenuItem value="">
                                <em></em>
                            </MenuItem>
                            <MenuItem value={"short term"}>Short Term</MenuItem>
                            <MenuItem value={"long term"}>Long Term</MenuItem>
                        </MySelect>
                        <FormHelperText>Short term or long term goal?</FormHelperText>
                        <MyTextField
                            label="Description"
                            value={values.description}
                            multiline
                            rowsMax="4"
                            onChange={handleChange('description')}
                            margin="normal"
                        />
                        <FormHelperText>Add a short description of your goal.</FormHelperText>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} className={classes.button}>
                        Cancel
          </Button>
                    <Button onClick={handleSubmit} className={classes.button}>
                        Save
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
})