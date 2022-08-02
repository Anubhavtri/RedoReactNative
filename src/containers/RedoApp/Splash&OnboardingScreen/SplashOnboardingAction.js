import SpinnerActions from "../../../components/spinner/SpinnerActions";
import Api from "../../../helpers/api";
import locations from "../../../helpers/locations";
import { resetScreen, Screens } from "../../../helpers/Screens";
import constants from "./SplashOnboardingConstants";


const getIsUser = (token) => {
    console.log("GEt user details token", token)
    console.log("GEt user details url", locations.GETUSER_DETAILS)
    return function (dispatch) {
        const successCall = (response) => {
            console.log("GEt user details success", errorResponse)
            dispatch({
                type: constants.ACTIONS.USER_DATA,
                data: response
            });
        };

        const errorCall = (errorResponse) => {
            console.log("GEt user details error response", errorResponse)
        }

        Api.doGetIt(locations.GETUSER_DETAILS, successCall, errorCall, token);
    }
}

export default {
    getIsUser
}