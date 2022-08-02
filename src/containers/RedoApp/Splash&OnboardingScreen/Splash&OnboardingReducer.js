import Constants from './SplashOnboardingConstants';

let initialState = {
    userDetails:{}
};

export default function onboardingReducer(state = initialState, action) {
    let newState = Object.assign({}, state);

    switch (action.type) {
        case Constants.ACTIONS.USER_DATA:
            newState.userDetails = action.data;
            break;
        case Constants.ACTIONS.UPDATE_DATA:
            newState.updateData = action.data;
            break;
        case Constants.ACTIONS.UPDATE_DATA2:
            newState.userDetails = {changeData : true};
            break;
        case Constants.ACTIONS.CLEAR_DATA:
            newState = initialState;
            break;
        case Constants.ACTIONS.GET_REC_WEIGHT:
            newState.recWeight = action.data;
            break;
        case Constants.ACTIONS.GET_REC_PERCENT:
             newState.recPrecent = action.data;
             break;
        default:
            break;
    }
    return newState;
}


