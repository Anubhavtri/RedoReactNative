import Api from '../../helpers/api';
import Locations from '../../helpers/locations';
import { resetScreen, Screens,navigate } from '../../helpers/Screens';
import SpinnerActions from '../../components/spinner/SpinnerActions';
import Constants from './UpdateAddressconstants'

const putaddressData = (email,password) => {

const params = { user : {
    email,
    password
}}
// console.log(user)
    return function (dispatch) {

        dispatch(SpinnerActions.showSpinner());
        const successCall = (response) => {      
            dispatch(SpinnerActions.hideSpinner());
            dispatch({
                type: Constants.ACTIONS.SAVE_ADDRESS_DETAILS,
                data: response
                
            });
        };

        const errorCall = (errorResponse) => {
            dispatch(SpinnerActions.hideSpinner());
            // console.log(errorResponse.error.error[0],"ASDE SJKJD")

                dispatch({
                    type: Constants.ACTIONS.ERROR_IN_OTP,
                    payload: errorResponse.error.error[0]
                });

        }

        Api.doPut(Locations.VERIFYOTP, params, successCall, errorCall);
    }
}

export default {
    putaddressData, 
}