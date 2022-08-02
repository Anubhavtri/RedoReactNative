import Constants from './CityConstants';

let initialState = {
    leadId: {},
};

export default function MyAccountReducer(state = initialState, action) {
    let newState = Object.assign({}, state);

    switch (action.type) {
        case Constants.ACTIONS.GET_CITY_DETAILS:
            newState.leadId = action.data;
            break;
        default:
            break;
    }
    return newState;
}