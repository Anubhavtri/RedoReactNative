import Constants from './PackageConstants';

let initialState = {
    allPackages: [],
    cartpackages:[],
};

export default function PackageListReducer(state = initialState, action) {
    let newState = Object.assign({}, state);

    switch (action.type) {
        case Constants.ACTIONS.SAVE_PACKAGE_LIST:
            newState.allPackages = action.data;
            break;
        case Constants.ACTIONS.GET_MYCART:
            newState.cartpackages = action.data;
            break;
        case Constants.ACTIONS.CLEAR_DATA:
            newState = initialState;
            break;

        default:
            break;
    }
    return newState;
}


