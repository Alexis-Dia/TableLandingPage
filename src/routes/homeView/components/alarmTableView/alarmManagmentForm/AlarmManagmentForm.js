import {connect} from 'react-redux';
import React, {Component} from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';

import TextFieldGroup from '../../common/textFieldGroup/TextFieldGroup';
import TextAreaFieldGroup from '../../common/textAreaFieldGroup/TextAreaFieldGroup';
import { validateEmail, validateMessage } from '../../../../../utils/validatorUtils';
import {FETCH_ALARM_DATA, RESOLVE_ALARM, LOAD_RESOLVED_ALARM} from '../../../../../api/alarm/alarmActions'
import {ADD_FLASH_MESSAGE, RESOLVED_ALARM} from '../../../../../api/flash/flashActions'
import {translateAlarmsPage} from '../../../../../utils/commonLanguageUtils'
import './AlarmManagmentForm.scss';

let validatedEmailValue = false;
let validatedMessageValue = false;

class AlarmManagmentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipient: '',
            message: '',
            sendFormTriggerEmail: false,
            sendFormTriggerMessage: false,
            alarmManagmentActionCall: '',
            alarmManagmentActionEmail: '',
            loadedResolvedAlarm: {
                id: -1,
                call: false,
                sendEmail: false,
                recipient: '',
                message: ''
            },

            alarms_page_resolve_popup_text1: translateAlarmsPage('alarms_page_resolve_popup_text1'),
            alarms_page_resolve_popup_text2: translateAlarmsPage('alarms_page_resolve_popup_text2'),
            alarms_page_resolve_popup_text3: translateAlarmsPage('alarms_page_resolve_popup_text3'),
            alarms_page_resolve_popup_text4: translateAlarmsPage('alarms_page_resolve_popup_text4'),
            alarms_page_resolve_popup_text5: translateAlarmsPage('alarms_page_resolve_popup_text5'),
            alarms_page_resolve_popup_text6: translateAlarmsPage('alarms_page_resolve_popup_text6'),
            alarms_page_resolve_popup_text7: translateAlarmsPage('alarms_page_resolve_popup_text7'),
        };
    }

    componentWillMount() {
        if (this.props.readOnly) {
            this.props.loadResolvedAlarm(this.props.id)
        }
    }

    componentWillReceiveProps(nextprops) {
        if (nextprops.loadedResolvedAlarm !== this.props.loadedResolvedAlarm) {
            this.setState({loadedResolvedAlarm: nextprops.loadedResolvedAlarm});
        }

        if (nextprops.lang !== this.props.lang) {
            this.setState({lang: nextprops.lang.value});
            this.setState({
                alarms_page_resolve_popup_text1: translateAlarmsPage('alarms_page_resolve_popup_text1'),
                alarms_page_resolve_popup_text2: translateAlarmsPage('alarms_page_resolve_popup_text2'),
                alarms_page_resolve_popup_text3: translateAlarmsPage('alarms_page_resolve_popup_text3'),
                alarms_page_resolve_popup_text4: translateAlarmsPage('alarms_page_resolve_popup_text4'),
                alarms_page_resolve_popup_text5: translateAlarmsPage('alarms_page_resolve_popup_text5'),
                alarms_page_resolve_popup_text6: translateAlarmsPage('alarms_page_resolve_popup_text6'),
                alarms_page_resolve_popup_text7: translateAlarmsPage('alarms_page_resolve_popup_text7'),
            })

        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.alarmManagmentActionEmail === 'Email') {
            if (validatedEmailValue && validatedMessageValue) {

                const obj = {
                    id: this.props.id,
                    call: this.state.alarmManagmentActionCall === 'Call' ? true : false,
                    sendEmail: this.state.alarmManagmentActionEmail === 'Email' ? true : false,
                    recipient: this.state.recipient,
                    message: this.state.message,
                }

                this.props.resolveAlarm(obj)
                this.setState({sendFormTriggerEmail: false})
                this.setState({sendFormTriggerMessage: false})
                this.closeModalWindow()
                this.props.showFlashMessage({type: 'primary', text: RESOLVED_ALARM})
            } else if (validatedMessageValue === true && validatedEmailValue === false) {
                this.setState({sendFormTriggerEmail: true})
                this.setState({sendFormTriggerMessage: false})
            } else if (validatedMessageValue === false && validatedEmailValue === true) {
                this.setState({sendFormTriggerEmail: false})
                this.setState({sendFormTriggerMessage: true})
            } else {
                this.setState({sendFormTriggerEmail: true})
                this.setState({sendFormTriggerMessage: true})
            }

        } else if (this.state.alarmManagmentActionCall === 'Call') {

            const obj = {
                id: this.props.id,
                call: this.state.alarmManagmentActionCall === 'Call' ? true : false,
                sendEmail: this.state.alarmManagmentActionEmail === 'Email' ? true : false
            }

            this.props.resolveAlarm(obj)
            this.setState({sendFormTriggerEmail: false})
            this.setState({sendFormTriggerMessage: false})
            this.closeModalWindow()
            this.props.showFlashMessage({type: 'primary', text: RESOLVED_ALARM})
        }
    }

    onChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
        if (event.target.name === 'recipient') {
            let result = validateEmail(event.target.value)
            if (result === '') {
                validatedEmailValue = true
            } else {
                validatedEmailValue = false
            }
        }
        if (event.target.name === 'message') {
            let result = validateMessage(event.target.value)
            if (result === '') {
                validatedMessageValue = true
            } else {
                validatedMessageValue = false
            }
        }
    }

    closeModalWindow = () => {
        this.props.onToggleAlarmManagment();
    }

    setCallManagement = (event, isInputChecked) => {
        if (isInputChecked === true) {
            this.setState({alarmManagmentActionCall: 'Call'});
        } else {
            this.setState({alarmManagmentActionCall: ''});
        }
    }

    setEmailManagment = (event, isInputChecked) => {
        if (isInputChecked === true) {
            this.setState({alarmManagmentActionEmail: 'Email'});
        } else {
            this.setState({recipient: ''});
            this.setState({message: ''});
            this.setState({alarmManagmentActionEmail: ''});
            this.setState({sendFormTriggerEmail: false})
            this.setState({sendFormTriggerMessage: false})
        }
    }

    render = () => {

        let readOnly = this.props.readOnly

        return (
            <div>
                {readOnly === false
                    ?
                    <div>
                        <div></div>
                        <div className="alarm-managment-main-style-1">
                            <h5>{this.state.alarms_page_resolve_popup_text1}</h5>
                            <div className="form-group">
                                <MuiThemeProvider>
                                    <div className="alarm-managment-group-buttons-call-style-1">
                                        <div className="alarm-managment-group-buttons-call-style-2">
                                            <div className="alarm-managment-group-buttons-call-style-3">
                                                <div>
                                                    <Toggle label={this.state.alarms_page_resolve_popup_text2} onToggle={this.setCallManagement}/>
                                                </div>
                                                <div>
                                                    <Toggle label={this.state.alarms_page_resolve_popup_text3} onToggle={this.setEmailManagment}/>
                                                </div>
                                                <div></div>
                                            </div>
                                            <div></div>
                                        </div>
                                    </div>
                                </MuiThemeProvider>
                            </div>

                            <TextFieldGroup className="modal-content"
                                            value={this.state.recipient}
                                            field="recipient"
                                            placeholder={this.state.alarms_page_resolve_popup_text4}
                                            onChange={this.onChange}
                                            style1={{marginTop: '-20px', borderRadius: '0px'}}
                                            disabled={this.state.alarmManagmentActionEmail === 'Email' ? false : true}
                            />
                            {this.state.sendFormTriggerEmail === true &&
                            <div className="help-block" style={{color: 'red', marginTop: '-12px'}}>Invalid email</div>}

                            <TextAreaFieldGroup
                                value={this.state.message}
                                field="message"
                                rows="7"
                                placeholder={this.state.alarms_page_resolve_popup_text5}
                                onChange={this.onChange}
                                style1={{marginTop: '-20px'}}
                                disabled={this.state.alarmManagmentActionEmail === 'Email' ? false : true}
                            />
                            {this.state.sendFormTriggerMessage === true &&
                            <div className="help-block" style={{color: 'red', marginTop: '-12px'}}>
                                The message must contain at least 5 characters.
                            </div>}

                            <MuiThemeProvider>
                                <div className="alarm-managment-group-buttons-resolve-style-1">
                                    <div></div>
                                    <div>
                                        <FlatButton
                                            labelStyle={{textTransform: false}}
                                            label={this.state.alarms_page_resolve_popup_text6}
                                            onClick={this.closeModalWindow}/>
                                    </div>
                                    <div>
                                        <FlatButton
                                            label={this.state.alarms_page_resolve_popup_text7}
                                            onClick={this.onSubmit}
                                            disabled={this.state.alarmManagmentActionCall === 'Call' ||
                                            this.state.alarmManagmentActionEmail === 'Email' ? false : true}
                                            labelStyle={{textTransform: false}}
                                        />
                                    </div>
                                </div>
                            </MuiThemeProvider>
                        </div>
                        <div></div>
                    </div>
                    :
                    <div>
                        <div></div>
                        <div className="alarm-managment-main-style-1">
                            <h5>Alarm managment</h5>
                            <div className="form-group">
                                <MuiThemeProvider>
                                    <div className="alarm-managment-group-buttons-call-style-1">
                                        <div className="alarm-managment-group-buttons-call-style-2">
                                            <div className="alarm-managment-group-buttons-call-style-3">
                                                <div>
                                                    <Toggle label="Call"
                                                            toggled={this.state.loadedResolvedAlarm.call}
                                                    />
                                                </div>
                                                <div>
                                                    <Toggle label="Email"
                                                            toggled={this.state.loadedResolvedAlarm.sendEmail}/>
                                                </div>
                                                <div></div>
                                            </div>
                                            <div></div>
                                        </div>
                                    </div>
                                </MuiThemeProvider>
                            </div>

                            <TextFieldGroup className="modal-content"
                                            value={this.state.loadedResolvedAlarm.recipient}
                                            field="recipient"
                                            placeholder="Recipient"
                                            onChange={this.onChange}
                                            style1={{marginTop: '-20px', borderRadius: '0px'}}
                                            disabled={true}
                            />
                            {this.state.sendFormTriggerEmail === true &&
                            <div className="help-block" style={{color: 'red', marginTop: '-12px'}}>Invalid e-mail</div>}

                            <TextAreaFieldGroup
                                value={this.state.loadedResolvedAlarm.message}
                                field="message"
                                rows="7"
                                placeholder="Message"
                                onChange={this.onChange}
                                style1={{marginTop: '-20px'}}
                                disabled={true}
                            />
                            {this.state.sendFormTriggerMessage === true &&
                            <div className="help-block" style={{color: 'red', marginTop: '-12px'}}>
                                The message must contain at least 5 characters.
                            </div>}

                            <MuiThemeProvider>
                                <div className="alarm-managment-group-buttons-resolve-style-1">
                                    <div></div>
                                    <div>
                                        <FlatButton
                                            labelStyle={{textTransform: false}}
                                            label={this.state.alarms_page_resolve_popup_text6}
                                            onClick={this.closeModalWindow}
                                        />
                                    </div>
                                    <div>
                                        <FlatButton
                                            label={this.state.alarms_page_resolve_popup_text7}
                                            onClick={this.onSubmit}
                                            disabled={true}
                                            labelStyle={{textTransform: false}}
                                        />
                                    </div>
                                </div>
                            </MuiThemeProvider>
                        </div>
                        <div></div>
                    </div>
                }

            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        loadedResolvedAlarm: state.loadedAlarm.resolved,
        lang: state.lang,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        resolveAlarm: (data) => dispatch({type: RESOLVE_ALARM, data}),
        nextPage: (data) => dispatch({type: FETCH_ALARM_DATA, data}),
        showFlashMessage: (data) => dispatch({type: ADD_FLASH_MESSAGE, data}),
        loadResolvedAlarm: (data) => dispatch({type: LOAD_RESOLVED_ALARM, data})
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AlarmManagmentForm)