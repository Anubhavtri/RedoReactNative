import Constants from './ProfileConstants';

let initialState = {
    userProfile: {},
};

export default function MyAccountReducer(state = initialState, action) {
    let newState = Object.assign({}, state);

    switch (action.type) {
        case Constants.ACTIONS.GET_PROFILE_DETAILS:
            newState.userProfile = action.data;
            break;
        case Constants.ACTIONS.GET_RISK_AREA:
            newState.userProfile = action.data;
            break;
       case Constants.ACTIONS.SAVEUSER:
                newState.userId = action.userId;
                break;
        case Constants.ACTIONS.CLEAR_DATA:
            newState = initialState;
            break;
        default:
            break;
    }
    return newState;
}