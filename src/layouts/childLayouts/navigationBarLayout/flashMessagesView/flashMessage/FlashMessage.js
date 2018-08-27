import React, { Component }  from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import {translateLayout} from '../../../../../utils/commonLanguageUtils'

import './FlashMessage.scss'

class FlashMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            layout_widget_warning_1:  translateLayout('layout_widget_warning_1'),
            layout_widget_warning_2:  translateLayout('layout_widget_warning_2'),
            layout_widget_warning_3:  translateLayout('layout_widget_warning_3'),
        };
    }

    componentWillReceiveProps(nextprops) {
        if (nextprops.lang !== this.props.lang) {
            this.setState({
                layout_widget_warning_1:  translateLayout('layout_widget_warning_1'),
                layout_widget_warning_2:  translateLayout('layout_widget_warning_2'),
                layout_widget_warning_3:  translateLayout('layout_widget_warning_3'),
            })
        }
    }

    onClick = () => {
        this.props.deleteFlashMessage(this.props.id);
    }

    render = () => {
        const { id, type, text } = this.props;
        return (
            <div className='flash-message-list-layout-main-2'>
                <div className={classnames('alert', {
                    'alert-success text-center': type === 'success',
                    'alert-info text-center': type === 'alert',
                    'alert-warning text-center': type === 'warning',
                    'alert-danger text-center': type === 'error',
                    'alert-primary text-center': type === 'primary',
                })}>
                    <button onClick={this.onClick} className="close"><span>&times;</span></button>
                    {
                        (text === 'You logged in successfuly. Welcome!')
                            ?
                            (this.state.layout_widget_warning_1)
                            :
                            (
                                (text === 'Got new alarm!')
                                ?
                                (this.state.layout_widget_warning_2)
                                :
                                    (
                                        (text === 'Alarm is resolved!')
                                            &&
                                            (this.state.layout_widget_warning_3)
                                    )
                            )
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        lang: state.lang,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        deleteFlashMessage: (data) => dispatch({type: 'DELETE_FLASH_MESSAGE', data})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FlashMessage);