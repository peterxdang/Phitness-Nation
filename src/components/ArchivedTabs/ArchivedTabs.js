import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ArchivedUsers from '../ArchivedUsers/ArchivedUsers'
import ArchivedExercises from '../ArchivedExercises/ArchivedExercises'

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
        fontFamily: 'PT Sans Narrow'
    },
    palette: {
        color: 'teal',
        textColor: 'teal',
        indicatorColor: 'teal'
    }
}));
//tabs that contain the archived users and the archived exercises
export default function FullWidthTabs() {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = index => {
        setValue(index);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Tabs
                    className={classes.palette}
                    value={value}
                    onChange={handleChange}
                    indicatorColor="inherit"
                    textColor="inherit"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab className={classes.palette} label="ARCHIVED USERS" {...a11yProps(0)} />
                    <Tab className={classes.palette} label="ARCHIVED EXERCISES" {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0} dir={theme.direction}>
                    <ArchivedUsers />
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <ArchivedExercises />
                </TabPanel>
            </SwipeableViews>
        </div>
    );
}