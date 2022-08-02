import Constants from './MyprescreptionConstant';

let initialState = {
    prescreptiondetails: {},
};

export default function MyPrescreptionDetailsReducer(state = initialState, action) {
    let newState = Object.assign({}, state);

    switch (action.type) {
        case Constants.ACTIONS.GET_PRESCREPTION_DETAILS:
            newState.prescreptiondetails = action.data;
            break;
        default:
            break;
    }
    return newState;
}