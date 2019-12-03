import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './DropDrawer.css'
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import { styled } from '@material-ui/core/styles';
import { flexbox } from '@material-ui/system';
import HomeIcon from '@material-ui/icons/Home';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import InfoIcon from '@material-ui/icons/Info';
import AccountIcon from '@material-ui/icons/AccountCircle';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import AssessmentIcon from '@material-ui/icons/Assessment';

const MyMenu = styled(MenuIcon)({
    border: 0,
    borderRadius: 3,
    height: 50,
    display: "flexbox",
    justifyContent: "right",
    margin: 5,
    textAlign: "center",
    fontSize: 60,
    color: "#d2d2d4"
});

const MyIconButton = styled(IconButton)({
    border: 0,
    borderRadius: 3,
    height: 30,
    display: "flexbox",
    justifyContent: "right",
    margin: 5,
    paddingLeft: "80%",
});

const useStyles = makeStyles({
    list: {
        width: 145,
        backgroundColor: "#d2d2d4",
        height: '100%',
        fontFamily: 'PT Sans Narrow, sans-serif',
        fontSize: 24
    },
    fullList: {
        width: 'auto',
    },
});
//sidedrawer that opens when you hit the hamburger menu
function SideDrawer(props) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        right: false,
    });
    const toggleDrawer = (side, open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, [side]: open });
    };
    const sideList = side => (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(side, false)}
            onKeyDown={toggleDrawer(side, false)}
        >
            <List>
                {(props.user.username && !props.user.admin) ? <div>
                <ListItem component={Link} to="/home" button><HomeIcon className="icon" />Home</ListItem>
                    <ListItem component={Link} to="/profile" button><AccountIcon className="icon" />Profile </ListItem>
                    <ListItem component={Link} to="/weeks" button><FitnessCenterIcon className="icon" />Workouts</ListItem>
                <ListItem component={Link} to="/history" button><AssessmentIcon className="icon" />History</ListItem>
                </div>
                : (props.user.admin && props.user.username) ? <div>
                <ListItem component={Link} to="/admin" button><AccountIcon className="icon" />Home</ListItem>
                <ListItem component={Link} to="/archived" 
                    button><AccountIcon className="icon" />Archived
                </ListItem> </div>: <div></div>}
                <ListItem component={Link} to="/about" button><InfoIcon className="icon" />About</ListItem>
            </List>
            <Divider />
            {props.user.username ?
                <List>
                    <ListItem
                        component={Link} to="/home"
                        onClick={() => props.dispatch({ type: 'LOGOUT' })}
                        button>
                        Logout
                   </ListItem>
                </List>
                :
                <div></div>
            }
        </div>
    );
    return (
        <div className="drawer">
            <MyIconButton onClick={toggleDrawer('right', true)}><MyMenu/></MyIconButton>
            <Drawer anchor ="right" open={state.right} onClose={toggleDrawer('right', false)}>
                {sideList('right')}
            </Drawer>
        </div>
    );
}
const mapStateToProps = state => ({
    user: state.user,
});
export default connect(mapStateToProps)(SideDrawer);