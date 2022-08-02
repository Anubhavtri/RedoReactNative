import SpinnerAction from '../../components/spinner/SpinnerActions';
import Api from '../../helpers/api';
import Locations from '../../helpers/locations';
import Constants from './LoginConstants';
import { Screens, resetScreen,navigate } from '../../helpers/Screens';
import { useNavigation } from '@react-navigation/native';
import jwt_decode from "jwt-decode";

const doLogin = (mobileNumber) => {
    const userCredentials = {
        phone_number: mobileNumber,
        from : 'app'
    }
    return function (dispatch) {
        dispatch(SpinnerAction.showSpinner());
        let loginSuccess = (response) => {
            dispatch(SpinnerAction.hideSpinner());
                dispatch({
                    type: Constants.ACTIONS.SAVE_PHONE_NUMBER,
                    payload: response
                });
                console.log(response, "navigate now")
                if(response?.phone_number){
                navigate(Screens.OTP_VERIFICATION)
                }
        };

        let errorCallback = (errorResponse) => {
            dispatch(SpinnerAction.hideSpinner());
            console.log(errorResponse , ">>>>>><<<<<<<>>>>>>>>")
            if( errorResponse?.status == 500 ){
              alert('Mobile number incorrect')
            }
        };
        Api.doPost(Locations.LOGIN, userCredentials, loginSuccess, errorCallback);
    }
}

const VerifyUser = phonenumber => {
    console.log(phonenumber, "VVVVVVVVVVVVVVVVVVVV")
    const location = `${Locations.ALREADY_LOGIN}${phonenumber}/`
    return function (dispatch) {
      console.log("does it work")
      let loginSuccess = response => {
        dispatch({
          type: Constants.ACTIONS.ALREADY_USER,
          data: response,
        });
        console.log(response, "Verify user response")
        if(response?.already_exists){
          doLogin(phonenumber)
        }else{
          alert("you are not a existing customer")
        }
      };
      let errorCallback = errorResponse => {
        console.log(errorResponse, 'Verify user');
      };
      Api.doGet(location, {}, loginSuccess, errorCallback);
    };
  };
   
export default {
    doLogin,
    VerifyUser
}