import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import WorkoutCards from '../WorkoutCards/WorkoutCards';
import { ProgressBar } from 'react-bootstrap';
import {
    BarChart, CartesianGrid, XAxis, YAxis, Tooltip
    , Legend, Bar, Label
} from 'recharts';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

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
            width: "100%",
            fontFamily: 'PT Sans Narrow',
        },
        palette: {
            color: 'teal',
            textColor: 'teal',
            indicatorColor: 'teal'
        },
        fab: {
        backgroundColor: "teal",
        size: "large",
        color: "white",
    },
    add: {
        color: "teal",
        fontSize: "large"
    }
}));

const mapStateToProps = reduxState => ({
    reduxState,
});
//tabs for the admin to see the user information
export default connect(mapStateToProps)(function FullWidthTabs(props) {
    const user_id = props.params
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = index => {
        setValue(index);
    };

    let data = props.reduxState.exerciseWorkouts.complianceReducer

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Tabs
                    class={classes.palette}
                    value={value}
                    onChange={handleChange}
                    indicatorColor="inherit"
                    textColor="teal"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab className={classes.palette} label="WORKOUTS" {...a11yProps(0)} icon={<FitnessCenterIcon className={classes.palette} />} />
                    <Tab className={classes.palette} label="DATA" {...a11yProps(1)} icon={<TrendingUpIcon className={classes.palette}/>} />
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0} dir={theme.direction}>
                    <div className="add-workout-wrapper">
                    <Link to= {`/admin/addworkout/${props.userId}`}>
                        <Fab className={classes.fab} aria-label="Add">
                        <AddIcon color={classes.palette.color} size="large" />
                        </Fab>
                    </Link>
                    </div>
                    <br/>
                    <WorkoutCards userId = {props.userId}/>
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    {/* <UserGoals /> */}
                    <h4 className="admin-compliance-h4">Current Streak:</h4>
                    <div className="streak">
                        <ProgressBar now={props.reduxState.adminToUserReducer.adminEditUserReducer.current_streak} />
                        <p>{props.reduxState.adminToUserReducer.adminEditUserReducer.current_streak} workouts in a row!</p>
                    </div>
                    <h4 className="admin-compliance-h4">Longest Streak:</h4>
                    <div className="streak">
                        <ProgressBar now={props.reduxState.adminToUserReducer.adminEditUserReducer.longest_streak} />
                        <p>{props.reduxState.adminToUserReducer.adminEditUserReducer.longest_streak} workouts in a row!</p>
                    </div>
                    <h4 className="admin-compliance-h4">Compliance:</h4>
                    <div className="admin-compliance-chart">
                        <BarChart width={350} height={300} data={data}
                            margin={ {top: 15, right: 15, bottom: 15, left: 15 }}>
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
                </TabPanel>
            </SwipeableViews>
        </div>
    );
})