import Constants from './BookingConstant';

let initialState = {
    booking: [],
    download: {},
    latLngPhl: {},
    latLngCus:{},
};

export default function BestPackageListReducer(state = initialState, action) {
    let newState = Object.assign({}, state);

    switch (action.type) {
        case Constants.ACTIONS.GET_BOOKING:
            newState.booking = action.data;
            break;
        case Constants.ACTIONS.DOWNLOAD:
            newState.download = action.data;
            break;
        case Constants.ACTIONS.SET_LAT_LAG_PHLEBO:
            newState.latLngPhl = action.data;
            break;
        case Constants.ACTIONS.SET_LAT_LAG_CUSTOMER:
            newState.latLngCus = action.data;
            break;    
        case Constants.ACTIONS.CLEAR_DATA:
            newState = initialState;
            break;
        default:
            break;
    }
    return newState;
}


