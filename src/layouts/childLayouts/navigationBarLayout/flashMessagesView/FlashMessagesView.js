import { connect } from 'react-redux';
import React, { Component } from 'react'
import {
    ADD_FLASH_MESSAGE,
    MESSAGE_LOG_IN_SUCCESSFULY,
    DELETE_BY_VALUE_FLASH_MESSAGES
} from '../../../../api/flash/flashActions'
import { TIME_OF_LOG_IN_POP_UP } from '../../../../properties/properties'

import FlashMessage from './flashMessage/FlashMessage';
import './FlashMessagesView.scss';

class FlashMessagesView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            auth: {user: {errors: ''}},
            flashMessages: null
        };
    }

    componentWillMount () {
        this.setState({auth: {user: {errors: ''}}});
        this.props.showFlashMessage({ type: 'success',  text: MESSAGE_LOG_IN_SUCCESSFULY})
        window.setTimeout(() => {
            this.props.deleteByValueFlashMessages(MESSAGE_LOG_IN_SUCCESSFULY);
        }, TIME_OF_LOG_IN_POP_UP)

    }

    componentWillReceiveProps (nextprops) {
        if (nextprops.user !== this.props.user) {
            this.setState({auth: nextprops.user});
        }
        this.setState({flashMessages: nextprops.flashMessages});

    }

    render = () => {

        return (
            <div className='flash-message-main-style'>
                <div className='flash-message-main-style-2'>
                    <div></div>
                    <div></div>
                    <div>
                        {this.state.flashMessages !== null && (this.state.flashMessages.map((ob) =>
                            <FlashMessage
                                key={ob.id}
                                id={ob.id}
                                type={ob.type}
                                text={ob.text}/>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.auth || {},
        flashMessages: state.flashMessages || {}
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        deleteByValueFlashMessages: (data) => dispatch({type: DELETE_BY_VALUE_FLASH_MESSAGES, data}),
        showFlashMessage: (data) => dispatch({type: ADD_FLASH_MESSAGE, data})
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FlashMessagesView)
