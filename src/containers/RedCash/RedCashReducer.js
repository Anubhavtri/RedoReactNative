import Constants from './RedCashConstants';

let initialState = {
    redCash: {},
    redCashDetails: {}
};

export default function MyRedCashDetailsReducer(state = initialState, action) {
    let newState = Object.assign({}, state);

    switch (action.type) {
        case Constants.ACTIONS.GET_REDCASH:
            newState.redCash = action.data;
            break;
        case Constants.ACTIONS.GET_REDCASH_DETAILS:
            newState.redCashDetails = action.data;
            break;
        default:
            break;
    }
    return newState;
}