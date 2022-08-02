import Constants from './BestPackageConstants';

let initialState = {
    bestPackages: [],
    allPackageMain: [],
    selectedPackageList: [],
};

export default function BestPackageListReducer(state = initialState, action) {
    let newState = Object.assign({}, state);

    switch (action.type) {
        case Constants.ACTIONS.SAVE_BEST_PACKAGE_LIST:
            newState.bestPackages = action.data;
            break;
        case Constants.ACTIONS.SAVE_MAIN_PACKAGE_LIST:
            newState.allPackageMain = action.data;
            break;
        case Constants.ACTIONS.SAVE_SELECTED_PACKAGE_LIST:
            newState.selectedPackageList = action.data;
            break;
        case Constants.ACTIONS.CLEAR_PACKAGES:
        case Constants.ACTIONS.CLEAR_DATA:
            newState = initialState;
            break;
        default:
            break;
    }
    return newState;
}


