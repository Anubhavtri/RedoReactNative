import Api from "../../helpers/api";
import SpinnerActions from "../../components/spinner/SpinnerActions";
import locations from "../../helpers/locations";
import Constants from "./MainScreenConstant";

const getUserDetails = (token) => {

    return function (dispatch) {
        const successCall = (response) => {

            dispatch({
                type: Constants.ACTIONS.GET_USER_DETAILS,
                data: response
            });
        };

        const errorCall = (errorResponse) => {
            console.log("error all phlebos", errorResponse)
        }

        Api.doGet(locations.USER, successCall, errorCall, token);
    }
}




const submitSample = (body, token) => {

    return function (dispatch) {

        dispatch(SpinnerActions.showSpinner());
        const SuccessCall = (response) => {
            dispatch(SpinnerActions.hideSpinner());

            console.log("sample hand succ", response)
            resetScreen(Screens.TAB)
            alert("Sample Handover Successfully")

        };

        const errorCallback = (errorResponse) => {
            dispatch(SpinnerActions.hideSpinner());

            console.log("sampleerr", errorResponse)
            alert(JSON.stringify(errorResponse.error))
        };
        Api.doPut(locations.EDITSAMPLEHANDOVER, body, SuccessCall, errorCallback, token);
    }

}
export default {
    getUserDetails,
    submitSample,
    
}