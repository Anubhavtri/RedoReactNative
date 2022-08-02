import Constants from './AddAddressConstants';

let initialState = {
    Address: [],
    SelAddress: {}

};

export default function Addresslistreducer(state = initialState, action) {
    let newState = Object.assign({}, state);

    switch (action.type) {
        case Constants.ACTIONS.SAVE_ADDRESS:
            newState.Address = action.data;
            break;
        case Constants.ACTIONS.SAVE_SEL_ADDRESS:
            newState.SelAddress = action.data;
            break;
        case Constants.ACTIONS.CLEAR_DATA:
            newState = initialState;
            break;
        default:
            break;
    }
    return newState;
}


