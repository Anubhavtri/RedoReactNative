import Api from '../../../helpers/api';
import Locations from '../../../helpers/locations';
import { resetScreen, Screens } from '../../../helpers/Screens';
import SpinnerActions from '../../../components/spinner/SpinnerActions';

const createbloodglucoseLead = (body, token) => {
    return function (dispatch) {
        dispatch(SpinnerActions.showSpinner());
        const successCall = (response) => {
            dispatch(SpinnerActions.hideSpinner());
            console.log("createbloodglucoseLeadRESPONSE", response)
            alert('Thanks, our health coach will connect you shortly')
        };

        const errorCall = (errorResponse) => {
            dispatch(SpinnerActions.hideSpinner());
            console.log(errorResponse, "ERRR) Manual booking")
            alert(JSON.stringify(errorResponse?.error))
        }
        Api.doPost(Locations.BLOODGLU_GENLEAD, body, successCall, errorCall, token);
    }
}
const FeedbackofUserInBloodsugar = (body, token) => {
    return function (dispatch) {
        dispatch(SpinnerActions.showSpinner());
        const successCall = (response) => {
            dispatch(SpinnerActions.hideSpinner());
            console.log("FeedbackofUserInBloodsugarRESPONSE", response)

        };

        const errorCall = (errorResponse) => {
            dispatch(SpinnerActions.hideSpinner());
            console.log(errorResponse, "ERRR) Manual booking")
            alert(JSON.stringify(errorResponse?.error))
        }
        Api.doPost(Locations.MONITOR_FEED, body, successCall, errorCall, token);
    }
}

export default {
    createbloodglucoseLead,
    FeedbackofUserInBloodsugar
}