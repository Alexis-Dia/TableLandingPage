import React, {Component} from 'react';
import {connect} from 'react-redux';
import FilterView from './filterView/FilterView'
import classnames from 'classnames';
import './FiltersBarView.scss'
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {getOrderingState, orderingBuilder} from '../../../../../utils/utils'
import IconButton from 'material-ui/IconButton';
import Clear from 'material-ui/svg-icons/content/clear';
import TextField from 'material-ui/TextField';
import DateTimePicker from 'react-datetime-picker/dist/entry.nostyle'
import DatePicker from 'react-date-picker'
import TimePicker from 'react-time-picker';
import Toggle from 'material-ui/Toggle';
import {translateAlarmsPage, translateArrayOfAlarmTypes} from '../../../../../utils/commonLanguageUtils'
import {
    DEFAULT_FILTERING_PARAMETERS,
    DEFAULT_ORDERING_PARAMETERS,
    FILTERS_OF_NAME,
    UTC_FORMAT
} from '../../../../../properties/properties'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
    FETCH_ALARM_DATA,
    SAVE_FILTERING_AND_ORDERING_DATA,
    ALARM_TYPE_LOAD_ALL
} from '../../../../../api/alarm/alarmActions'
import Remove from 'material-ui/svg-icons/content/remove';
import ArrowUpward from 'material-ui/svg-icons/navigation/arrow-upward';
import ArrowDownward from 'material-ui/svg-icons/navigation/arrow-downward';
import {
    convertDateTimeFromMaterialWidget,
    dateIsValid,
    convertToUTCDateTime,
    convertToLocalDateTime
} from '../../../../../utils/commonDateUtils'

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: '8px',
        width: '100px',
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: theme.spacing.unit / 4,
    },
});

const options = [
    'Wi-fi',
    'Bluetooth',
    'CDMA'
];

const brands = [
    'SAMSUNG',
    'LG',
    'SONY'
];

let filteringAndOrdering = {}

class FiltersBarView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDevicesIdArr: null,
            alarmTypesArr: null,

            resolvedOrdering: 0,
            resolvedPriority: 1,

            alarmDateOrdering: 1,
            alarmDatePriority: 2,

            deviceIdOrdering: -1,
            deviceIdPriority: 3,
            clientNameOrdering: -1,
            clientNamePriority: 4,

            alarmTypeOrdering: -1,
            alarmTypePriority: 5,

            batteryVoltageOrdering: -1,
            batteryVoltagePriority: 6,

            speedOrdering: -1,
            speedPriority: 7,

            dateForInput: new Date(),

            filteringAndOrderingData: {
                page: DEFAULT_FILTERING_PARAMETERS.page,
                size: DEFAULT_FILTERING_PARAMETERS.size,

                stockStatus: DEFAULT_FILTERING_PARAMETERS.stockStatusFilter,
                brand: DEFAULT_FILTERING_PARAMETERS.brandFilter,
                model: DEFAULT_FILTERING_PARAMETERS.modelFilter,
                selectedOptions: DEFAULT_FILTERING_PARAMETERS.selectedOptionsFilter,
                priceFrom: DEFAULT_FILTERING_PARAMETERS.priceFromFilter,
                priceTo: DEFAULT_FILTERING_PARAMETERS.priceToFilter,
                ratingFrom: DEFAULT_FILTERING_PARAMETERS.ratingFromFilter,
                ratingTo: DEFAULT_FILTERING_PARAMETERS.ratingToFilter,
                dateEntreeFrom: DEFAULT_FILTERING_PARAMETERS.iso8601FromFilter,
                dateEntreeTo: DEFAULT_FILTERING_PARAMETERS.iso8601ToFilter,

                orders: [
                    {
                        'property': 'stockStatus',
                        'priority': 1,
                        'direction': 'ASC'
                    },
                    {
                        'property': 'dateEntree',
                        'priority': 2,
                        'direction': 'DESC'
                    }
                ],

            },
            alarms_page_label_from: translateAlarmsPage('alarms_page_label_from'),
            alarms_page_label_to: translateAlarmsPage('alarms_page_label_to'),
            alarms_page_filter_showed_all_part_1: translateAlarmsPage('alarms_page_filter_showed_all_part_1'),
            alarms_page_filter_showed_all_part_2: translateAlarmsPage('alarms_page_filter_showed_all_part_2'),
            alarms_page_filter_showed_all_part_3: translateAlarmsPage('alarms_page_filter_showed_all_part_3'),

        };
    }

    componentWillMount() {
        this.props.nextPage(DEFAULT_ORDERING_PARAMETERS);
    }

    componentWillReceiveProps(nextprops) {
        /*        if (nextprops.alarmsFilteringAndOrdering !== this.props.alarmsFilteringAndOrdering) {
                    this.setState({
                        filteringAndOrderingData: nextprops.alarmsFilteringAndOrdering.filteringAndOrderingData
                    })
                }*/

        if (nextprops.lang !== this.props.lang) {
        }

        if (nextprops.alarmsFilteringAndOrdering !== this.props.alarmsFilteringAndOrdering) {
            this.setState({filteringAndOrderingData: nextprops.alarmsFilteringAndOrdering.filteringAndOrderingData})
            /*            this.setState({ currentPage: nextprops.alarmsFilteringAndOrdering.filteringAndOrderingData.page })
                        this.setState({ numberOfAlarms: nextprops.alarmsFilteringAndOrdering.filteringAndOrderingData.size })

                        this.setState({ modelFilter: nextprops.alarmsFilteringAndOrdering.filteringAndOrderingData.patientName })
                        this.setState({ brandFilter: nextprops.alarmsFilteringAndOrdering.filteringAndOrderingData.deviceId })
                        this.setState({ iso8601FromFilter: nextprops.alarmsFilteringAndOrdering.filteringAndOrderingData.alarmDateFrom })
                        this.setState({ iso8601ToFilter: nextprops.alarmsFilteringAndOrdering.filteringAndOrderingData.alarmDateTo })
                        this.setState({ selectedOptionsFilter: nextprops.alarmsFilteringAndOrdering.filteringAndOrderingData.alarmTypes })
                        this.setState({ ratingFromFilter: nextprops.alarmsFilteringAndOrdering.filteringAndOrderingData.batteryVoltageFrom })
                        this.setState({ ratingToFilter: nextprops.alarmsFilteringAndOrdering.filteringAndOrderingData.batteryVoltageTo })
                        this.setState({ priceToFilter: nextprops.alarmsFilteringAndOrdering.filteringAndOrderingData.speedTo })
                        this.setState({ priceFromFilter: nextprops.alarmsFilteringAndOrdering.filteringAndOrderingData.speedFrom })
                        this.setState({ stockStatusFilter: nextprops.alarmsFilteringAndOrdering.filteringAndOrderingData.resolved })*/

            // !!!!!! If smth. will wrong, wrong recomment filteringAndOrdering obj and this.props.nextPage(filteringAndOrdering);
            // filteringAndOrdering = {
            //     'page': nextprops.alarmsFilteringAndOrdering.filteringAndOrderingData.page,
            //     'size': nextprops.alarmsFilteringAndOrdering.filteringAndOrderingData.size,
            //
            //     'speedTo': nextprops.alarmsFilteringAndOrdering.filteringAndOrderingData.speedTo,
            //     'speedFrom': nextprops.alarmsFilteringAndOrdering.filteringAndOrderingData.speedFrom,
            //     'resolved': nextprops.alarmsFilteringAndOrdering.filteringAndOrderingData.resolved,
            //     'batteryVoltageFrom': nextprops.alarmsFilteringAndOrdering.filteringAndOrderingData.batteryVoltageFrom,
            //     'batteryVoltageTo': nextprops.alarmsFilteringAndOrdering.filteringAndOrderingData.batteryVoltageTo,
            //     'alarmTypes': nextprops.alarmsFilteringAndOrdering.filteringAndOrderingData.alarmTypes,
            //     'deviceId': nextprops.alarmsFilteringAndOrdering.filteringAndOrderingData.deviceId,
            //     'patientName': nextprops.alarmsFilteringAndOrdering.filteringAndOrderingData.patientName,
            //     'alarmDateTo': nextprops.alarmsFilteringAndOrdering.filteringAndOrderingData.alarmDateTo,
            //     'alarmDateFrom': nextprops.alarmsFilteringAndOrdering.filteringAndOrderingData.alarmDateFrom,
            //     'orders': nextprops.alarmsFilteringAndOrdering.filteringAndOrderingData.orders
            // }
            //this.props.nextPage(filteringAndOrdering);
        }
    }

    onRemoveDeviceIdFilter = () => {
        let obj = this.state.filteringAndOrderingData
        obj.brand = DEFAULT_FILTERING_PARAMETERS.brandFilter
        obj.page = DEFAULT_FILTERING_PARAMETERS.page,
            this.props.saveFilteringAndOrdering(obj);
    }

    onChangePatientNameFilter = (event, newValue) => {
        let obj = this.state.filteringAndOrderingData
        obj.model = newValue
        this.props.nextPage(obj);
        this.props.saveFilteringAndOrdering(obj);
    }

    onRemovePatientNameFilter = () => {
        let obj = this.state.filteringAndOrderingData
        obj.model = DEFAULT_FILTERING_PARAMETERS.modelFilter
        obj.page = DEFAULT_FILTERING_PARAMETERS.page,
            this.props.saveFilteringAndOrdering(obj);
    }

    onChangeDateFromFilter = (date) => {
        this.setState({open: false});
        let dateFromFilter = new Date(date)
        var newValue = convertDateTimeFromMaterialWidget(dateFromFilter)
        this.setState({dateFromFilter: newValue});
        var iso8601 = newValue
        if (dateIsValid(iso8601)) {
            var iso8601utc = convertToUTCDateTime(iso8601, UTC_FORMAT)
            let obj = this.state.filteringAndOrderingData
            obj.dateEntreeFrom = iso8601utc
            obj.page = DEFAULT_FILTERING_PARAMETERS.page
            this.props.nextPage(obj);
            this.props.saveFilteringAndOrdering(obj);
        }
    }

    onChangeDateToFilter = (date) => {
        this.setState({open: false});
        let dateToFilter = new Date(date)
        var newValue = convertDateTimeFromMaterialWidget(dateToFilter)
        this.setState({dateToFilter: newValue});
        var iso8601 = newValue
        if (dateIsValid(iso8601)) {
            var iso8601utc = convertToUTCDateTime(iso8601, UTC_FORMAT)
            let obj = this.state.filteringAndOrderingData
            obj.dateEntreeTo = iso8601utc
            obj.page = DEFAULT_FILTERING_PARAMETERS.page
            this.props.nextPage(obj);
            this.props.saveFilteringAndOrdering(obj);
        }
    }

    onRemoveDateFilter = () => {
        let obj = this.state.filteringAndOrderingData
        obj.dateEntreeFrom = DEFAULT_FILTERING_PARAMETERS.dateFromFilter
        obj.dateEntreeTo = DEFAULT_FILTERING_PARAMETERS.dateToFilter
        obj.page = DEFAULT_FILTERING_PARAMETERS.page,
            this.props.saveFilteringAndOrdering(obj);
    }

    onChangeDeviceIdFilter = (e) => {
        let obj = this.state.filteringAndOrderingData
        console.log("e.target.value1 = ", e.target.value)
        obj.brand = e.target.value
        this.props.nextPage(obj);
        this.props.saveFilteringAndOrdering(obj);
    }

    onChangeAlarmTypeFilter = (e) => {
        console.log("e.target.value2 = ", e.target.value)
        let obj = this.state.filteringAndOrderingData
        obj.selectedOptions = e.target.value
        this.props.nextPage(obj);
        this.props.saveFilteringAndOrdering(obj);
    }

    onRemoveAlarmTypeFilter = () => {
        let obj = this.state.filteringAndOrderingData
        obj.selectedOptions = DEFAULT_FILTERING_PARAMETERS.selectedOptionsFilter
        obj.page = DEFAULT_FILTERING_PARAMETERS.page,
            this.props.saveFilteringAndOrdering(obj);
    }

    onChangeBatteryFromFilter = (event, newValue) => {
        let obj = this.state.filteringAndOrderingData
        obj.ratingFrom = newValue
        this.props.nextPage(obj);
        this.props.saveFilteringAndOrdering(obj);
    }

    onChangeBatteryToFilter = (event, newValue) => {
        let obj = this.state.filteringAndOrderingData
        obj.ratingTo = newValue
        this.props.nextPage(obj);
        this.props.saveFilteringAndOrdering(obj);
    }

    onRemoveBatteryFilter = () => {
        let obj = this.state.filteringAndOrderingData
        obj.ratingFrom = DEFAULT_FILTERING_PARAMETERS.ratingFromFilter
        obj.ratingTo = DEFAULT_FILTERING_PARAMETERS.ratingToFilter
        obj.page = DEFAULT_FILTERING_PARAMETERS.page,
            this.props.saveFilteringAndOrdering(obj);
    }

    onChangeSpeedFromFilter = (event, newValue) => {
        let obj = this.state.filteringAndOrderingData
        obj.priceFrom = newValue
        this.props.nextPage(obj);
        this.props.saveFilteringAndOrdering(obj);
    }

    onChangeSpeedToFilter = (event, newValue) => {
        let obj = this.state.filteringAndOrderingData
        obj.priceTo = newValue
        this.props.nextPage(obj);
        this.props.saveFilteringAndOrdering(obj);
    }

    onRemoveSpeedFilter = () => {
        let obj = this.state.filteringAndOrderingData
        obj.priceFrom = DEFAULT_FILTERING_PARAMETERS.priceFromFilter
        obj.priceTo = DEFAULT_FILTERING_PARAMETERS.priceToFilter
        obj.page = DEFAULT_FILTERING_PARAMETERS.page,
            this.props.saveFilteringAndOrdering(obj);
    }

    onToggleResolve = (event, isInputChecked) => {

        if (isInputChecked) {
            let obj = this.state.filteringAndOrderingData
            obj.stockStatus = isInputChecked
            this.props.nextPage(obj);
            this.props.saveFilteringAndOrdering(obj);
        } else {
            let obj = this.state.filteringAndOrderingData
            obj.stockStatus = false
            this.props.nextPage(obj);
            this.props.saveFilteringAndOrdering(obj);
        }
    }

    onRemoveResolveFilter = () => {
        let obj = this.state.filteringAndOrderingData
        obj.stockStatus = DEFAULT_FILTERING_PARAMETERS.stockStatusFilter
        obj.page = DEFAULT_FILTERING_PARAMETERS.page,
            this.props.saveFilteringAndOrdering(obj);
    }

    render = () => {
        const { classes } = this.props;

        return (
            <div className="filters-main-style-1">
                <div></div>
                <div>
                    <MuiThemeProvider>
                        <div>
                            <div className={classnames('alert', {
                                'alert-info text-center': true
                            })} style={{
                                borderBottomLeftRadius: '0px',
                                borderBottomRightRadius: '0px',
                                borderTopLeftRadius: '0px',
                                borderTopRightRadius: '0px',
                                height: '53px'
                            }}>
                                <div className="filter-braclet-id-header-main-style-1">
                                    <div>
                                        <FormControl className={classes.formControl}>
                                            <Select
                                                multiple
                                                labelStyle={{borderColor: '#black', color: '#black'}}
                                                underlineStyle={{borderColor: '#1eb1da', color: '#1eb1da'}}
                                                underlineDisabledStyle={{borderColor: '#1eb1da', color: '#1eb1da'}}
                                                style={{width: '100%', backgroundColor: '#black', marginTop: '-10px'}}
                                                renderValue={selected => selected.join(', ')}
                                                value={this.state.filteringAndOrderingData.brand}
                                                onChange={(e)=>{this.onChangeDeviceIdFilter(e)}}
                                            >

                                                {brands !== null && (brands.map((ob) =>
                                                    <MenuItem key={ob} value={ob}
                                                    >
                                                        <Checkbox checked={this.state.filteringAndOrderingData.brand.indexOf(ob) > -1} />
                                                        <label>{ob}</label>
                                                    </MenuItem>
                                                ))}

                                            </Select>
                                        </FormControl>

                                        {/*<SelectField
                                            //ref={this.focusOnField}
                                            labelStyle={{borderColor: '#black', color: '#black'}}
                                            underlineStyle={{borderColor: '#1eb1da', color: '#1eb1da'}}
                                            //underlineFocusStyle={{borderColor: '#black', color: '#black'}}
                                            underlineDisabledStyle={{borderColor: '#1eb1da', color: '#1eb1da'}}
                                            style={{width: '100%', backgroundColor: '#black', marginTop: '-10px'}}
                                            //floatingLabelText="Device Id"
                                            value={this.state.filteringAndOrderingData.deviceId}
                                            //onChange={this.onChangeDeviceIdFilter}
                                            onChange={(e)=>{this.onChangeDeviceIdFilter(e)}}
                                        >
                                            {this.state.allDevicesIdArr !== null && (this.state.allDevicesIdArr.map((ob) =>
                                                <MenuItem key={ob.deviceId} value={ob.deviceId}
                                                          primaryText={ob.deviceId}/>
                                            ))}
                                        </SelectField>*/}
                                    </div>
                                    <div></div>
                                    <div></div>
                                    <div>
                                        <IconButton iconStyle={{color: 'white', marginTop: '-20px'}}
                                                    onClick={this.onRemoveDeviceIdFilter}>
                                            <Clear/>
                                        </IconButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </MuiThemeProvider>
                </div>
                <div>
                    <MuiThemeProvider>
                        <div>
                            <div className={classnames('alert', {
                                'alert-info text-center': true
                            })} style={{
                                borderBottomLeftRadius: '0px',
                                borderBottomRightRadius: '0px',
                                borderTopLeftRadius: '0px',
                                borderTopRightRadius: '0px',
                                height: '53px'
                            }}>
                                <div className="filter-client-name-header-main-style-1">
                                    <div>
                                        <TextField
                                            style={{width: '100%', backgroundColor: '#black', marginTop: '-10px'}}
                                            underlineStyle={{borderColor: '#1eb1da', color: '#1eb1da'}}
                                            underlineDisabledStyle={{borderColor: '#1eb1da', color: '#1eb1da'}}
                                            onChange={this.onChangePatientNameFilter}
                                            value={this.state.filteringAndOrderingData.model}
                                        />
                                    </div>
                                    <div></div>
                                    <div></div>
                                    <div>
                                        <IconButton iconStyle={{color: 'white', marginTop: '-20px'}}
                                                    onClick={this.onRemovePatientNameFilter}>
                                            <Clear/>
                                        </IconButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </MuiThemeProvider>
                </div>
                <div>
                    <div>
                        <div className={classnames('alert', {
                            'alert-info text-center': true
                        })} style={{
                            borderBottomLeftRadius: '0px',
                            borderBottomRightRadius: '0px',
                            borderTopLeftRadius: '0px',
                            borderTopRightRadius: '0px',
                            height: '53px'
                        }}>
                            <div className="filter-haur-and-date-main-style1">
                                <div className="filter-label-main-style">
                                    <div>{this.state.alarms_page_label_from}:</div>
                                    <div className="label-to-margin-style">{this.state.alarms_page_label_to}:</div>
                                </div>
                                <div className="filter-haur-and-date-main-style2">
                                    <div>
                                        <DateTimePicker
                                            onChange={this.onChangeDateFromFilter}
                                            value={
                                                (this.state.filteringAndOrderingData.dateEntreeFrom !== '')
                                                    ? (new Date(convertToLocalDateTime(this.state.filteringAndOrderingData.dateEntreeFrom, UTC_FORMAT)))
                                                    :
                                                    ('')
                                            }
                                            locale='en-GB'
                                            calendarIcon={<div></div>}
                                            clearIcon={<div></div>}
                                            //className='datepicker'
                                        />
                                    </div>
                                    <div>
                                        <DateTimePicker
                                            onChange={this.onChangeDateToFilter}
                                            value={
                                                (this.state.filteringAndOrderingData.dateEntreeTo !== '')
                                                    ? (new Date(convertToLocalDateTime(this.state.filteringAndOrderingData.dateEntreeTo, UTC_FORMAT)))
                                                    :
                                                    ('')
                                            }
                                            locale='en-GB'
                                            calendarIcon={<div></div>}
                                            clearIcon={<div></div>}
                                            //className='datepicker'
                                        />
                                    </div>
                                </div>
                                <div></div>
                                <div>
                                    <IconButton iconStyle={{color: 'white', marginTop: '-20px'}}
                                                onClick={this.onRemoveDateFilter}>
                                        <Clear/>
                                    </IconButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <MuiThemeProvider>
                        <div>
                            <div className={classnames('alert', {
                                'alert-info text-center': true
                            })} style={{
                                borderBottomLeftRadius: '0px',
                                borderBottomRightRadius: '0px',
                                borderTopLeftRadius: '0px',
                                borderTopRightRadius: '0px',
                                height: '53px'
                            }}>
                                <div className="filter-alarm-type-header-main-style-1">
                                    <div>
                                        <FormControl className={classes.formControl}>
                                            <Select
                                                multiple
                                                //ref={this.focusOnField}
                                                labelStyle={{borderColor: '#black', color: '#black'}}
                                                underlineStyle={{borderColor: '#1eb1da', color: '#1eb1da'}}
                                                underlineDisabledStyle={{borderColor: '#1eb1da', color: '#1eb1da'}}
                                                style={{width: '100%', backgroundColor: '#black', marginTop: '-10px'}}
                                                //renderValue={selected => translateArrayOfAlarmTypes(this.state.filteringAndOrderingData.alarmTypes).join(', ')}
                                                renderValue={selected => selected.join(', ')}
                                                value={this.state.filteringAndOrderingData.selectedOptions}
                                                onChange={(e)=>{this.onChangeAlarmTypeFilter(e)}}
                                            >

                                                {options !== null && (options.map((ob) =>
                                                    <MenuItem key={ob} value={ob}
                                                        //primaryText={ob.message}
                                                    >
                                                        <Checkbox checked={this.state.filteringAndOrderingData.selectedOptions.indexOf(ob) > -1} />
                                                        <label>{ob}</label>
                                                    </MenuItem>
                                                ))}

                                            </Select>
                                    </FormControl>
                                    </div>
                                    <div></div>
                                    <div></div>
                                    <div>
                                        <IconButton iconStyle={{color: 'white', marginTop: '-20px'}}
                                                    onClick={this.onRemoveAlarmTypeFilter}>
                                            <Clear/>
                                        </IconButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </MuiThemeProvider>
                </div>
                <div>
                    <MuiThemeProvider>
                        <div>
                            <div className={classnames('alert', {
                                'alert-info text-center': true
                            })} style={{
                                borderBottomLeftRadius: '0px',
                                borderBottomRightRadius: '0px',
                                borderTopLeftRadius: '0px',
                                borderTopRightRadius: '0px',
                                height: '53px'
                            }}>
                                <div className="filter-battery-main-style1">
                                    <div className="filter-label-main-style">
                                        <div>{this.state.alarms_page_label_from}:</div>
                                        <div className="label-to-margin-style">{this.state.alarms_page_label_to}:</div>
                                    </div>
                                    <div className="filter-battery-main-style2">
                                        <div>
                                            <TextField
                                                style={{
                                                    width: '100%',
                                                    height: '35px',
                                                    backgroundColor: '#black',
                                                    fontSize: '0.95em'
                                                }}
                                                underlineStyle={{borderColor: '#1eb1da', color: '#1eb1da'}}
                                                underlineDisabledStyle={{borderColor: '#1eb1da', color: '#1eb1da'}}
                                                onChange={this.onChangeSpeedFromFilter}
                                                value={this.state.filteringAndOrderingData.priceFrom}
                                            />
                                        </div>
                                        <div>
                                            <TextField
                                                style={{
                                                    width: '100%',
                                                    height: '35px',
                                                    backgroundColor: '#black',
                                                    marginTop: '-10px',
                                                    fontSize: '0.95em'
                                                }}
                                                underlineStyle={{borderColor: '#1eb1da', color: '#1eb1da'}}
                                                underlineDisabledStyle={{borderColor: '#1eb1da', color: '#1eb1da'}}
                                                onChange={this.onChangeSpeedToFilter}
                                                value={this.state.filteringAndOrderingData.priceTo}
                                            />
                                        </div>
                                    </div>
                                    <div></div>
                                    <div>
                                        <IconButton iconStyle={{color: 'white', marginTop: '-20px'}}
                                                    onClick={this.onRemoveSpeedFilter}>
                                            <Clear/>
                                        </IconButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </MuiThemeProvider>
                </div>
                <div>
                    <MuiThemeProvider>
                        <div>
                            <div className={classnames('alert', {
                                'alert-info text-center': true
                            })} style={{
                                borderBottomLeftRadius: '0px',
                                borderBottomRightRadius: '0px',
                                borderTopLeftRadius: '0px',
                                borderTopRightRadius: '0px',
                                height: '53px'
                            }}>
                                <div className="filter-speed-main-style1">
                                    <div className="filter-label-main-style">
                                        <div>{this.state.alarms_page_label_from}:</div>
                                        <div className="label-to-margin-style">{this.state.alarms_page_label_to}:</div>
                                    </div>
                                    <div className="filter-speed-main-style2">
                                        <div>
                                            <TextField
                                                style={{
                                                    width: '100%',
                                                    height: '35px',
                                                    backgroundColor: '#black',
                                                    fontSize: '0.95em'
                                                }}
                                                underlineStyle={{borderColor: '#1eb1da', color: '#1eb1da'}}
                                                underlineDisabledStyle={{borderColor: '#1eb1da', color: '#1eb1da'}}
                                                onChange={this.onChangeBatteryFromFilter}
                                                value={this.state.filteringAndOrderingData.ratingFrom}
                                            />
                                        </div>
                                        <div>
                                            <TextField
                                                style={{
                                                    width: '100%',
                                                    height: '35px',
                                                    backgroundColor: '#black',
                                                    marginTop: '-10px',
                                                    fontSize: '0.95em'
                                                }}
                                                underlineStyle={{borderColor: '#1eb1da', color: '#1eb1da'}}
                                                underlineDisabledStyle={{borderColor: '#1eb1da', color: '#1eb1da'}}
                                                onChange={this.onChangeBatteryToFilter}
                                                value={this.state.filteringAndOrderingData.ratingTo}
                                            />
                                        </div>
                                    </div>
                                    <div></div>
                                    <div>
                                        <IconButton iconStyle={{color: 'white', marginTop: '-20px'}}
                                                    onClick={this.onRemoveBatteryFilter}>
                                            <Clear/>
                                        </IconButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </MuiThemeProvider>
                </div>
                <div>
                    <div>
                        <div className={classnames('alert', {
                            'alert-info text-center': true
                        })} style={{
                            borderBottomLeftRadius: '0px',
                            borderBottomRightRadius: '0px',
                            borderTopLeftRadius: '0px',
                            borderTopRightRadius: '0px',
                            height: '53px'
                        }}>
                        </div>
                    </div>
                </div>
                <div>
                    <MuiThemeProvider>
                        <div>
                            <div className={classnames('alert', {
                                'alert-info text-center': true
                            })} style={{
                                borderBottomLeftRadius: '0px',
                                borderBottomRightRadius: '0px',
                                borderTopLeftRadius: '0px',
                                borderTopRightRadius: '0px',
                                height: '53px'
                            }}>
                                <div className="filter-resolved-main-style1">
                                    <div>
                                        <Toggle
                                            label=""
                                            style={{width: '1px'}}
                                            onToggle={this.onToggleResolve}
                                            toggled={this.state.filteringAndOrderingData.stockStatus}
                                            key='toogle-1'
                                        />
                                    </div>
                                    <div>
                                        <div className="filter-label-resolved-main-style">
                                            <div>
                                                {
                                            (this.state.filteringAndOrderingData.stockStatus !== null) ?
                                                    (
                                                        <div>
                                                            {
                                                                (this.state.filteringAndOrderingData.stockStatus === true) ?
                                                                    (
                                                                        <div>
                                                                            <div>
                                                                                {this.state.alarms_page_filter_showed_all_part_1}
                                                                            </div>
                                                                            <div>
                                                                                {this.state.alarms_page_filter_showed_all_part_2}
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                    :
                                                                    (
                                                                        <div>
                                                                            <div>
                                                                                {this.state.alarms_page_filter_showed_all_part_1}
                                                                            </div>
                                                                            <div>
                                                                                {this.state.alarms_page_filter_showed_all_part_3}
                                                                            </div>
                                                                        </div>
                                                                    )
                                                            }
                                                        </div>
                                                    )
                                                :
                                                    (
                                                        <div></div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div></div>
                                    <div>
                                        <IconButton iconStyle={{color: 'white', marginTop: '-20px', marginLeft: '-20px'}}
                                                    onClick={this.onRemoveResolveFilter}>
                                            <Clear/>
                                        </IconButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </MuiThemeProvider>
                </div>
            </div>
        );
    }

}

const mapStateToProps = (state, ownProps) => {
    return {
        alarmsFilteringAndOrdering: state.alarmsFilteringAndOrdering || {},
        flashMessages: state.flashMessages,
        lang: state.lang,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        nextPage: (data) => dispatch({type: FETCH_ALARM_DATA, data}),
        saveFilteringAndOrdering: (data) => dispatch({type: SAVE_FILTERING_AND_ORDERING_DATA, data}),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(FiltersBarView));