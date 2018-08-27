import React, { Component } from 'react'
import { connect } from 'react-redux';

import LoginView from './LoginView/LoginView'
import AlarmTableView from './alarmTableView/alarmTableView'
import './MainView.scss'

class MainView extends Component {

  render = () => {

    const { isAuthenticated } = true;

    const guestView = (
        <LoginView />
    );

    const userView = (
        <div>
            <AlarmTableView />
        </div>
    );

    return (
      <div>
        <div className='main-header'>
            <AlarmTableView />
        </div>
      </div>
    )
  }

}

function mapStateToProps(state) {
    return {
    };
}

export default connect(
    mapStateToProps
)(MainView);