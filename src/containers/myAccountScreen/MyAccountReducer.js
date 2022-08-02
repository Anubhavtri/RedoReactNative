import Constants from './MyAccountConstants';

let initialState = {
    punchInDetails: [],
    punchInResponse:{},
    punchOutResponse: {}
};

export default function MyAccountReducer(state = initialState, action) {
    let newState = Object.assign({}, state);

    switch (action.type) {
        case Constants.ACTIONS.GET_PUNCH_IN_DETAILS:
            newState.punchInDetails = action.data;
            break;
        case Constants.ACTIONS.GET_PUNCH_IN:
            newState.punchInResponse = action.data;
            break;
        case Constants.ACTIONS.POST_PUNCH_OUT:
            newState.punchOutResponse = action.data;
            break;
        case Constants.ACTIONS.CLEAR_DATA:
            newState = initialState;
            break;
        default:
            break;
    }
    return newState;
}