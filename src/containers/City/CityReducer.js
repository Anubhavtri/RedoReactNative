

import Constants from './CityConstants';
import { REHYDRATE } from 'redux-persist';

let initialState = {
    cityPincode: [],
    cityObj: {},
    cityId: {}
};

export default function MyAccountReducer(state = initialState, action) {
    let newState = Object.assign({}, state);
    switch (action.type) {
        case REHYDRATE:
            newState = action.payload?.city ?
                action.payload.city : newState;
            break;
        case Constants.ACTIONS.GET_CITY_PINCODELIST:
            newState.cityPincode = action.data;
            break;
        case Constants.ACTIONS.GET_CITY_ID:
            newState.cityId = action.data;
            break;
        case Constants.ACTIONS.CLEAR_CITY_OBJ:
            newState.cityId = {};
            break;
        case Constants.ACTIONS.SAVE_SEL_PINCODE:
            console.log(action.data, "Here city Obj")
            newState.cityObj = action.data;
            break;
        default:
            break;
    }
    return newState;
}
