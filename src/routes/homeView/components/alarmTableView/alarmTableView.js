import {connect} from 'react-redux';
import React, {Component} from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DropDownMenu from 'material-ui/DropDownMenu';
import IconButton from 'material-ui/IconButton';
import Visibility from 'material-ui/svg-icons/action/visibility';
import SockJsClient from 'react-stomp';
import {
    Table,
    TableBody,
    TableFooter,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table'
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import ArrowUpward from 'material-ui/svg-icons/navigation/arrow-upward';
import ArrowDownward from 'material-ui/svg-icons/navigation/arrow-downward';
import Remove from 'material-ui/svg-icons/content/remove';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import LastPage from 'material-ui/svg-icons/navigation/last-page'
import FirstPage from 'material-ui/svg-icons/navigation/first-page'
import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left'
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right'
import Done from 'material-ui/svg-icons/action/done'
import Clear from 'material-ui/svg-icons/alert/add-alert'
import Close from 'material-ui/svg-icons/navigation/close'
import Reply from 'material-ui/svg-icons/content/reply'
import { Modal,  ModalBody } from 'reactstrap';
import map from 'lodash/map';
import findIndex from 'lodash/findIndex';

import isNumber from '../../../../utils/commonUtils'
import { dateIsValid, convertToLocalDateTime, convertToUTCDateTime } from '../../../../utils/commonDateUtils'
import {translateAlarmsPage} from '../../../../utils/commonLanguageUtils'
import {getOrderingState, orderingBuilder} from '../../../../utils/utils'
import FiltersBarView from './filtersBarViewFull/FiltersBarView'
import {
    DEFAULT_FILTERING_PARAMETERS,
    DEFAULT_ORDERING_PARAMETERS,
    HOSTNAME,
    PORT,
    HTTPS,
    WS,
    DELIMITER,
    ALARM_MAIN_TOPIC,
    TIME_OF_LOG_IN_POP_UP,
    TIME_OF_NEW_ALARM_POP_UP,
    TIME_OF_RESOLVED_ALARM,
    INDEX_OF_FIRST_POAGE,
    MAX_INT_SIZE,
    UTC_FORMAT
} from '../../../../properties/properties'
import {FETCH_ALARM_DATA, ALARM_TYPE_LOAD_ALL} from '../../../../api/alarm/alarmActions'
import { SAVE_FILTERING_AND_ORDERING_DATA } from '../../../../api/alarm/alarmActions'
import { EVENT_LOAD_ALARM } from '../../../../api/event/eventActions'
import {
    DELETE_ALL_FLASH_MESSAGES,
    DELETE_BY_VALUE_FLASH_MESSAGES,
    ADD_FLASH_MESSAGE,
    MESSAGE_GOT_NEW_ALARM,
    RESOLVED_ALARM
} from '../../../../api/flash/flashActions'
import AlarmManagmentForm from './alarmManagmentForm/AlarmManagmentForm'

import './alarmTableView.scss';

let filteringAndOrdering = {}

let modalWindow = {
    id: -1,
    readOnly: false,
    deviceId: -1,
}

const tableMainStyles = {
    column1: {},
    column2: {width: '12.1%'},
    column3: {width: '12.1%'},
    column4: {width: '12.1%'},
    column5: {width: '12.1%'},
    column6: {width: '12.1%'},
    column7: {width: '12.1%'},
    column8: {width: '9.6%'},
    column9: {width: '14.6%'}
}

class AlarmTableView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fixedHeader: true,
            fixedFooter: true,
            stripedRows: false,
            showRowHover: false,
            selectable: false,
            multiSelectable: false,
            enableSelectAll: false,
            deselectOnClickaway: false,

            numberOfAlarms: 10,
            numberOfAlarmsWithMemory: 10,
            showCheckboxes: false,
            alarms: {content: null},
            currentPage: 0,
            // firstPage: 1,
            // lastPage: 1,
            totalPages: 1,
            httpStatus: 200,

            alarmTypesArr: null,
            allDevicesIdArr: null,

            stockStatusFilter: DEFAULT_FILTERING_PARAMETERS.stockStatusFilter,
            brandFilter: DEFAULT_FILTERING_PARAMETERS.brandFilter,
            modelFilter: DEFAULT_FILTERING_PARAMETERS.modelFilter,
            selectedOptionsFilter: DEFAULT_FILTERING_PARAMETERS.selectedOptionsFilter,
            priceFromFilter: DEFAULT_FILTERING_PARAMETERS.priceFromFilter,
            priceToFilter: DEFAULT_FILTERING_PARAMETERS.priceToFilter,
            ratingFromFilter: DEFAULT_FILTERING_PARAMETERS.ratingFromFilter,
            ratingToFilter: DEFAULT_FILTERING_PARAMETERS.ratingToFilter,
            iso8601FromFilter: DEFAULT_FILTERING_PARAMETERS.iso8601FromFilter,
            iso8601ToFilter: DEFAULT_FILTERING_PARAMETERS.iso8601ToFilter,
            dateFromFilter: DEFAULT_FILTERING_PARAMETERS.dateFromFilter,
            timeFromFilter: DEFAULT_FILTERING_PARAMETERS.timeFromFilter,
            dateToFilter: DEFAULT_FILTERING_PARAMETERS.dateToFilter,
            timeToFilter: DEFAULT_FILTERING_PARAMETERS.timeToFilter,

            stockStatusOrdering: 0,
            stockStatusPriority: 1,

            dateEntreeOrdering: 1,
            dateEntreePriority: 2,

            brandOrdering: -1,
            brandPriority: 3,

            modelOrdering: -1,
            modelPriority: 4,

            selectedOptionsOrdering: -1,
            selectedOptionsPriority: 5,

            priceOrdering: -1,
            pricePriority: 6,

            ratingOrdering: -1,
            ratingPriority: 7,

            modalAlarmManagment: false,

            alarms_page_header_main_title: translateAlarmsPage('alarms_page_header_main_title'),
            alarms_page_label_from: translateAlarmsPage('alarms_page_label_from'),
            alarms_page_label_to: translateAlarmsPage('alarms_page_label_to'),
            alarms_page_table_header_device_id2: translateAlarmsPage('alarms_page_table_header_device_id2'),
            alarms_page_table_header_client_name1: translateAlarmsPage('alarms_page_table_header_client_name1'),
            alarms_page_table_header_client_name2: translateAlarmsPage('alarms_page_table_header_client_name2'),
            alarms_page_table_header_hour_and_date1: translateAlarmsPage('alarms_page_table_header_hour_and_date1'),
            alarms_page_table_header_hour_and_date2: translateAlarmsPage('alarms_page_table_header_hour_and_date2'),
            alarms_page_table_header_alarm_type1: translateAlarmsPage('alarms_page_table_header_alarm_type1'),
            alarms_page_table_header_alarm_type2: translateAlarmsPage('alarms_page_table_header_alarm_type2'),
            alarms_page_table_header_gps_battery1: translateAlarmsPage('alarms_page_table_header_gps_battery1'),
            alarms_page_table_header_gps_battery2: translateAlarmsPage('alarms_page_table_header_gps_battery2'),
            alarms_page_table_header_speed1: translateAlarmsPage('alarms_page_table_header_speed1'),
            alarms_page_table_header_speed2: translateAlarmsPage('alarms_page_table_header_speed2'),
            alarms_page_table_header_g_sensor_1: translateAlarmsPage('alarms_page_table_header_g_sensor_1'),
            alarms_page_table_header_g_sensor_2: translateAlarmsPage('alarms_page_table_header_g_sensor_2'),
            alarms_page_table_header_resolve_alarm_1: translateAlarmsPage('alarms_page_table_header_resolve_alarm_1'),
            alarms_page_table_header_resolve_alarm_2: translateAlarmsPage('alarms_page_table_header_resolve_alarm_2'),
            alarms_page_table_show_number: translateAlarmsPage('alarms_page_table_show_number'),
            alarms_page_footer_main_title: translateAlarmsPage('alarms_page_footer_main_title'),
        };
    }

    componentWillMount() {
        this.props.nextPage(DEFAULT_ORDERING_PARAMETERS);
    }

    componentWillReceiveProps(nextprops) {
        if (nextprops.lang !== this.props.lang) {
            this.setState({lang: nextprops.lang.value});
            this.setState({
                alarms_page_header_main_title: translateAlarmsPage('alarms_page_header_main_title'),
                alarms_page_table_header_device_id1: translateAlarmsPage('alarms_page_table_header_device_id1'),
                alarms_page_table_header_device_id2: translateAlarmsPage('alarms_page_table_header_device_id2'),
                alarms_page_table_header_client_name1: translateAlarmsPage('alarms_page_table_header_client_name1'),
                alarms_page_table_header_client_name2: translateAlarmsPage('alarms_page_table_header_client_name2'),
                alarms_page_table_header_hour_and_date1: translateAlarmsPage('alarms_page_table_header_hour_and_date1'),
                alarms_page_table_header_hour_and_date2: translateAlarmsPage('alarms_page_table_header_hour_and_date2'),
                alarms_page_table_header_alarm_type1: translateAlarmsPage('alarms_page_table_header_alarm_type1'),
                alarms_page_table_header_alarm_type2: translateAlarmsPage('alarms_page_table_header_alarm_type2'),
                alarms_page_table_header_gps_battery1: translateAlarmsPage('alarms_page_table_header_gps_battery1'),
                alarms_page_table_header_gps_battery2: translateAlarmsPage('alarms_page_table_header_gps_battery2'),
                alarms_page_table_header_speed1: translateAlarmsPage('alarms_page_table_header_speed1'),
                alarms_page_table_header_speed2: translateAlarmsPage('alarms_page_table_header_speed2'),
                alarms_page_table_header_g_sensor_1: translateAlarmsPage('alarms_page_table_header_g_sensor_1'),
                alarms_page_table_header_g_sensor_2: translateAlarmsPage('alarms_page_table_header_g_sensor_2'),
                alarms_page_table_header_resolve_alarm_1: translateAlarmsPage('alarms_page_table_header_resolve_alarm_1'),
                alarms_page_table_header_resolve_alarm_2: translateAlarmsPage('alarms_page_table_header_resolve_alarm_2'),
                alarms_page_table_show_number: translateAlarmsPage('alarms_page_table_show_number'),
                alarms_page_footer_main_title: translateAlarmsPage('alarms_page_footer_main_title'),
            })
            filteringAndOrdering = {
                'page': this.state.currentPage,
                'size': this.state.numberOfAlarms,
                'stockStatus': this.state.stockStatusFilter,
                'brand': this.state.brandFilter,
                'model': this.state.modelFilter,
                'selectedOptions': this.state.selectedOptionsFilter,
                'priceTo': this.state.priceToFilter,
                'priceFrom': this.state.priceFromFilter,
                'ratingFrom': this.state.ratingFromFilter,
                'ratingTo': this.state.ratingToFilter,
                'dateEntreeTo': this.state.iso8601ToFilter,
                'dateEntreeFrom': this.state.iso8601FromFilter,
                'orders': orderingBuilder(this.state)
            }
            this.props.nextPage(filteringAndOrdering);
        }

        if (nextprops.user !== this.props.user) {
            this.setState({auth: nextprops.user});
        }

        if (nextprops.alarms !== this.props.alarms && nextprops.alarms.httpStatus === 200) {
            console.log('nextprops nextprops', nextprops)

            /*var allLoadedAlarmTypesResult = nextprops.alarms.content
            var modifiedAlarmTypesArr = _.map(allLoadedAlarmTypesResult, function (element) {
                return _.extend({}, element, {alarmTypeTranslated: translateAlarmsPage(element.selectedOptions)});
            });
            nextprops.alarms.content = modifiedAlarmTypesArr*/

            this.setState({alarms: nextprops.alarms});
            this.setState({totalPages: nextprops.alarms.totalPages});
        }

        if (nextprops.alarms.httpStatus !== 200) {
            this.setState({httpStatus: nextprops.alarms.httpStatus});
            this.setState({numberOfAlarms: 10});
            this.setState({currentPage: 0});
            this.setState({stockStatusFilter: null});
        }

        if (nextprops.flashMessages !== this.props.flashMessages) {
            var index = nextprops.flashMessages.findIndex(flashMessage => flashMessage.text == MESSAGE_GOT_NEW_ALARM);
            if (index !== -1) {
                this.resetAll();
            }
            window.setTimeout(() => {
                this.props.deleteByValueFlashMessages(MESSAGE_GOT_NEW_ALARM);
            }, TIME_OF_NEW_ALARM_POP_UP)

            var indexResolvedAlarm = nextprops.flashMessages.findIndex(flashMessage => flashMessage.text == RESOLVED_ALARM);
            if (indexResolvedAlarm !== -1) {
                window.setTimeout(() => {
                    this.props.deleteByValueFlashMessages(RESOLVED_ALARM);
                }, TIME_OF_RESOLVED_ALARM)
            }
        }

        if (nextprops.alarmsFilteringAndOrdering !== this.props.alarmsFilteringAndOrdering) {
            this.setState({filteringAndOrderingData: nextprops.alarmsFilteringAndOrdering.filteringAndOrderingData})
            this.setState({currentPage: nextprops.alarmsFilteringAndOrdering.filteringAndOrderingData.page})
            this.setState({numberOfAlarms: nextprops.alarmsFilteringAndOrdering.filteringAndOrderingData.size})

            this.setState({stockStatusFilter: nextprops.alarmsFilteringAndOrdering.filteringAndOrderingData.stockStatus})
            this.setState({brandFilter: nextprops.alarmsFilteringAndOrdering.filteringAndOrderingData.brand})
            this.setState({modelFilter: nextprops.alarmsFilteringAndOrdering.filteringAndOrderingData.model})
            this.setState({selectedOptionsFilter: nextprops.alarmsFilteringAndOrdering.filteringAndOrderingData.selectedOptions})
            this.setState({priceToFilter: nextprops.alarmsFilteringAndOrdering.filteringAndOrderingData.priceTo})
            this.setState({priceFromFilter: nextprops.alarmsFilteringAndOrdering.filteringAndOrderingData.priceFrom})
            this.setState({ratingFromFilter: nextprops.alarmsFilteringAndOrdering.filteringAndOrderingData.ratingFrom})
            this.setState({ratingToFilter: nextprops.alarmsFilteringAndOrdering.filteringAndOrderingData.ratingTo})
            this.setState({iso8601FromFilter: nextprops.alarmsFilteringAndOrdering.filteringAndOrderingData.dateEntreeFrom})
            this.setState({iso8601ToFilter: nextprops.alarmsFilteringAndOrdering.filteringAndOrderingData.dateEntreeTo})
            this.props.nextPage(nextprops.alarmsFilteringAndOrdering.filteringAndOrderingData)
/*            filteringAndOrdering = {
                'page': nextprops.alarmsFilteringAndOrdering.filteringAndOrderingData.page,
                'size': nextprops.alarmsFilteringAndOrdering.filteringAndOrderingData.size,

                'speedTo':  nextprops.alarmsFilteringAndOrdering.filteringAndOrderingData.speedTo,
                'speedFrom':  nextprops.alarmsFilteringAndOrdering.filteringAndOrderingData.speedFrom,
                'resolved': nextprops.alarmsFilteringAndOrdering.filteringAndOrderingData.resolved,
                'batteryVoltageFrom': nextprops.alarmsFilteringAndOrdering.filteringAndOrderingData.batteryVoltageFrom,
                'batteryVoltageTo': nextprops.alarmsFilteringAndOrdering.filteringAndOrderingData.batteryVoltageTo,
                'alarmTypes': nextprops.alarmsFilteringAndOrdering.filteringAndOrderingData.alarmTypes,
                'deviceId': nextprops.alarmsFilteringAndOrdering.filteringAndOrderingData.deviceId,
                'patientName': nextprops.alarmsFilteringAndOrdering.filteringAndOrderingData.patientName,
                'alarmDateTo': nextprops.alarmsFilteringAndOrdering.filteringAndOrderingData.alarmDateTo,
                'alarmDateFrom': nextprops.alarmsFilteringAndOrdering.filteringAndOrderingData.alarmDateFrom,
                'orders': orderingBuilder(this.state)
            }
            this.props.nextPage(filteringAndOrdering);*/
        }



    }

    resetAll = () => {
        this.setState({stockStatusFilter: DEFAULT_FILTERING_PARAMETERS.stockStatusFilter});
        this.setState({modelFilter: DEFAULT_FILTERING_PARAMETERS.modelFilter});
        this.setState({brandFilter: DEFAULT_FILTERING_PARAMETERS.brandFilter});
        this.setState({iso8601FromFilter: DEFAULT_FILTERING_PARAMETERS.iso8601FromFilter});
        this.setState({dateFromFilter: DEFAULT_FILTERING_PARAMETERS.dateFromFilter});
        this.setState({timeFromFilter: DEFAULT_FILTERING_PARAMETERS.timeFromFilter});
        this.setState({iso8601ToFilter: DEFAULT_FILTERING_PARAMETERS.priceToFilter});
        this.setState({dateToFilter: DEFAULT_FILTERING_PARAMETERS.dateToFilter});
        this.setState({timeToFilter: DEFAULT_FILTERING_PARAMETERS.timeToFilter});
        this.setState({selectedOptionsFilter: DEFAULT_FILTERING_PARAMETERS.selectedOptionsFilter});
        this.setState({ratingFromFilter: DEFAULT_FILTERING_PARAMETERS.ratingFromFilter});
        this.setState({ratingToFilter: DEFAULT_FILTERING_PARAMETERS.ratingToFilter});
        this.setState({priceFromFilter: DEFAULT_FILTERING_PARAMETERS.priceFromFilter});
        this.setState({priceToFilter: DEFAULT_FILTERING_PARAMETERS.priceToFilter});
        this.setState({numberOfAlarms: 10});
        this.setState({currentPage: 0});

        this.setState({stockStatusOrdering: 0});
        this.setState({stockStatusPriority: 1});

        this.setState({dateEntreeOrdering: 1});
        this.setState({dateEntreePriority: 2});

        this.setState({brandOrdering: -1});
        this.setState({brandPriority: 3});

        this.setState({modelOrdering: -1});
        this.setState({modelPriority: 4});

        this.setState({selectedOptionsOrdering: -1});
        this.setState({selectedOptionsPriority: 5});

        this.setState({priceOrdering: -1});
        this.setState({pricePriority: 6});

        this.setState({ratingOrdering: -1});
        this.setState({ratingPriority: 7});

        filteringAndOrdering = {
            'page': 0,
            'size': this.state.numberOfAlarms,
            'stockStatus': DEFAULT_FILTERING_PARAMETERS.stockStatusFilter,
            'brand': DEFAULT_FILTERING_PARAMETERS.brandFilter,
            'model': DEFAULT_FILTERING_PARAMETERS.modelFilter,
            'selectedOptions': DEFAULT_FILTERING_PARAMETERS.selectedOptionsFilter,
            'priceTo': DEFAULT_FILTERING_PARAMETERS.priceToFilter,
            'priceFrom': DEFAULT_FILTERING_PARAMETERS.priceFromFilter,
            'ratingFrom': DEFAULT_FILTERING_PARAMETERS.ratingFromFilter,
            'ratingTo': DEFAULT_FILTERING_PARAMETERS.ratingToFilter,
            'dateEntreeTo': DEFAULT_FILTERING_PARAMETERS.dateToFilter,
            'dateEntreeFrom': DEFAULT_FILTERING_PARAMETERS.dateFromFilter,
            'orders': DEFAULT_ORDERING_PARAMETERS.orders
            //'orders': orderingBuilder(this.state)
        }

        this.props.nextPage(filteringAndOrdering);
        this.props.saveFilterigAndOrdering(filteringAndOrdering);
        //this.props.saveFilterigAndOrdering(filteringAndOrdering);
    }

    getPreviousPage = () => {
        if (this.state.currentPage > 0) {
            filteringAndOrdering = {
                'page': this.state.currentPage - 1,
                'size': this.state.numberOfAlarms,
                'stockStatus': this.state.stockStatusFilter,
                'brand': this.state.brandFilter,
                'model': this.state.modelFilter,
                'selectedOptions': this.state.selectedOptionsFilter,
                'priceTo': this.state.priceToFilter,
                'priceFrom': this.state.priceFromFilter,
                'ratingFrom': this.state.ratingFromFilter,
                'ratingTo': this.state.ratingToFilter,
                'dateEntreeTo': this.state.iso8601ToFilter,
                'dateEntreeFrom': this.state.iso8601FromFilter,
                'orders': orderingBuilder(this.state)
            }
            this.props.nextPage(filteringAndOrdering);
            this.props.saveFilterigAndOrdering(filteringAndOrdering);
            this.setState({currentPage: this.state.currentPage - 1 })
        }
    }

    getNextPage = () => {
        if (this.state.currentPage < this.state.totalPages - 1) {
            filteringAndOrdering = {
                'page': this.state.currentPage + 1,
                'size': this.state.numberOfAlarms,
                'stockStatus': this.state.stockStatusFilter,
                'brand': this.state.brandFilter,
                'model': this.state.modelFilter,
                'selectedOptions': this.state.selectedOptionsFilter,
                'priceTo': this.state.priceToFilter,
                'priceFrom': this.state.priceFromFilter,
                'ratingFrom': this.state.ratingFromFilter,
                'ratingTo': this.state.ratingToFilter,
                'dateEntreeTo': this.state.iso8601ToFilter,
                'dateEntreeFrom': this.state.iso8601FromFilter,
                'orders': orderingBuilder(this.state)
            }
            this.props.nextPage(filteringAndOrdering);
            this.props.saveFilterigAndOrdering(filteringAndOrdering);
            this.setState({currentPage: this.state.currentPage + 1})
        }
    }

    getFirstPage = () => {
        filteringAndOrdering = {
            'page': 0,
            'size': this.state.numberOfAlarms,
            'stockStatus': this.state.stockStatusFilter,
            'brand': this.state.brandFilter,
            'model': this.state.modelFilter,
            'selectedOptions': this.state.selectedOptionsFilter,
            'priceTo': this.state.priceToFilter,
            'priceFrom': this.state.priceFromFilter,
            'ratingFrom': this.state.ratingFromFilter,
            'ratingTo': this.state.ratingToFilter,
            'dateEntreeTo': this.state.iso8601ToFilter,
            'dateEntreeFrom': this.state.iso8601FromFilter,
            'orders': orderingBuilder(this.state)
        }
        this.props.nextPage(filteringAndOrdering);
        this.props.saveFilterigAndOrdering(filteringAndOrdering);
        this.setState({currentPage: 0})
    }

    getLastPage = () => {
        if (this.state.currentPage >= 0) {
            filteringAndOrdering = {
                'page': this.state.totalPages - 1,
                'size': this.state.numberOfAlarms,
                'stockStatus': this.state.stockStatusFilter,
                'brand': this.state.brandFilter,
                'model': this.state.modelFilter,
                'selectedOptions': this.state.selectedOptionsFilter,
                'priceTo': this.state.priceToFilter,
                'priceFrom': this.state.priceFromFilter,
                'ratingFrom': this.state.ratingFromFilter,
                'ratingTo': this.state.ratingToFilter,
                'dateEntreeTo': this.state.iso8601ToFilter,
                'dateEntreeFrom': this.state.iso8601FromFilter,
                'orders': orderingBuilder(this.state)
            }
            this.props.nextPage(filteringAndOrdering);
            this.props.saveFilterigAndOrdering(filteringAndOrdering);
            if (this.state.totalPages === 1) {
                this.setState({currentPage: this.state.totalPages})
            } else {
                this.setState({currentPage: this.state.totalPages - 1})
            }
        }
    }

    changeNumberOfPage = (event, index, value) => {
        this.setState({numberOfAlarms: value});
        this.setState({currentPage: 0});
        this.props.nextPage({
            'page': 0,
            'size': value,
            'orders': [
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
            ]
        });
    }

    onItemClick = (event, child) => {
        //event.stopPropagation()
        //event.preventDefault()
    }

    onRequestChange = (open, reason) => {
       // open.stopPropagation()
        //open.preventDefault()
    }


    onClickResolveOrdering = (event) => {
        const idx = getOrderingState('next', this.state.stockStatusOrdering)
        console.log('stockStatusOrdering idx before  = ', this.state.stockStatusOrdering)
        console.log('stockStatusOrdering idx = ', idx)
        console.log('stockStatusOrdering arr = ', orderingBuilder(this.state, 'stockStatus', idx))
        this.setState({stockStatusOrdering: idx});
        filteringAndOrdering = {
            'page': 0,
            'size': this.state.numberOfAlarms,
            'stockStatus': this.state.stockStatusFilter,
            'brand': this.state.brandFilter,
            'model': this.state.modelFilter,
            'selectedOptions': this.state.selectedOptionsFilter,
            'priceFrom': this.state.priceFromFilter,
            'priceTo': this.state.priceToFilter,
            'ratingFrom': this.state.ratingFromFilter,
            'ratingTo': this.state.ratingToFilter,
            'dateEntreeTo': this.state.iso8601ToFilter,
            'dateEntreeFrom': this.state.iso8601FromFilter,
            'orders': orderingBuilder(this.state, 'stockStatus', idx)
        }
        this.props.nextPage(filteringAndOrdering);
        this.props.saveFilterigAndOrdering(filteringAndOrdering);
    }

    onClickAlarmDateOrdering = (event) => {
        const idx = getOrderingState('next', this.state.dateEntreeOrdering)
        this.setState({dateEntreeOrdering: idx});
        filteringAndOrdering = {
            'page': 0,
            'size': this.state.numberOfAlarms,
            'stockStatus': this.state.stockStatusFilter,
            'brand': this.state.brandFilter,
            'model': this.state.modelFilter,
            'selectedOptions': this.state.selectedOptionsFilter,
            'priceFrom': this.state.priceFromFilter,
            'priceTo': this.state.priceToFilter,
            'ratingFrom': this.state.ratingFromFilter,
            'ratingTo': this.state.ratingToFilter,
            'dateEntreeTo': this.state.iso8601ToFilter,
            'dateEntreeFrom': this.state.iso8601FromFilter,
            'orders': orderingBuilder(this.state, 'alarmDate', idx)
        }
        this.props.nextPage(filteringAndOrdering);
        this.props.saveFilterigAndOrdering(filteringAndOrdering);
    }

    onClickDeviceIdOrdering = (event) => {
        const idx = getOrderingState('next', this.state.brandOrdering)
        this.setState({brandOrdering: idx});
        filteringAndOrdering = {
            'page': 0,
            'size': this.state.numberOfAlarms,
            'stockStatus': this.state.stockStatusFilter,
            'brand': this.state.brandFilter,
            'model': this.state.modelFilter,
            'selectedOptions': this.state.selectedOptionsFilter,
            'priceFrom': this.state.priceFromFilter,
            'priceTo': this.state.priceToFilter,
            'ratingFrom': this.state.ratingFromFilter,
            'ratingTo': this.state.ratingToFilter,
            'dateEntreeTo': this.state.iso8601ToFilter,
            'dateEntreeFrom': this.state.iso8601FromFilter,
            'orders': orderingBuilder(this.state, 'deviceId', idx)
        }
        this.props.nextPage(filteringAndOrdering);
        this.props.saveFilterigAndOrdering(filteringAndOrdering);
    }

    onClickClientNameOrdering = (event) => {
        const idx = getOrderingState('next', this.state.modelOrdering)
        this.setState({modelOrdering: idx});
        filteringAndOrdering = {
            'page': 0,
            'size': this.state.numberOfAlarms,
            'stockStatus': this.state.stockStatusFilter,
            'brand': this.state.brandFilter,
            'model': this.state.modelFilter,
            'selectedOptions': this.state.selectedOptionsFilter,
            'priceFrom': this.state.priceFromFilter,
            'priceTo': this.state.priceToFilter,
            'ratingFrom': this.state.ratingFromFilter,
            'ratingTo': this.state.ratingToFilter,
            'dateEntreeTo': this.state.iso8601ToFilter,
            'dateEntreeFrom': this.state.iso8601FromFilter,
            'orders': orderingBuilder(this.state, 'clientName', idx)
        }
        this.props.nextPage(filteringAndOrdering);
        this.props.saveFilterigAndOrdering(filteringAndOrdering);
    }

    onClickAlarmTypeOrdering = (event) => {
        const idx = getOrderingState('next', this.state.selectedOptionsOrdering)
        this.setState({selectedOptionsOrdering: idx});
        filteringAndOrdering = {
            'page': 0,
            'size': this.state.numberOfAlarms,
            'stockStatus': this.state.stockStatusFilter,
            'brand': this.state.brandFilter,
            'model': this.state.modelFilter,
            'selectedOptions': this.state.selectedOptionsFilter,
            'priceFrom': this.state.priceFromFilter,
            'priceTo': this.state.priceToFilter,
            'ratingFrom': this.state.ratingFromFilter,
            'ratingTo': this.state.ratingToFilter,
            'dateEntreeTo': this.state.iso8601ToFilter,
            'dateEntreeFrom': this.state.iso8601FromFilter,
            'orders': orderingBuilder(this.state, 'alarmTypes', idx)
        }
        this.props.nextPage(filteringAndOrdering);
        this.props.saveFilterigAndOrdering(filteringAndOrdering);
    }

    onClickBatteryVoltageOrdering = (event) => {
        const idx = getOrderingState('next', this.state.priceOrdering)
        this.setState({priceOrdering: idx});
        filteringAndOrdering = {
            'page': 0,
            'size': this.state.numberOfAlarms,
            'stockStatus': this.state.stockStatusFilter,
            'brand': this.state.brandFilter,
            'model': this.state.modelFilter,
            'selectedOptions': this.state.selectedOptionsFilter,
            'priceFrom': this.state.priceFromFilter,
            'priceTo': this.state.priceToFilter,
            'ratingFrom': this.state.ratingFromFilter,
            'ratingTo': this.state.ratingToFilter,
            'dateEntreeTo': this.state.iso8601ToFilter,
            'dateEntreeFrom': this.state.iso8601FromFilter,
            'orders': orderingBuilder(this.state, 'batteryVoltage', idx)
        }
        this.props.nextPage(filteringAndOrdering);
        this.props.saveFilterigAndOrdering(filteringAndOrdering);
    }

    onClickSpeedOrdering = (event) => {
        const idx = getOrderingState('next', this.state.ratingOrdering)
        this.setState({ratingOrdering: idx});
        filteringAndOrdering = {
            'page': 0,
            'size': this.state.numberOfAlarms,
            'stockStatus': this.state.stockStatusFilter,
            'brand': this.state.brandFilter,
            'model': this.state.modelFilter,
            'selectedOptions': this.state.selectedOptionsFilter,
            'priceFrom': this.state.priceFromFilter,
            'priceTo': this.state.priceToFilter,
            'ratingFrom': this.state.ratingFromFilter,
            'ratingTo': this.state.ratingToFilter,
            'dateEntreeTo': this.state.iso8601ToFilter,
            'dateEntreeFrom': this.state.iso8601FromFilter,
            'orders': orderingBuilder(this.state, 'speed', idx)
        }
        this.props.nextPage(filteringAndOrdering);
        this.props.saveFilterigAndOrdering(filteringAndOrdering);
    }

    onWsMessage = (msg) => {
        console.log(msg);
        this.props.showFlashMessage({type: 'error', text: MESSAGE_GOT_NEW_ALARM})
    }

    onToggleAlarmManagment = () =>  {
        this.setState({
            modalAlarmManagment: !this.state.modalAlarmManagment,
        });
    }

    render = () => {

        return (
            <div>
                <div className="main-header-style-1">
                    <h5>{this.state.alarms_page_header_main_title}</h5>
                </div>
                <div className="main-table-style-1">
                    <div>
                        <MuiThemeProvider>
                            <FiltersBarView/>
                        </MuiThemeProvider>
                    </div>
                    <div>
                        <MuiThemeProvider>
                            <div>
                                <Table
                                    height='510px'
                                    fixedHeader={this.state.fixedHeader}
                                    fixedFooter={this.state.fixedFooter}
                                    selectable={this.state.selectable}
                                    multiSelectable={this.state.multiSelectable}
                                    //bodyStyle={{ border: '1px solid' }}
                                >
                                    <TableHeader
                                        displaySelectAll={this.state.showCheckboxes}
                                        adjustForCheckbox={this.state.showCheckboxes}
                                        enableSelectAll={this.state.enableSelectAll}
                                        style={{border: '0px solid', backgroundColor: '#60605e'}}
                                    >

                                        <TableRow>
                                            <TableHeaderColumn style={{color: 'white', paddingLeft: '0px'}} >
                                                <IconButton iconStyle={{color: 'white'}} onClick={this.resetAll} >
                                                    <Reply/>
                                                </IconButton>
                                            </TableHeaderColumn>
                                            <TableHeaderColumn
                                                style={{
                                                    color: 'white',
                                                    paddingLeft: '0.8%',
                                                    fontSize: '16px',
                                                    width: tableMainStyles.column2.width
                                                }}
                                                //tooltip="Device ID"
                                            >
                                                <div className="braclet-id-header-main-style-1">
                                                    <div className="braclet-id-text-main-style-1">
                                                        <div>Brand</div>
                                                        <div>{this.state.alarms_page_table_header_device_id2}</div>
                                                    </div>
                                                    <div></div>
                                                    <div>
                                                        <IconButton iconStyle={{color: 'white'}}
                                                                    onClick={this.onClickDeviceIdOrdering}>
                                                            {this.state.brandOrdering === -1 && <Remove/>}
                                                            {this.state.brandOrdering === 0 && <ArrowUpward/>}
                                                            {this.state.brandOrdering === 1 && <ArrowDownward/>}
                                                        </IconButton>
                                                    </div>
                                                    <div>
                                                    </div>
                                                </div>
                                            </TableHeaderColumn>
                                            <TableHeaderColumn
                                                style={{
                                                    color: 'white',
                                                    paddingLeft: '0.8%',
                                                    fontSize: '16px',
                                                    width: tableMainStyles.column3.width
                                                }}
                                                >
                                                <div className="client-name-header-main-style-1">
                                                    <div className="client-name-text-main-style-1">
                                                        <div>{this.state.alarms_page_table_header_client_name1}</div>
                                                        <div>{this.state.alarms_page_table_header_client_name2}</div>
                                                    </div>
                                                    <div></div>
                                                    <div>
                                                        <IconButton iconStyle={{color: 'white'}}
                                                                    onClick={this.onClickClientNameOrdering}>
                                                            {this.state.modelOrdering === -1 && <Remove/>}
                                                            {this.state.modelOrdering === 0 && <ArrowUpward/>}
                                                            {this.state.modelOrdering === 1 && <ArrowDownward/>}
                                                        </IconButton>
                                                    </div>
                                                    <div>
                                                    </div>
                                                </div>
                                            </TableHeaderColumn>
                                            <TableHeaderColumn
                                                style={{
                                                    color: 'white',
                                                    paddingLeft: '0.8%',
                                                    fontSize: '16px',
                                                    width: tableMainStyles.column4.width
                                                }}
                                                //tooltip="Hour and Date"
                                            >
                                                <div className="hour-and-date-header-main-style-1">
                                                    <div className="hour-and-date-text-main-style-1">
                                                        <div>{this.state.alarms_page_table_header_hour_and_date1}</div>
                                                        <div>{this.state.alarms_page_table_header_hour_and_date2}</div>
                                                    </div>
                                                    <div></div>
                                                    <div>
                                                        <IconButton iconStyle={{color: 'white'}}
                                                                    onClick={this.onClickAlarmDateOrdering}>
                                                            {this.state.dateEntreeOrdering === -1 && <Remove/>}
                                                            {this.state.dateEntreeOrdering === 0 && <ArrowUpward/>}
                                                            {this.state.dateEntreeOrdering === 1 && <ArrowDownward/>}
                                                        </IconButton>
                                                    </div>
                                                    <div>
                                                    </div>
                                                </div>
                                            </TableHeaderColumn>
                                            <TableHeaderColumn
                                                style={{
                                                    color: 'white',
                                                    width: tableMainStyles.column5.width,
                                                    paddingLeft: '0.8%',
                                                    fontSize: '16px'
                                                }}
                                                //tooltip="Alarm Type"
                                            >
                                                <div className="alarm-type-header-main-style-1">
                                                    <div className="alarm-type-text-main-style-1">
                                                        <div>{this.state.alarms_page_table_header_alarm_type1}</div>
                                                        <div>{this.state.alarms_page_table_header_alarm_type2}</div>
                                                    </div>
                                                    <div></div>
                                                    <div>
                                                        <IconButton iconStyle={{color: 'white'}}
                                                                    onClick={this.onClickAlarmTypeOrdering}>
                                                            {this.state.selectedOptionsOrdering === -1 && <Remove/>}
                                                            {this.state.selectedOptionsOrdering === 0 && <ArrowUpward/>}
                                                            {this.state.selectedOptionsOrdering === 1 && <ArrowDownward/>}
                                                        </IconButton>
                                                    </div>
                                                    <div>
{/*                                                        <IconMenu
                                                            value={this.state.alarmTypeFilter}
                                                            onChange={this.onChangeAlarmTypeFilter}
                                                            iconButtonElement={<IconButton><MoreVertIcon/></IconButton>}
                                                            anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                                                            targetOrigin={{horizontal: 'left', vertical: 'top'}}
                                                            iconStyle={{color: 'white'}}
                                                            menuStyle={{
                                                                paddingLeft: '7%',
                                                                paddingTop: '3%',
                                                                width: '115%'
                                                            }}
                                                        >
                                                            {this.state.alarmTypesArr !== null && (this.state.alarmTypesArr.map((ob) =>
                                                                <MenuItem key={ob.message} value={ob.message}
                                                                          primaryText={ob.message}/>
                                                            ))}
                                                        </IconMenu>*/}
                                                    </div>
                                                </div>
                                            </TableHeaderColumn>
                                            <TableHeaderColumn
                                                style={{
                                                    color: 'white',
                                                    fontSize: '16px',
                                                    width: tableMainStyles.column6.width,
                                                    paddingLeft: '0.8%',
                                                }}
                                                //tooltip="GPS Battery"
                                            >
                                                <div className="gps-battery-header-main-style-1">
                                                    <div className="gps-battery-text-main-style-1">
                                                        <div>{this.state.alarms_page_table_header_gps_battery1}</div>
                                                        <div>{this.state.alarms_page_table_header_gps_battery2}</div>
                                                    </div>
                                                    <div></div>
                                                    <div>
                                                        <IconButton iconStyle={{color: 'white'}}
                                                                    onClick={this.onClickBatteryVoltageOrdering}>
                                                            {this.state.priceOrdering === -1 && <Remove/>}
                                                            {this.state.priceOrdering === 0 && <ArrowUpward/>}
                                                            {this.state.priceOrdering === 1 &&
                                                            <ArrowDownward/>}
                                                        </IconButton>
                                                    </div>
                                                    <div>
                                                        {/*<IconMenu
                                                            iconButtonElement={<IconButton><MoreVertIcon/></IconButton>}
                                                            anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                                                            targetOrigin={{horizontal: 'left', vertical: 'top'}}
                                                            iconStyle={{color: 'white'}}
                                                           // onClick={this.onSubmit}
                                                            listStyle={{paddingLeft: '10px', paddingRight: '10px'}}>

                                                            <MenuItem
                                                                //onClick={this.onSubmit}
                                                                primaryText="Voltage To"
                                                                rightIcon={<ArrowDropRight/>}
                                                                menuItems={[
                                                                    <MenuItem //onClick={this.onSubmit}
                                                                              children={<TextField
                                                                                  onClick={this.onSubmit}
                                                                                  style={{paddingLeft: '10px'}}
                                                                                  onChange={this.onChangeBatteryVoltageToFilter}
                                                                                  hintText={this.state.batteryVoltageToFilter !== '' ? "Selected To: " + this.state.batteryVoltageToFilter.toString() : "Voltage To"}
                                                                              />}
                                                                    />
                                                                ]}
                                                            />

                                                            <input
                                                            id="Battery-Voltage-To-Filter"
                                                            className="form-control"
                                                            onChange={this.onChangeBatteryVoltageToFilter}
                                                            placeholder={this.state.batteryVoltageToFilter !== null ? "Selected To: " + this.state.batteryVoltageToFilter.toString() : "Voltage To" }
                                                            />
                                                            <MenuItem
                                                                //onClick={this.onSubmit}
                                                                primaryText="Voltage From"
                                                                rightIcon={<ArrowDropRight/>}
                                                                menuItems={[
                                                                    <MenuItem onClick={this.onSubmit}
                                                                              children={<TextField
                                                                                  style={{paddingLeft: '10px'}}
                                                                                  onClick={this.onSubmit}
                                                                                  onChange={this.onChangeBatteryVoltageFromFilter}
                                                                                  hintText={this.state.batteryVoltageFromFilter !== '' ? "Selected From: " + this.state.batteryVoltageFromFilter.toString() : "Voltage From"}
                                                                              />}
                                                                    />
                                                                ]}
                                                            />
                                                        </IconMenu>*/}
                                                    </div>
                                                </div>
                                            </TableHeaderColumn>
                                            <TableHeaderColumn
                                                style={{color: 'white', fontSize: '16px', width: tableMainStyles.column7.width, paddingLeft: '0%'}}
                                                //tooltip="Speed (km/h)"
                                            >
                                                <div className="speed-header-main-style-1">
                                                    <div className="speed-text-main-style-1">
                                                        <div>{this.state.alarms_page_table_header_speed1}</div>
                                                        <div>{this.state.alarms_page_table_header_speed2}</div>
                                                    </div>
                                                    {/*<div className="gps-battery-text-main-style-1">Speed (km/h)</div>*/}
                                                    <div></div>
                                                    <div>
                                                        <IconButton iconStyle={{color: 'white'}}
                                                                    onClick={this.onClickSpeedOrdering}>
                                                            {this.state.ratingOrdering === -1 && <Remove/>}
                                                            {this.state.ratingOrdering === 0 && <ArrowUpward/>}
                                                            {this.state.ratingOrdering === 1 && <ArrowDownward/>}
                                                        </IconButton>
                                                    </div>
                                                    <div>
{/*                                                        <IconMenu
                                                            iconButtonElement={<IconButton><MoreVertIcon/></IconButton>}
                                                            anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                                                            targetOrigin={{horizontal: 'left', vertical: 'top'}}
                                                            iconStyle={{color: 'white'}}
                                                        >

                                                            <MenuItem
                                                                //onClick={this.onSubmit}
                                                                primaryText="Speed To"
                                                                rightIcon={<ArrowDropRight/>}
                                                                menuItems={[
                                                                    <MenuItem //onClick={this.onSubmit}
                                                                              children={<TextField
                                                                                  onClick={this.onSubmit}
                                                                                  style={{paddingLeft: '10px'}}
                                                                                  onChange={this.onChangeSpeedTo}
                                                                                  hintText={this.state.speedToFilter !== '' ? "Selected To: " + this.state.speedToFilter.toString() : "Speed To"}
                                                                              />}
                                                                    />
                                                                ]}
                                                            />

                                                            <MenuItem
                                                                primaryText="Speed From"
                                                                rightIcon={<ArrowDropRight/>}
                                                                menuItems={[
                                                                    <MenuItem
                                                                        children={<TextField
                                                                            style={{paddingLeft: '10px'}}
                                                                            onClick={this.onSubmit}
                                                                            onChange={this.onChangeSpeedFrom}
                                                                            hintText={this.state.speedFromFilter !== '' ? "Selected From: " + this.state.speedFromFilter.toString() : "Speed From"}
                                                                        />}
                                                                    />
                                                                ]}
                                                            />
                                                        </IconMenu>*/}
                                                    </div>
                                                </div>
                                            </TableHeaderColumn>
                                            <TableHeaderColumn
                                                style={{
                                                    color: 'white',
                                                    fontSize: '16px',
                                                    width: tableMainStyles.column8.width,
                                                    paddingLeft: '0.8%',
                                                }}
                                                //tooltip="G sensor"
                                            >
                                                <div className="g-sensor-header-main-style-1">
                                                    <div className="g-sensor-text-main-style-1">
                                                        <div>{this.state.alarms_page_table_header_g_sensor_1}</div>
                                                        <div>{this.state.alarms_page_table_header_g_sensor_2}</div>
                                                    </div>
                                                    <div></div>
                                                    <div>
                                                    </div>
                                                    <div>
                                                    </div>
                                                </div>
                                            </TableHeaderColumn>
                                            <TableHeaderColumn
                                                style={{
                                                    color: 'white',
                                                    fontSize: '16px',
                                                    width: tableMainStyles.column9.width,
                                                    paddingLeft: '0.8%'
                                                }}
                                                //tooltip="Resolve Alarm"
                                            >
                                                <div className="resolve-alarm-header-main-style-1">
                                                    <div className="resolve-alarm-text-main-style-1">
                                                        <div>{this.state.alarms_page_table_header_resolve_alarm_1}</div>
                                                        <div>{this.state.alarms_page_table_header_resolve_alarm_2}</div>
                                                    </div>
                                                    <div></div>
                                                    <div>
                                                        <IconButton iconStyle={{color: 'white'}}
                                                                    onClick={this.onClickResolveOrdering}>
                                                            {this.state.stockStatusOrdering === -1 && <Remove/>}
                                                            {this.state.stockStatusOrdering === 0 && <ArrowUpward/>}
                                                            {this.state.stockStatusOrdering === 1 && <ArrowDownward/>}
                                                        </IconButton>
                                                    </div>
                                                    <div className={'resolve-alarm-box-main-style-1'}>
{/*                                                        <IconMenu
                                                            iconButtonElement={<IconButton><MoreVertIcon/></IconButton>}
                                                            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                                                            targetOrigin={{horizontal: 'right', vertical: 'top'}}
                                                            menuStyle={{paddingLeft: '0px'}}
                                                            iconStyle={{color: 'white'}}
                                                            children={[
                                                                <Toggle
                                                                    label=""
                                                                    style={{width: '1px'}}
                                                                    onToggle={this.onToggleResolve}
                                                                    toggled={this.state.stockStatusFilter}
                                                                    key='toogle-1'
                                                                />,
                                                            ]}
                                                        >
                                                        </IconMenu>*/}
                                                    </div>
                                                </div>
                                            </TableHeaderColumn>
                                        </TableRow>
                                    </TableHeader>

                                    <TableBody
                                        displayRowCheckbox={this.state.showCheckboxes}
                                        deselectOnClickaway={this.state.deselectOnClickaway}
                                        showRowHover={this.state.showRowHover}
                                        stripedRows={this.state.stripedRows}
                                    >
                                        {this.state.alarms.content !== null && (this.state.alarms.content.map((ob) =>
                                            (<TableRow key={ob.brand + ob.model} style={{ backgroundColor: ob.stockStatus === false ? '#ffdede' : '#00000' }} >
                                                <TableRowColumn style={{paddingLeft: '0px'}}>
                                                    <IconButton
                                                        hoveredStyle={{backgroundColor: '#eef6f9'}}
                                                        onClick={() => {
                                                        }}
                                                    >
                                                        <Visibility/>
                                                    </IconButton>
                                                </TableRowColumn>
                                                <TableRowColumn style={{width: tableMainStyles.column2.width, paddingLeft: '0.8%'}}>
                                                    {ob.brand}
                                                </TableRowColumn>
                                                <TableRowColumn style={{
                                                    paddingLeft: '0.8%',
                                                    paddingRight: '0px',
                                                    width: tableMainStyles.column3.width
                                                }}>
                                                    {ob.model}
                                                </TableRowColumn>
                                                <TableRowColumn style={{width: tableMainStyles.column4.width, paddingLeft: '0.8%'}}>
                                                    <div>
                                                        <div>{convertToLocalDateTime(ob.dateEntree, UTC_FORMAT).split(' ')[0]}</div>
                                                        <div>
                                                            {convertToLocalDateTime(ob.dateEntree, UTC_FORMAT).split(' ')[1]}
                                                            {/*{
                                                                parseInt(ob.alarmDate.split(' ')[1].substring(0, 2)) > 11 ?
                                                                    ' PM' : ' AM'
                                                            }*/}
                                                        </div>
                                                    </div>
                                                </TableRowColumn>
                                                <TableRowColumn
                                                    style={{width: tableMainStyles.column5.width, paddingLeft: '0.8%'}}>
                                                    {ob.selectedOptions}
                                                    </TableRowColumn>
                                                <TableRowColumn style={{width: tableMainStyles.column6.width, paddingLeft: '0.8%'}}>
                                                    {ob.price}
                                                    </TableRowColumn>
                                                <TableRowColumn style={{width: tableMainStyles.column7.width, paddingLeft: '0.8%'}}>
                                                    {ob.rating}
                                                    </TableRowColumn>
                                                <TableRowColumn style={{width: tableMainStyles.column8.width}}></TableRowColumn>
                                                <TableRowColumn
                                                    style={{width: tableMainStyles.column9.width, paddingLeft: '0%', textAlign: 'center'}}>{ob.stockStatus === false ?
                                                    <IconButton hoveredStyle={{backgroundColor: '#ffb3b3'}}>
                                                        <Close color={'red'} onClick={() => {
                                                            modalWindow.id = 1,
                                                            modalWindow.readOnly = false,
                                                            this.setState({
                                                                modalAlarmManagment: !this.state.modalAlarmManagment,
                                                            });
                                                        }}/>
                                                    </IconButton>
                                                    :
                                                    <IconButton hoveredStyle={{backgroundColor: '#ccffcc'}}>
                                                        <Done color={'green'} onClick={() => {
                                                            modalWindow.id = 2,
                                                                modalWindow.readOnly = true,
                                                                this.setState({
                                                                    modalAlarmManagment: !this.state.modalAlarmManagment,
                                                                });
                                                        }}/>
                                                    </IconButton>
                                                        }
                                                </TableRowColumn>
                                                {/*                                        <TableRowColumn>{row.name}</TableRowColumn>
                                        <TableRowColumn>{row.status}</TableRowColumn>*/}
                                            </TableRow>)
                                        ))}
                                    </TableBody>
                                    <TableFooter
                                        adjustForCheckbox={false}
                                    >
                                        <TableRow>
                                            <TableRowColumn colSpan="3" style={{textAlign: 'center'}}>
                                                <div className="pagination-main-style-1">
                                                    <div></div>
                                                    <div></div>
                                                    <div>
                                                        <div className="pagination-main-style-2">
                                                            <div>
                                                                <IconButton onClick={this.getFirstPage}>
                                                                    <FirstPage/>
                                                                </IconButton>
                                                            </div>

                                                            <div>
                                                                <IconButton onClick={this.getPreviousPage}>
                                                                    <ChevronLeft/>
                                                                </IconButton>
                                                            </div>

                                                            <div className="current-page-main-style-1">
                                                                <a>{this.state.currentPage + 1}</a>
                                                                {/*<div>{this.state.currentPage}</div>*/}
                                                            </div>

                                                            <div>
                                                                <IconButton onClick={this.getNextPage}>
                                                                    <ChevronRight/>
                                                                </IconButton>
                                                            </div>

                                                            <div>
                                                                <IconButton onClick={this.getLastPage}>
                                                                    <LastPage/>
                                                                </IconButton>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div></div>
                                                    <div>
                                                        <div className="drop-down-menu-style-1">
                                                            <div className="drop-down-menu-header-style-1">
                                                                {this.state.alarms_page_table_show_number}
                                                            </div>
                                                            <div>
                                                                <DropDownMenu
                                                                    value={this.state.numberOfAlarms}
                                                                    onChange={this.changeNumberOfPage}
                                                                    autoWidth={false}
                                                                    style={{width: 120}}
                                                                    menuStyle={{}}
                                                                    menuItemStyle={{}}
                                                                    listStyle={{}}
                                                                    labelStyle={{
                                                                        //border: '1px double black',
                                                                        height: '40px',
                                                                        lineHeight: '40px'
                                                                    }}
                                                                    iconStyle={{
                                                                        fill: 'rgb(0, 0, 0)',
                                                                        width: '0px',
                                                                        marginTop: '-9px'
                                                                    }}
                                                                    selectedMenuItemStyle={{}}
                                                                    underlineStyle={{borderTop: '1px solid rgb(255, 255, 255)'}}
                                                                >
                                                                    <MenuItem value={10} primaryText="10"/>
                                                                    <MenuItem value={20} primaryText="20"/>
                                                                    <MenuItem value={30} primaryText="30"/>
                                                                    <MenuItem value={50} primaryText="50"/>
                                                                </DropDownMenu>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableRowColumn>
                                        </TableRow>
                                        <TableRow>
                                            <TableRowColumn colSpan="3" style={{textAlign: 'center'}}>
                                                © 2018. All Rights Reserved. Coded by Alexey D {this.state.alarms_page_footer_main_title}
                                            </TableRowColumn>
                                        </TableRow>
                                    </TableFooter>
                                </Table>
                            </div>
                        </MuiThemeProvider>
                    </div>
                    <div>
                        <div>
                            <SockJsClient url={HTTPS + HOSTNAME + DELIMITER + PORT + WS} topics={[ALARM_MAIN_TOPIC]}
                                          onMessage={this.onWsMessage}
                                          ref={ (client) => { this.clientRef = client }}
                                          //headers={{ 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }}
                                          //subscribeHeaders={{ 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }}
                            />
                        </div>
                        <div className="modal-content">
                            <Modal
                                isOpen={this.state.modalAlarmManagment}
                                toggle={this.onToggleAlarmManagment}
                                className={this.props.className}
                                style={{paddingTop: '50px'}}
                            >
                                <ModalBody>
                                    <AlarmManagmentForm
                                        id={modalWindow.id}
                                        readOnly={modalWindow.readOnly}
                                        onToggleAlarmManagment={this.onToggleAlarmManagment}
                                    />
                                </ModalBody>
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        alarms: state.alarms || {},
        alarmsFilteringAndOrdering: state.alarmsFilteringAndOrdering || {},
        flashMessages: state.flashMessages,
        lang: state.lang,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        nextPage: (data) => dispatch({type: FETCH_ALARM_DATA, data}),
        deleteAllFlashMessages: (data) => dispatch({type: DELETE_ALL_FLASH_MESSAGES, data}),
        deleteByValueFlashMessages: (data) => dispatch({type: DELETE_BY_VALUE_FLASH_MESSAGES, data}),
        saveFilterigAndOrdering: (data) => dispatch({type: SAVE_FILTERING_AND_ORDERING_DATA, data}),
        showFlashMessage: (data) => dispatch({type: ADD_FLASH_MESSAGE, data})
    }
}

/*const mapStateToProps = (state, ownProps) => {
    return {
        alarms: state.alarms || {},
        alarmsFilteringAndOrdering: state.alarmsFilteringAndOrdering || {},
        flashMessages: state.flashMessages,
        lang: state.lang,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        nextPage: (data) => dispatch({type: FETCH_ALARM_DATA, data}),
        deleteAllFlashMessages: (data) => dispatch({type: DELETE_ALL_FLASH_MESSAGES, data}),
        deleteByValueFlashMessages: (data) => dispatch({type: DELETE_BY_VALUE_FLASH_MESSAGES, data}),
        saveFilterigAndOrdering: (data) => dispatch({type: SAVE_FILTERING_AND_ORDERING_DATA, data}),
        showFlashMessage: (data) => dispatch({type: ADD_FLASH_MESSAGE, data}),
    }
}*/

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AlarmTableView)