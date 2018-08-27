import {
    I18,
    LANGUAGE_DEFAULT,
    EN,
    FR,
} from '../properties/properties'
import alarmsPagelanguageData from './data/AlarmsPagelanguageData';
import itineraryPagelanguageData from './data/ItineraryPagelanguageData';
import devicePagelanguageData from './data/DevicePagelanguageData';
import layoutWidgetLanguageData from './data/LayoutWidgetLanguageData';
import patientsPagelanguageData from './data/PatientsPagelanguageData'
import patientPagelanguageData from './data/PatientPagelanguageData'

import filter from 'lodash/filter';

export function translateAlarmsPage(key) {
    var indexes = filter(alarmsPagelanguageData,
        {
            id_key: key
        })

    var locale = localStorage.getItem(I18);

    switch (locale) {

        case FR:
            return indexes[0].fr

        case EN:
            return indexes[0].en

        default:
            return indexes[0].fr
    }
}

export function translateItineraryPage(key) {
    var indexes = filter(itineraryPagelanguageData,
        {
            id_key: key
        })

    var locale = localStorage.getItem(I18);

    switch (locale) {

        case FR:
            return indexes[0].fr

        case EN:
            return indexes[0].en

        default:
            return indexes[0].fr
    }
}

export function translateDevicePage(key) {
    var indexes = filter(devicePagelanguageData,
        {
            id_key: key
        })

    var locale = localStorage.getItem(I18);

    switch (locale) {

        case FR:
            return indexes[0].fr

        case EN:
            return indexes[0].en

        default:
            return indexes[0].fr
    }
}

export function translatePatientsPage(key) {
    var indexes = filter(patientsPagelanguageData,
        {
            id_key: key
        })

    var locale = localStorage.getItem(I18);

    switch (locale) {

        case FR:
            return indexes[0].fr

        case EN:
            return indexes[0].en

        default:
            return indexes[0].fr
    }
}

export function translatePatientPage(key) {
    var indexes = filter(patientPagelanguageData,
        {
            id_key: key
        })

    var locale = localStorage.getItem(I18);

    switch (locale) {

        case FR:
            return indexes[0].fr

        case EN:
            return indexes[0].en

        default:
            return indexes[0].fr
    }
}

export function translateArrayOfAlarmTypes(arr) {
    var translatedArr = []

    arr.forEach(function(element) {
        translatedArr.push(translateAlarmsPage(element))
    });

    return translatedArr
}

export function translateLayout(key) {
    var indexes = filter(layoutWidgetLanguageData,
        {
            id_key: key
        })

    var locale = localStorage.getItem(I18);

    switch (locale) {

        case FR:
            return indexes[0].fr

        case EN:
            return indexes[0].en

        default:
            return indexes[0].fr
    }
}
