import Constants from './PersonalInfoConstant';
import { REHYDRATE } from 'redux-persist';

let initialState = {
    phoneNumber: '',
 
};

export default function EditReducer(state = initialState, action) {
    let newState = Object.assign({}, state);
    switch (action.type) {
        case REHYDRATE:
            newState = action.payload && action.payload.user ?
                action.payload.user : newState;
            break;
        case Constants.ACTIONS.SAVE_PHONE_NUMBER:
            newState.phoneNumber = action.payload
            break;
        default:
            break;
    }
    return newState;
}
