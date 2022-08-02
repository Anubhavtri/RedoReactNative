import Constants from './MainScreenConstant';

let initialState ={
    phleboList:[],
};

export default function sampleHandoverReducer(state = initialState, action) {
    let newState = Object.assign({}, state);
    switch (action.type) {
        case Constants.ACTIONS.SAVE_ALLPHLEBOS_LIST:
            newState.phleboList=action.data;   
        break;  
        case Constants.ACTIONS.CLEAR_DATA:
            newState = initialState;
            break;
        default:
            break;
    }
    return newState;
}        

