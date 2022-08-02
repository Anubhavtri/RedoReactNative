import Constants from './UploadPrescreptionConstant';
import { REHYDRATE } from 'redux-persist';

let initialState = {
    uploadprescreptionresponse: {}
};

export default function UploadPrescreptionReducer(state = initialState, action) {
    let newState = Object.assign({}, state);
    switch (action.type) {
        case REHYDRATE:
            newState = action.payload?.user ?
                action.payload.user : newState;
            break;
        case Constants.ACTIONS.UPLOAD_PRESCREPTION:
            newState.uploadprescreptionresponse = action.data;
            break;
    }
    return newState;
}