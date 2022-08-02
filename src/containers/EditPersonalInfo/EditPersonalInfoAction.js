import Api from '../../helpers/api';
import Locations from '../../helpers/locations';
import { resetScreen, Screens,navigate } from '../../helpers/Screens';
import SpinnerActions from '../../components/spinner/SpinnerActions';
import Constants from './EditPersonalInfoConstants'

const getUserData = (email,password) => {

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
                type: Constants.ACTIONS.SAVE_USER_DETAILS,
                data: response
                
            });
            if(response.user.token){
                navigate(Screens.CITY)
            }
        };

        const errorCall = (errorResponse) => {
            dispatch(SpinnerActions.hideSpinner());
            // console.log(errorResponse.error.error[0],"ASDE SJKJD")

                dispatch({
                    type: Constants.ACTIONS.ERROR_IN_OTP,
                    payload: errorResponse.error.error[0]
                });

        }

        Api.doPost(Locations.VERIFYOTP, params, successCall, errorCall);
    }
}

const reSendOtp = (mobileNumber) => {
    const userCredentials = {
        phone_number: mobileNumber,
    }

    return function (dispatch) {
        console.log(mobileNumber)
        let loginSuccess = (response) => {
                dispatch({
                    type: Constants.ACTIONS.RESEND_OTP_RESPONSE,
                    payload: response
                });  
        };

        let errorCallback = (errorResponse) => {
            console.log(errorResponse, "From Resend Otp")
        };
        Api.doPost(Locations.LOGIN, userCredentials, loginSuccess, errorCallback);
    }

}



export default {
    getUserData, 
    reSendOtp 
}