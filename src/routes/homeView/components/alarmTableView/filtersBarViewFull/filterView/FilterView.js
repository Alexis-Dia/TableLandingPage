import React, { Component }  from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import findIndex from 'lodash/findIndex';
import { SAVE_FILTERING_AND_ORDERING_DATA } from '../../../../../../api/alarm/alarmActions'
import { MESSAGE_GOT_NEW_ALARM } from  '../../../../../../api/flash/flashActions'
import {
    DEFAULT_FILTERING_PARAMETERS,
    DEFAULT_ORDERING_PARAMETERS,
    FILTERS_OF_NAME,
    UTC_FORMAT
} from '../../../../../../properties/properties'
import { convertToLocalDateTime } from '../../../../../../utils/commonDateUtils'

import './FilterView.scss'

var lastClosedFieldName = ''

class FilterView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filteringAndOrderingData: {
                page: DEFAULT_FILTERING_PARAMETERS.page,
                size: DEFAULT_FILTERING_PARAMETERS.size,

                patientName: DEFAULT_FILTERING_PARAMETERS.modelFilter,
                deviceId: DEFAULT_FILTERING_PARAMETERS.brandFilter,
                alarmType: DEFAULT_FILTERING_PARAMETERS.selectedOptionsFilter,
                alarmDateFrom: DEFAULT_FILTERING_PARAMETERS.iso8601FromFilter,
                alarmDateTo: DEFAULT_FILTERING_PARAMETERS.iso8601ToFilter,
                batteryVoltageFrom: DEFAULT_FILTERING_PARAMETERS.ratingFromFilter,
                batteryVoltageTo: DEFAULT_FILTERING_PARAMETERS.ratingToFilter,
                speedFrom: DEFAULT_FILTERING_PARAMETERS.priceFromFilter,
                speedTo: DEFAULT_FILTERING_PARAMETERS.priceToFilter,
                resolved: DEFAULT_FILTERING_PARAMETERS.stockStatusFilter,

            }
        };
    }


    onRemoveFilter = () => {
        if (lastClosedFieldName === FILTERS_OF_NAME.DeviceId) {
            if (this.state.filteringAndOrderingData.deviceId !== DEFAULT_FILTERING_PARAMETERS.brandFilter) {
                let obj = this.state.filteringAndOrderingData
                obj.deviceId = DEFAULT_FILTERING_PARAMETERS.brandFilter
                obj.page = DEFAULT_FILTERING_PARAMETERS.page,
                this.props.saveFilterigAndOrdering(obj);

            }
        }

        if (lastClosedFieldName === FILTERS_OF_NAME.PatientName) {
            if (this.state.filteringAndOrderingData.patientName !== DEFAULT_FILTERING_PARAMETERS.modelFilter) {
                let obj = this.state.filteringAndOrderingData
                obj.patientName = DEFAULT_FILTERING_PARAMETERS.modelFilter
                obj.page = DEFAULT_FILTERING_PARAMETERS.page
                this.props.saveFilterigAndOrdering(obj);
            }
        }

        if (lastClosedFieldName === FILTERS_OF_NAME.DateTimeAll) {
            if (this.state.filteringAndOrderingData.alarmDateFrom !== DEFAULT_FILTERING_PARAMETERS.iso8601FromFilter || this.state.filteringAndOrderingData.alarmDateTo !== DEFAULT_FILTERING_PARAMETERS.iso8601ToFilter) {
                let obj = this.state.filteringAndOrderingData
                obj.alarmDateFrom = DEFAULT_FILTERING_PARAMETERS.iso8601FromFilter
                obj.alarmDateTo = DEFAULT_FILTERING_PARAMETERS.iso8601ToFilter
                obj.page = DEFAULT_FILTERING_PARAMETERS.page
                this.props.saveFilterigAndOrdering(obj);
            }
        }

        if (lastClosedFieldName === FILTERS_OF_NAME.AlarmType) {
            if (this.state.filteringAndOrderingData.alarmType !== DEFAULT_FILTERING_PARAMETERS.selectedOptionsFilter) {
                let obj = this.state.filteringAndOrderingData
                obj.alarmType = DEFAULT_FILTERING_PARAMETERS.selectedOptionsFilter
                obj.page = DEFAULT_FILTERING_PARAMETERS.page
                this.props.saveFilterigAndOrdering(obj);
            }
        }

        if (lastClosedFieldName === FILTERS_OF_NAME.BatterryVoltageAll) {
            if (this.state.filteringAndOrderingData.batteryVoltageFrom !== DEFAULT_FILTERING_PARAMETERS.ratingFromFilter || this.state.filteringAndOrderingData.batteryVoltageTo !== DEFAULT_FILTERING_PARAMETERS.ratingToFilter) {
                let obj = this.state.filteringAndOrderingData
                obj.batteryVoltageFrom = DEFAULT_FILTERING_PARAMETERS.ratingFromFilter
                obj.batteryVoltageTo = DEFAULT_FILTERING_PARAMETERS.ratingToFilter
                obj.page = DEFAULT_FILTERING_PARAMETERS.page
                this.props.saveFilterigAndOrdering(obj);
            }
        }

        if (lastClosedFieldName === FILTERS_OF_NAME.SpeedAll) {
            if (this.state.filteringAndOrderingData.speedFrom !== DEFAULT_FILTERING_PARAMETERS.priceFromFilter || this.state.filteringAndOrderingData.speedTo !== DEFAULT_FILTERING_PARAMETERS.priceToFilter) {
                let obj = this.state.filteringAndOrderingData
                obj.speedFrom = DEFAULT_FILTERING_PARAMETERS.priceFromFilter
                obj.speedTo = DEFAULT_FILTERING_PARAMETERS.priceToFilter
                obj.page = DEFAULT_FILTERING_PARAMETERS.page
                this.props.saveFilterigAndOrdering(obj);
            }
        }

        if (lastClosedFieldName === FILTERS_OF_NAME.ResolveAlarm) {
            if (this.state.filteringAndOrderingData.resolved !== DEFAULT_FILTERING_PARAMETERS.stockStatusFilter) {
                let obj = this.state.filteringAndOrderingData
                obj.resolved = DEFAULT_FILTERING_PARAMETERS.stockStatusFilter
                obj.page = DEFAULT_FILTERING_PARAMETERS.page
                this.props.saveFilterigAndOrdering(obj);
            }
        }

    }

    componentWillMount() {

    }

    componentWillReceiveProps(nextprops) {
        if (nextprops.flashMessages !== this.props.flashMessages) {
            var index = nextprops.flashMessages.findIndex(flashMessage => flashMessage.text == MESSAGE_GOT_NEW_ALARM);

                if (index !== -1) {
                    let obj = this.state.filteringAndOrderingData

                    obj.page = DEFAULT_FILTERING_PARAMETERS.page
                    obj.size = DEFAULT_FILTERING_PARAMETERS.size

                    obj.deviceId = DEFAULT_FILTERING_PARAMETERS.brandFilter
                    obj.patientName = DEFAULT_FILTERING_PARAMETERS.modelFilter
                    obj.alarmDateFrom = DEFAULT_FILTERING_PARAMETERS.iso8601FromFilter
                    obj.alarmDateTo = DEFAULT_FILTERING_PARAMETERS.iso8601ToFilter
                    obj.alarmType = DEFAULT_FILTERING_PARAMETERS.selectedOptionsFilter
                    obj.batteryVoltageFrom = DEFAULT_FILTERING_PARAMETERS.ratingFromFilter
                    obj.batteryVoltageTo = DEFAULT_FILTERING_PARAMETERS.ratingToFilter
                    obj.speedFrom = DEFAULT_FILTERING_PARAMETERS.priceFromFilter
                    obj.speedTo = DEFAULT_FILTERING_PARAMETERS.priceToFilter
                    obj.resolved = DEFAULT_FILTERING_PARAMETERS.stockStatusFilter

                    obj.orders = DEFAULT_ORDERING_PARAMETERS.orders

                    this.props.saveFilterigAndOrdering(obj);
                }

        }

        if (nextprops.alarmsFilteringAndOrdering !== this.props.alarmsFilteringAndOrdering) {
                this.setState({
                    filteringAndOrderingData: nextprops.alarmsFilteringAndOrdering.filteringAndOrderingData
                })
            }

    }

    render = () => {
        const {type, id} = this.props;

        switch (id) {
            case FILTERS_OF_NAME.DeviceId:
                return (
                    <div>
                        <div>
                            <div className={classnames('alert', {
                                'alert-success text-center': type === 'success',
                                'alert-info text-center': type === 'alert',
                                'alert-warning text-center': type === 'warning',
                                'alert-danger text-center': type === 'error',
                                'alert-secondary text-center': type === 'secondary'
                            })} style={{height: '53px'}}>
                                <button
                                    onClick={
                                        () => {
                                            lastClosedFieldName = FILTERS_OF_NAME.DeviceId
                                            this.onRemoveFilter();
                                        }
                                    }
                                    className="close"><span>&times;</span></button>
                                {this.state.filteringAndOrderingData.deviceId!== null && ('Filter: ' + this.state.filteringAndOrderingData.deviceId) }
                            </div>
                        </div>
                    </div>
                )

            case FILTERS_OF_NAME.PatientName:
                return (
                    <div>
                            <div>
                            <div className={classnames('alert', {
                                'alert-success text-center': type === 'success',
                                'alert-info text-center': type === 'alert',
                                'alert-warning text-center': type === 'warning',
                                'alert-danger text-center': type === 'error',
                                'alert-secondary text-center': type === 'secondary'
                            })} style={{height: '53px'}}>
                                <button
                                    onClick={
                                        () => {
                                            lastClosedFieldName = FILTERS_OF_NAME.PatientName
                                            this.onRemoveFilter();
                                        }
                                    }
                                    className="close"><span>&times;</span></button>
                                {this.state.filteringAndOrderingData.patientName}
                            </div>
                        </div>
                    </div>
                )

            case FILTERS_OF_NAME.DateTimeAll:
                return (
                    <div>
                        {(this.state.filteringAndOrderingData.alarmDateFrom !== undefined || this.state.filteringAndOrderingData.alarmDateTo !== undefined) && (
                            <div>
                                {(this.state.filteringAndOrderingData.alarmDateFrom !== DEFAULT_FILTERING_PARAMETERS.iso8601FromFilter || this.state.filteringAndOrderingData.alarmDateTo !== DEFAULT_FILTERING_PARAMETERS.iso8601ToFilter) ? (
                                    <div >
                                        <div style={{ paddingTop: '5px', paddingLeft: '2px', paddingRight: '5px', height: '50px' }} className={classnames('alert', {
                                            'alert-success text-center': type === 'success',
                                            'alert-info text-center': type === 'alert',
                                            'alert-warning text-center': type === 'warning',
                                            'alert-danger text-center': type === 'error',
                                            'alert-secondary text-center': type === 'secondary'
                                        })}>
                                            <button
                                                onClick={
                                                    () => {
                                                        lastClosedFieldName = FILTERS_OF_NAME.DateTimeAll
                                                        this.onRemoveFilter();
                                                    }
                                                }
                                                className="close"><span>&times;</span></button>
                                            <div style={{fontSize: '0.8rem', height: '25px'}}>
                                                <div className='filter-duble-field-main-style-1'>{(this.state.filteringAndOrderingData.alarmDateTo !== '' ) && (' To: ' + convertToLocalDateTime(this.state.filteringAndOrderingData.alarmDateTo, UTC_FORMAT))}</div>
                                                <div className='filter-duble-field-main-style-1'>{(this.state.filteringAndOrderingData.alarmDateFrom !== '' ) && (' From: ' + convertToLocalDateTime(this.state.filteringAndOrderingData.alarmDateFrom, UTC_FORMAT))}</div>
                                            </div>
                                        </div>
                                    </div>

                                ) : <div className="stub-main-style-1"></div>}
                            </div>)}
                    </div>
                )


            case FILTERS_OF_NAME.AlarmType:
                return (
                    <div>
                        {this.state.filteringAndOrderingData.alarmType !== undefined && (
                            <div>
                                {this.state.filteringAndOrderingData.alarmType !== DEFAULT_FILTERING_PARAMETERS.selectedOptionsFilter ? (
                                    <div className={classnames('alert', {
                                        'alert-success text-center': type === 'success',
                                        'alert-info text-center': type === 'alert',
                                        'alert-warning text-center': type === 'warning',
                                        'alert-danger text-center': type === 'error',
                                        'alert-secondary text-center': type === 'secondary'
                                    })}>
                                        <button
                                            onClick={
                                                () => {
                                                    lastClosedFieldName = FILTERS_OF_NAME.AlarmType
                                                    this.onRemoveFilter();
                                                }
                                            }
                                            className="close"><span>&times;</span></button>
                                        {'Filter: ' + this.state.filteringAndOrderingData.alarmType }
                                    </div>) : <div className="stub-main-style-1"></div>}
                            </div>)}
                    </div>
                )

            case FILTERS_OF_NAME.BatterryVoltageAll:
                return (
                    <div>
                        {(this.state.filteringAndOrderingData.batteryVoltageFrom !== undefined || this.state.filteringAndOrderingData.batteryVoltageTo !== undefined) && (
                            <div>
                                {(this.state.filteringAndOrderingData.batteryVoltageFrom !== DEFAULT_FILTERING_PARAMETERS.ratingFromFilter || this.state.filteringAndOrderingData.batteryVoltageTo !== DEFAULT_FILTERING_PARAMETERS.ratingToFilter) ? (
                                    <div >
                                        <div style={{ paddingTop: '5px', paddingLeft: '2px', paddingRight: '5px', height: '50px' }} className={classnames('alert', {
                                            'alert-success text-center': type === 'success',
                                            'alert-info text-center': type === 'alert',
                                            'alert-warning text-center': type === 'warning',
                                            'alert-danger text-center': type === 'error',
                                            'alert-secondary text-center': type === 'secondary'
                                        })}>
                                            <button
                                                onClick={
                                                    () => {
                                                        lastClosedFieldName = FILTERS_OF_NAME.BatterryVoltageAll
                                                        this.onRemoveFilter();
                                                    }
                                                }
                                                className="close"><span>&times;</span></button>
                                            <div style={{fontSize: '0.8rem', height: '25px'}}>
                                                <div className='filter-duble-field-main-style-1'>{(this.state.filteringAndOrderingData.batteryVoltageTo !== '' ) && (' To: ' + this.state.filteringAndOrderingData.batteryVoltageTo)}</div>
                                                <div className='filter-duble-field-main-style-1'>{(this.state.filteringAndOrderingData.batteryVoltageFrom !== '' ) && (' From: ' + this.state.filteringAndOrderingData.batteryVoltageFrom)}</div>
                                            </div>
                                        </div>
                                    </div>

                                ) : <div className="stub-main-style-1"></div>}
                            </div>)}
                    </div>
                )

            case FILTERS_OF_NAME.SpeedAll:
                return (
                    <div>
                        {(this.state.filteringAndOrderingData.speedFrom !== undefined || this.state.filteringAndOrderingData.speedTo !== undefined) && (
                            <div>
                                {(this.state.filteringAndOrderingData.speedFrom !== DEFAULT_FILTERING_PARAMETERS.priceFromFilter || this.state.filteringAndOrderingData.speedTo !== DEFAULT_FILTERING_PARAMETERS.priceToFilter) ? (
                                    <div >
                                        <div style={{ paddingTop: '5px', paddingLeft: '2px', paddingRight: '5px', height: '50px' }} className={classnames('alert', {
                                            'alert-success text-center': type === 'success',
                                            'alert-info text-center': type === 'alert',
                                            'alert-warning text-center': type === 'warning',
                                            'alert-danger text-center': type === 'error',
                                            'alert-secondary text-center': type === 'secondary'
                                        })}>
                                            <button
                                                onClick={
                                                    () => {
                                                        lastClosedFieldName = FILTERS_OF_NAME.SpeedAll
                                                        this.onRemoveFilter();
                                                    }
                                                }
                                                className="close"><span>&times;</span></button>
                                            <div style={{fontSize: '0.8rem', height: '25px'}}>
                                                <div className='filter-duble-field-main-style-1'>{(this.state.filteringAndOrderingData.speedTo !== '' ) && (' To: ' + this.state.filteringAndOrderingData.speedTo)}</div>
                                                <div className='filter-duble-field-main-style-1'>{(this.state.filteringAndOrderingData.speedFrom !== '' ) && (' From: ' + this.state.filteringAndOrderingData.speedFrom)}</div>
                                            </div>
                                        </div>
                                    </div>

                                ) : <div className="stub-main-style-1"></div>}
                            </div>)}
                    </div>
                )

            case FILTERS_OF_NAME.ResolveAlarm:
                return (
                    <div>
                        {this.state.filteringAndOrderingData.resolved !== undefined && (
                            <div>
                                {this.state.filteringAndOrderingData.resolved !== DEFAULT_FILTERING_PARAMETERS.stockStatusFilter ? (
                                    <div className={classnames('alert', {
                                        'alert-success text-center': type === 'success',
                                        'alert-info text-center': type === 'alert',
                                        'alert-warning text-center': type === 'warning',
                                        'alert-danger text-center': type === 'error',
                                        'alert-secondary text-center': type === 'secondary'
                                    })}>
                                        <button
                                            onClick={
                                                () => {
                                                    lastClosedFieldName = FILTERS_OF_NAME.ResolveAlarm
                                                    this.onRemoveFilter();
                                                }
                                            }
                                            className="close"><span>&times;</span></button>
                                        Filter: {this.state.filteringAndOrderingData.resolved && ('resolved')} {!this.state.filteringAndOrderingData.resolved && ('not resolved')}
                                    </div>) : <div className="stub-main-style-1"></div>}
                            </div>)}
                    </div>
                )

            default:
                return (
                    <div className="stub-main-style-1">
                    </div>
                )
        }
    }


}

const mapStateToProps = (state, ownProps) => {
    return {
        alarmsFilteringAndOrdering: state.alarmsFilteringAndOrdering || {},
        flashMessages: state.flashMessages,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        saveFilterigAndOrdering: (data) => dispatch({type: SAVE_FILTERING_AND_ORDERING_DATA, data})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterView);