import Constants from './RedoMealConstant';

let initialState = {
    mealresponse: {},
};

export default function MyAccountReducer(state = initialState, action) {
    let newState = Object.assign({}, state);

    switch (action.type) {
        case Constants.ACTIONS.MEAL:
            newState.mealresponse = action.data;
            break;
        default:
            break;
    }
    return newState;
}