import React, { useEffect, } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AdminEditUserProfile from '../AdminEditUserProfile/AdminEditUserProfile';
import AdminEditUserGoals from '../AdminEditUserGoals/AdminEditUserGoals';
import AdminEditUserInjuries from '../AdminEditUserInjuries/AdminEditUserInjuries';
import { connect } from 'react-redux';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import HealingIcon from '@material-ui/icons/Healing';


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            <Box p={3}>{children}</Box>
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: '#84c8b9',
        width: "101%",
    },
    palette: {
        color: 'teal',
        textColor: 'teal',
        indicatorColor: 'teal'
    }
}));
const mapStateToProps = reduxState => ({
    reduxState,
});

//Tabs allowing admin to access user's goals, injuries and profile
export default connect(mapStateToProps)(function FullWidthTabs(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    //Store changed values in the local state
    //In material ui, values cannot exist without index
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    //Store changed index in the local state
    //In material ui, values cannot exist without index
    const handleChangeIndex = index => {
        setValue(index);
    };

    //Dispatch call to fetch user's information
    useEffect(() => {
        props.dispatch({ type: 'ADMIN_FETCH_USER', payload: props.userId })
    }, []);
    return (
        <div className={classes.root}>
            <AppBar position="static" color="default" className={classes.palette}>
                <Tabs
                    className={classes.palette}
                    value={value}
                    onChange={handleChange}
                    indicatorColor="inherit"
                    textColor="inherit"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab label="PROFILE" {...a11yProps(0)} className={classes.palette} icon={<ContactPhoneIcon className={classes.palette} />} />
                    <Tab label="GOALS" {...a11yProps(1)} className={classes.palette} icon={<TrendingUpIcon className={classes.palette} />} />
                    <Tab label="INJURIES" {...a11yProps(2)} className={classes.palette} icon={<HealingIcon className={classes.palette} />} />
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0} dir={theme.direction}>
                    <AdminEditUserProfile userId={props.userId} />
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <AdminEditUserGoals userId={props.userId} />
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                    <AdminEditUserInjuries userId={props.userId} />
                </TabPanel>
            </SwipeableViews>
        </div>
    );
})