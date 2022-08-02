import Constants from './LoginConstants';
import { REHYDRATE } from 'redux-persist';

let initialState = {
    phoneNumber: '',

};

export default function LoginReducer(state = initialState, action) {
    let newState = Object.assign({}, state);
    switch (action.type) {
        case REHYDRATE:
            newState = action.payload?.userLogin ?
            action.payload.userLogin : newState;
            break;
        case Constants.ACTIONS.SAVE_PHONE_NUMBER:
            newState.phoneNumber = action.payload
            break;
        case Constants.ACTIONS.CLEAR_DATA:
            newState = initialState;
            break;
        default:
            break;
    }
    return newState;
}
