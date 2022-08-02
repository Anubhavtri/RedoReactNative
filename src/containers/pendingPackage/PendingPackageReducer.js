import Constants from './PendingPackageConstants';

let initialState = {
    assignedSample:[]
};

export default function MyAccountReducer(state = initialState, action) {
    let newState = Object.assign({}, state);

    switch (action.type) {
        case Constants.ACTIONS.SAVE_ASSIGNED_SAMPLE:
            newState.assignedSample = action.data.results;
            break;
        
        case Constants.ACTIONS.CLEAR_DATA:
            newState = initialState;
            break;
        default:
            break;
    }
    return newState;
}