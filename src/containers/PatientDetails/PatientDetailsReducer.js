import Constants from './PatientDetailsconstants';
import { REHYDRATE } from 'redux-persist';

let initialState = {
    userData: {},
};

export default function MyAccountReducer(state = initialState, action) {
    let newState = Object.assign({}, state);
    switch (action.type) {
        case REHYDRATE:
            newState = action.payload?.user ?
                action.payload.user : newState;
            break;
        case Constants.ACTIONS.SAVE_PATIENT_DETAILS:
            newState.userData = action.data;
            break;
        case Constants.ACTIONS.CLEAR_DATA:
            newState = initialState;
            break;
        default:
            break;
    }
    return newState;
}