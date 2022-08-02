import Api from "../../helpers/api";
import SpinnerActions from "../../components/spinner/SpinnerActions";
import locations from "../../helpers/locations";
import Constants from "./sampleHandoverConstants";

const getallPhleboDetails = ( token) => {

    const queryParam = {
        usergroup: 'Rider'
    }

    return function (dispatch) {
        const successCall = (response) => {
            
            dispatch({
                type: Constants.ACTIONS.SAVE_ALLPHLEBOS_LIST,
                data: response.results
            });
        };

        const errorCall = (errorResponse) => {
            // dispatch({
            //     type: Constants.ACTIONS.CLEAR_DATA,
            // });
           console.log("error all phlebos",errorResponse)
        }

        Api.doGet(locations.ALLPHLEBOLIST, queryParam, successCall, errorCall, token);
    }
}
const submitSample = (body,token) =>{

    return function(dispatch) {
        
        dispatch(SpinnerActions.showSpinner());
        const SuccessCall = (response) => {
            dispatch(SpinnerActions.hideSpinner());
           
            console.log("sample hand succ",response)
            resetScreen(Screens.TAB)
            alert("Sample Handover Successfully")
            
        };

        const errorCallback = (errorResponse) => {
            dispatch(SpinnerActions.hideSpinner());
           
            console.log("sampleerr",errorResponse)
            alert(JSON.stringify(errorResponse.error))
        };
        Api.doPut(locations.EDITSAMPLEHANDOVER,body, SuccessCall, errorCallback,token);
    }

}
export default {
    getallPhleboDetails,
    submitSample
}