import Constants from './PlanDetailConstant';
// import { REHYDRATE } from 'redux-persist';

let initialState = {
    detailpackage: [],
    param:[],
};

export default function PlanDetailReducer(state = initialState, action) {
    let newState = Object.assign({}, state);

    switch (action.type) {
        case Constants.ACTIONS.PLAN_DETAIL:
            newState.detailpackage = action.data;
            break;
        case Constants.ACTIONS.PARAMETER:
            newState.param = action.data;
            break;
        // case Constants.ACTIONS.SAVE_SEL_PINCODE:
        //     console.log(action.data,"Here city Obj")
        //     newState.cityObj = action.data;
        //     break;
        default:
            break;
    }
    return newState;
}