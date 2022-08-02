import Api from "../../helpers/api";
import SpinnerActions from "../../components/spinner/SpinnerActions";
import locations from "../../helpers/locations";
import Constants from "./PendingPackageConstants"

const getSampleHandoverData = (token) => {

    const location = locations.SAMPLEHANDOVER;

    return function (dispatch) {

        dispatch(SpinnerActions.showSpinner());
        const successCall = (response) => {  

            dispatch(SpinnerActions.hideSpinner());
            dispatch({
                type: Constants.ACTIONS.SAVE_ASSIGNED_SAMPLE,
                data: {...response}
            });

        };
        const errorCall = (errorResponse) => {
            dispatch(SpinnerActions.hideSpinner());
            if (errorResponse.status === 401 || errorResponse.status === 403) {
                dispatch({
                    type: Constants.ACTIONS.CLEAR_DATA
                });
                resetScreen(Screens.LOGIN_SCREEN)
            }
            else {
               
                console.log("error",errorResponse)
            }

        }
        Api.doGet(location, {}, successCall, errorCall, token);
    }
}

export default {
    getSampleHandoverData
}
