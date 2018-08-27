export const POST = 'POST'
export const GET = 'GET'
export const DELETE = 'DELETE'
export const PUT = 'PUT'

//export const HOSTNAME = '172.16.1.129'
export const HOSTNAME = '172.16.1.42'
//export const HOSTNAME = 'localhost'
export const PORT = 8443
export const PATH_METHOD_AUTHENTICATE = '/authenticate'
export const PATH_METHOD_ALARM_LOAD = '/alarm/load'
export const PATH_METHOD_DEVICE_ADD = '/device/new';
export const PATH_METHOD_DEVICE_MODIFY = '/device/modify';
export const PATH_METHOD_DEVICE_LOAD = '/device/load/'
export const PATH_METHOD_DEVICE_LOAD_FREE = '/device/load/free';
export const PATH_METHOD_DEVICE_LOAD_ALL = '/device/load/all'
export const PATH_METHOD_DEVICE_EVENTS_LOAD = '/event/load/'
export const PATH_METHOD_ALARM_TYPE_LOAD_ALL = '/alarm/type/load/all'
export const PATH_METHOD_ALARM_RESOLVE = '/alarm/resolve'
export const PATH_METHOD_LOAD_RESOLVED_ALARM = '/alarm/resolve/load/'
export const PATH_METHOD_EVENT_LOAD_ALARM = '/event/load/alarm/'
export const PATH_METHOD_PATIENT_LOAD = '/patient/load/';
export const PATH_METHOD_PATIENT_ADD = '/patient/new/';
export const PATH_METHOD_PATIENT_UPLOAD_IMAGE = '/patient/image/upload/';
export const PATH_METHOD_PATIENT_LOAD_IMAGES = '/patient/image/';
export const PATH_METHOD_PATIENT_REMOVE_IMAGE = '/patient/image/remove/';
export const PATH_METHOD_PATIENT_LOAD_FULL_INFO = '/patient/load/';
export const PATH_METHOD_PATIENT_MODIFY = '/patient/modify';
export const PATH_METHOD_EYE_COLOR_LOAD_ALL = '/common/eye/color/load/all';
export const PATH_METHOD_CITY_LOAD_ALL = '/common/city/load/all';
export const PATH_METHOD_PROVINCE_LOAD_ALL = '/common/province/load/all';
export const PATH_METHOD_COUNTRY_LOAD_ALL = '/common/country/load/all';
export const PATH_METHOD_PARENT_LINK_LOAD_ALL = '/common/parent/link/load/all';
export const PATH_METHOD_DEVICE_IN_USE_LOAD = '/device/load/in/use';

export const HTTPS = 'HTTPS://'
export const WS = '/ws'
export const DELIMITER = ':'
export const ALARM_MAIN_TOPIC = '/alarm/new'

export const PAGE_STATUS_200 = 200
export const PAGE_STATUS_500 = 500
export const PAGE_STATUS_UNDEFINED = 'undefined'

export const APPLICATION_JSON = 'application/json'
export const JSON = 'json'
export const BEARER = 'Bearer '

export const ENCODING_UTF8 = 'utf8'
export const SESSION_TIME_IN_SECONDS = 8
export const SECONDS_IN_MINUTE = 60
export const MILLISECONDS_IN_SECOND = 1000

export const TIME_OF_LOG_IN_POP_UP = 3500
export const TIME_OF_NEW_ALARM_POP_UP = 15000
export const TIME_OF_RESOLVED_ALARM = 5000

export const INDEX_OF_FIRST_POAGE = 0
export const MAX_INT_SIZE = 32677

export const UTC_FORMAT = "YYYY-MM-DD HH:mm:ss"
export const UTC_MIN_TIME_DATA = "2001-01-01 00:00:00"
export const MINUTES = "minutes"
export const TWO_HOURS_OFFSET_IN_MINUTES = -120
export const SIX_HOURS_OFFSET_IN_MINUTES = -360
export const TWENY_FOUR_HOURS_OFFSET_IN_MINUTES = -1440
export const WEEK_OFFSET_IN_MINUTES = -34560

export const JWT_TOKEN = 'jwtToken'
export const TOKEN = 'token'
export const ACCESS = 'access'
export const USER_NAME = 'userName'
export const LANGUAGE = 'language'

export const LANGUAGE_DEFAULT = 'FR'
export const FR = 'FR'
export const EN = 'EN'
export const I18 = 'i18'

export const DEFAULT_ORDERING_PARAMETERS = {
    'page': 0,
    'size': 10,
    'orders' : [
        {
            'property' : 'stockStatus',
            'priority' : 1,
            'direction' : 'ASC'
        },
        {
            'property' : 'dateEntree',
            'priority' : 2,
            'direction' : 'DESC'
        }
    ]
}

export const DEFAULT_COORDINATES = {
    latitude: 39,
    longitude: -100
}

export const DEFAULT_FILTERING_PARAMETERS = {
    page: 0,
    size: 10,

    stockStatusFilter: null,
    modelFilter: '',
    brandFilter: [],
    selectedOptionsFilter: [],
    priceFromFilter: '',
    priceToFilter: '',
    ratingFromFilter: '',
    ratingToFilter: '',
    iso8601FromFilter: '',
    dateFromFilter: '',
    timeFromFilter: '00:00:00',
    iso8601ToFilter: '',
    dateToFilter: '',
    timeToFilter: '00:00:00'
}

export const FILTERS_OF_NAME = {
    PatientName:'PatientName',
    DeviceId:'DeviceId',
    AlarmType:'AlarmType',
    DateTimeAll:'DateTimeAll',
    BatterryVoltageAll:'BatterryVoltageAll',
    SpeedAll:'SpeedAll',
    ResolveAlarm:'ResolveAlarm',
}
