import React, {Component} from 'react'
import {connect} from 'react-redux';
import {browserHistory} from 'react-router'

import { SET_LANG } from '../../../api/lang/langActions'
import {EN, FR, I18, LANGUAGE_DEFAULT } from '../../../properties/properties'
import {DELETE_CURRENT_USER} from '../../../api/login/loginActions';
import {DELETE_ALL_FLASH_MESSAGES} from '../../../api/flash/flashActions';
import FlashMessagesView from './flashMessagesView/FlashMessagesView'
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import ActionAccountBox from 'material-ui/svg-icons/action/account-box';
import Language from 'material-ui/svg-icons/action/language';
import ActionPowerSettingsNew from 'material-ui/svg-icons/action/power-settings-new';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import {Toolbar, ToolbarGroup, ToolbarSeparator} from 'material-ui/Toolbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {translateLayout} from '../../../utils/commonLanguageUtils'
import './NavigationBarLayout.scss'

class NavigationBarLayout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalSignUp: false,
            modalLogIn: false,
            modalDrawer: false,
            language: LANGUAGE_DEFAULT,
            layout_widget_left_panel_abeona_systems:  translateLayout('layout_widget_left_panel_abeona_systems'),
            layout_widget_left_panel_devices:  translateLayout('layout_widget_left_panel_devices'),
            layout_widget_left_panel_itinerary:  translateLayout('layout_widget_left_panel_itinerary'),
            layout_widget_left_panel_patients:  translateLayout('layout_widget_left_panel_patients'),

            layout_widget_app_bar_settings_profile:  translateLayout('layout_widget_app_bar_settings_profile'),
            layout_widget_app_bar_settings_settings:  translateLayout('layout_widget_app_bar_settings_settings'),
            layout_widget_app_bar_settings_help:  translateLayout('layout_widget_app_bar_settings_help'),

        };
    }

    componentWillReceiveProps(nextprops) {

    }

    logout = () => {
        this.props.logout();
        this.props.deleteAllFlashMessages();
        this.setState({
            modalDrawer: false,

        });
    }

    toggleSignUp = () => {
        this.setState({
            modalSignUp: !this.state.modalSignUp
        });
    }

    toggleLogIn = () => {
        this.setState({
            modalLogIn: !this.state.modalLogIn
        });
    }

    toggleDrawer = () => {
        this.setState({
            modalDrawer: !this.state.modalDrawer
        });
    }

    onClickAbeonaSystems = () => {
        const path = "/"
        browserHistory.push(path)
        this.toggleDrawer()
    }

    onClickItinerary = () => {
        const path = "/itinerary"
        browserHistory.push(path)
        this.toggleDrawer()
    }

    onClickDevices = () => {
        const path = "/devices"
        browserHistory.push(path)
        this.toggleDrawer()
    }
    onClickPatients = () => {
        const path = "/patients";
        browserHistory.push(path);
        this.toggleDrawer()
    };

    setLanguage = (event, child) => {


        this.setState({

        });
    }

    componentWillMount() {
        this.setState({

        });
    }

    componentDidMount() {
        this.setState({

        });
    }

    render = () => {

        const {isAuthenticated} = true;

        const userAppBar = (
            <div>
                <MuiThemeProvider>

                    <AppBar

                        /*title='Demonstrating of table with pagination, sortering, filtering, priorety and other.'*/
                        /*titleStyle={{color: '#000000', fontSize: '18px'}}*/
                        style={{backgroundColor: '#eef6f9', zIndex: 990}}
                        iconElementLeft={
                            <IconButton iconStyle={{fill: '#000000'}}>
                                <NavigationMenu/>
                            </IconButton>
                        }
                        onLeftIconButtonClick={this.toggleDrawer}
                        children={

                            <Toolbar style={{backgroundColor: '#eef6f9'}}>
                                <ToolbarGroup>
                                    <IconMenu
                                        iconButtonElement={
                                            <IconButton>
                                                <Language/>
                                            </IconButton>
                                        }

                                        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                                        targetOrigin={{horizontal: 'right', vertical: 'top'}}
                                        iconStyle={{fill: '#000000', marginTop: '2px'}}
                                    >
                                        <MenuItem
                                            value={FR}
                                            primaryText={FR}/>
                                        <MenuItem
                                            value={EN}
                                            primaryText={EN}/>
                                    </IconMenu>
                                    <IconMenu
                                        iconButtonElement={
                                            <IconButton>
                                                <ActionAccountBox/>
                                            </IconButton>
                                        }
                                        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                                        targetOrigin={{horizontal: 'right', vertical: 'top'}}
                                        iconStyle={{fill: '#000000', marginTop: '2px'}}
                                    >
                                        <MenuItem primaryText={this.state.layout_widget_app_bar_settings_profile}/>
                                        <MenuItem primaryText={this.state.layout_widget_app_bar_settings_settings}/>
                                        <MenuItem primaryText={this.state.layout_widget_app_bar_settings_help}/>
                                    </IconMenu>
                                    <ToolbarSeparator />
                                    <IconButton iconStyle={{fill: '#000000'}} onClick={this.logout}>
                                        <ActionPowerSettingsNew/>
                                    </IconButton>
                                </ToolbarGroup>
                            </Toolbar>


                        }
                    >
                    </AppBar>
                </MuiThemeProvider>
                <FlashMessagesView/>
            </div>
        );

        const guestAppBar = (
            <MuiThemeProvider>
                <AppBar
                    style={{backgroundColor: '#eef6f9', zIndex: 990}}
                    iconElementLeft={
                        <IconButton iconStyle={{display: 'none'}}>
                            <NavigationMenu/>
                        </IconButton>
                    }
                >
                </AppBar>
            </MuiThemeProvider>
        );

        return (
            <div>
                <div className='appbar-main-1'>
                    {isAuthenticated ? userAppBar : guestAppBar}
                    <div className='drower-main-1'>
                        <MuiThemeProvider>
                            <Drawer open={this.state.modalDrawer}
                                    docked={false}
                                    onRequestChange={this.toggleDrawer}
                                    overlayStyle={{backgroundColor: 'rgba(232,253,251, 0.0)', zIndex: 0}}
                                    containerStyle={{
                                        top: '1px',
                                        zIndex: 99,
                                        position: 'absolute',
                                        backgroundColor: 'rgba(244, 247, 246, 100)',
                                        height: '1200px'
                                    }}
                            >
                                <div className='drower-main-2'>
                                    <nav style={{backgroundColor: '#ffffff'}}
                                        //style={{ backgroundColor: 'rgba(238,246,249, 0.5)' }}
                                        className="navbar navbar-light navbar-expand justify-content-center">
                                        <div className="navbar-collapse collapse w-100" id="collapsingNavbar3" style={{paddingTop: '5px', paddingBottom: '5px'}}>
                                            <Menu style={{ backgroundColor: 'rgba(239,253,251, 100)'}}>
                                                <MenuItem primaryText={this.state.layout_widget_left_panel_abeona_systems}
                                                          onClick={this.onClickAbeonaSystems}/>
                                                <MenuItem primaryText={this.state.layout_widget_left_panel_devices} onClick={this.onClickDevices}/>
                                                <MenuItem primaryText={this.state.layout_widget_left_panel_itinerary} onClick={this.onClickItinerary}/>
                                                <MenuItem primaryText={this.state.layout_widget_left_panel_patients} onClick={this.onClickPatients}/>
                                            </Menu>
                                        </div>
                                    </nav>
                                </div>
                            </Drawer>
                        </MuiThemeProvider>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        lang: state.lang,
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        deleteAllFlashMessages: (data) => dispatch({type: DELETE_ALL_FLASH_MESSAGES, data}),
        logout: (data) => dispatch({type: DELETE_CURRENT_USER, data}),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NavigationBarLayout);

/* https://stackoverflow.com/questions/19733447/bootstrap-navbar-with-left-center-or-right-aligned-items/20362024#20362024
https://github.com/mui-org/material-ui/issues/5358 */