import { SAVE_FILTERING_AND_ORDERING_DATA } from './alarmActions';
import { DEFAULT_FILTERING_PARAMETERS } from '../../properties/properties'

const initialState = {
    filteringAndOrderingData: {
        page: DEFAULT_FILTERING_PARAMETERS.page,
        size: DEFAULT_FILTERING_PARAMETERS.size,

        modelName: DEFAULT_FILTERING_PARAMETERS.modelFilter,
        brandId: DEFAULT_FILTERING_PARAMETERS.brandFilter,
        selectedOptions: DEFAULT_FILTERING_PARAMETERS.selectedOptionsFilter,
        dateEntreeFrom: DEFAULT_FILTERING_PARAMETERS.iso8601FromFilter,
        dateEntreeTo: DEFAULT_FILTERING_PARAMETERS.iso8601ToFilter,
        ratingFrom: DEFAULT_FILTERING_PARAMETERS.ratingFromFilter,
        ratingTo: DEFAULT_FILTERING_PARAMETERS.ratingToFilter,
        priceFrom: DEFAULT_FILTERING_PARAMETERS.priceFromFilter,
        priceTo: DEFAULT_FILTERING_PARAMETERS.priceToFilter,
        stockStatus: DEFAULT_FILTERING_PARAMETERS.stockStatusFilter,
    }
};

export default (state = initialState, action = {}) => {

    switch(action.type) {

        case SAVE_FILTERING_AND_ORDERING_DATA:
            return {
                ...state,
                filteringAndOrderingData: action.data
            };

        default: return state;
    }
}