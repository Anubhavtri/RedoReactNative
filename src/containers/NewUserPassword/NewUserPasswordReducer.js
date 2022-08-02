import Constants from './NewUserPasswordconstant';
import { REHYDRATE } from 'redux-persist';

let initialState = {
    newpasswordresponse: {},
    errorOtp: ''
};

export default function MyNEWPasswordReducer(state = initialState, action) {
    let newState = Object.assign({}, state);
    switch (action.type) {
        // case REHYDRATE:
        //     newState = action.payload?.user ?
        //         action.payload.user : newState;
        //     break;
        case Constants.ACTIONS.SAVE_USER_DETAILS:
            newState.newpasswordresponsel = action.data.user;
            break;
        case Constants.ACTIONS.ERROR_IN_OTP:
            newState.errorOtp = action.payload;
            break;
        case Constants.ACTIONS.CLEAR_DATA:
            newState = initialState;
            break;
        default:
            break;
    }
    return newState;
}