import Constants from './CarouselConstant';

let initialState = {
    bannerData : []
};

export default function BestPackageListReducer(state = initialState, action) {
    let newState = Object.assign({}, state);

    switch (action.type) {
        case Constants.ACTIONS.GET_BANNER:
            newState.bannerData = action.data;
            break;
        case Constants.ACTIONS.CLEAR_DATA:
            newState = initialState;
            break;
        default:
            break;
    }
    return newState;
}


