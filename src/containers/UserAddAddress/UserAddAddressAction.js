import Api from '../../helpers/api';
import Locations from '../../helpers/locations';
import { resetScreen, Screens,navigate } from '../../helpers/Screens';
import SpinnerActions from '../../components/spinner/SpinnerActions';
import Constants from './UserAddAddressConstants'

const postAddress = (body,token) => {

    return function (dispatch) {

        const successCall = (response) => {      
           console.log(response)
            // dispatch({
            //     type: Constants.ACTIONS.SAVE_USER_DETAILS,
            //     data: response
                
            // });
        };

        const errorCall = (errorResponse) => {
            console.log(errorResponse)
                // dispatch({
                //     type: Constants.ACTIONS.ERROR_IN_OTP,
                //     payload: errorResponse.error.error[0]
                // });

        }

        Api.doPost(Locations.ADDRESS, body, successCall, errorCall,token);
    }
}


export default {
    postAddress, 
}