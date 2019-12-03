import React, { Component } from 'react';
import AddInjuriesModal from '../AddInjuriesModal/AddInjuriesModal';
import EditInjuriesModal from '../EditInjuriesModal/EditInjuriesModal.js';
import { styled } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { flexbox } from '@material-ui/system';
import { connect } from 'react-redux';
import './UserInjuries.css'

const mapStateToProps = reduxState => ({
    reduxState,
});


const MildInjuryCard = styled(Card)({
    background: '#f5cb42',
    border: 0,
    borderRadius: 3,
    // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    // // color: 'white',
    // height: 60,
    width: "45%",
    padding: 10,
    margin: 5,
    fontSize: 16,
    display: flexbox,
    textAlign: "center"
});

const ModerateInjuryCard = styled(Card)({
    background: '#fc9803',
    border: 0,
    borderRadius: 3,
    // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    // // color: 'white',
    // height: 60,
    width: "45%",
    padding: 10,
    margin: 5,
    fontSize: 16,
    display: flexbox,
    textAlign: "center"
});

const SevereInjuryCard = styled(Card)({
    background: '#801356',
    border: 0,
    borderRadius: 3,
    // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    // // color: 'white',
    // height: 60,
    width: "45%",
    padding: 10,
    margin: 5,
    fontSize: 16,
    display: flexbox,
    textAlign: "center"
});
const HealedInjuryCard = styled(Card)({
    background: '#84c8b9',
    border: 0,
    borderRadius: 3,
    // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    // // color: 'white',
    // height: 60,
    width: "45%",
    padding: 10,
    margin: 5,
    fontSize: 16,
    display: flexbox,
    textAlign: "center"
});
//renders the users injuries
class Injuries extends Component {
    // componentDidMount() {
    //     this.props.dispatch({ type: 'FETCH_USER' })
    // }

    render() {
        let value = 'test'
        return (
            <>
                <h2 className="header-injuries">Current Injuries</h2>
            <div className="injury-wrapper">
                    {this.props.reduxState.injuries.injuriesReducer.map((injury) => {
                        if (injury.severity == 1) {
                            return (
                            <MildInjuryCard>
                                <div className="injury-display">
                                    <h3>{injury.type}</h3>
                                        <EditInjuriesModal injury={injury}/>
                                    </div>
                                    {injury.description}
                                    </MildInjuryCard>
                            )
                        }
                        else if (injury.severity == 2) {
                            return (
                                <ModerateInjuryCard>
                                    <div className="injury-display">
                                        <h3>{injury.type}</h3>
                                        <EditInjuriesModal injury={injury}/>
                                    </div>
                                    {injury.description}
                                </ModerateInjuryCard>
                            )
                        }
                        else if (injury.severity == 3) {
                            return (
                                <SevereInjuryCard>
                                    <div className="injury-display">
                                        <h3>{injury.type}</h3>
                                        <EditInjuriesModal injury={injury}/>
                                    </div>
                                    {injury.description}
                                </SevereInjuryCard>
                            )
                        }
                    }
                    )}
                    <AddInjuriesModal />
            </div>
                <h2 className="header-injuries">Prior Injuries</h2>
            <div className="injury-wrapper">
                    {this.props.reduxState.injuries.injuriesReducer.map((injury) => {
                        if (injury.severity == 0) {
                            return (
                                <HealedInjuryCard>
                                    <div className="injury-display">
                                        <h3>{injury.type}</h3>
                                        <EditInjuriesModal injury={injury}/>
                                    </div>
                                    {injury.description}
                                </HealedInjuryCard>
                            )
                        }}
                    )}
                    <AddInjuriesModal />
            </div>
            </>
        )
    }
}

export default connect(mapStateToProps)(Injuries);