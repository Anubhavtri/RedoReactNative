import Api from '../../helpers/api';
import Locations from '../../helpers/locations';
import { resetScreen, Screens, navigate } from '../../helpers/Screens';
import SpinnerActions from '../../components/spinner/SpinnerActions';
import Constants from './Otpconstants';

const getUserData = (email, password) => {
  const params = {
    user: {
      email,
      password,
    },
  };
  return function (dispatch) {
    dispatch(SpinnerActions.showSpinner());
    const successCall = response => {
      console.log(response, "otp verification")
      dispatch(SpinnerActions.hideSpinner());
      dispatch({
        type: Constants.ACTIONS.SAVE_USER_DETAILS,
        data: response,
      });
      
      console.log('USER_DATA+' + JSON.stringify(response));

      if (!response.user.password_change) {
        navigate(Screens.CITY);
      }else{
        navigate(Screens.NEW_PASSWORD);
      }
    };

    const errorCall = errorResponse => {
      dispatch(SpinnerActions.hideSpinner());
      console.log(errorResponse)
      // alert(`${errorResponse}`)
      alert(JSON.stringify(errorResponse?.error?.error));
      // console.log(errorResponse.error.error[0],"ASDE SJKJD")

      dispatch({
        type: Constants.ACTIONS.ERROR_IN_OTP,
        payload: errorResponse.error.error[0],
      });
    };

    Api.doPost(Locations.VERIFYOTP, params, successCall, errorCall);
  };
};


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
      if(!response?.already_exists){
        navigate(Screens.OTP_VERIFICATION)
      }else{
        alert("you are a existing customer")
      }
    };
    let errorCallback = errorResponse => {
      console.log(errorResponse, 'Verify user');
    };
    Api.doGet(location, {}, loginSuccess, errorCallback);
  };
};

const getUserDataByPassword = (email, password) => {
  const params = {
    user: {
      email,
      password,
    },
  };
  return function (dispatch) {
    dispatch(SpinnerActions.showSpinner());
    const successCall = response => {
      console.log(response, "otp verification")
      dispatch(SpinnerActions.hideSpinner());
      dispatch({
        type: Constants.ACTIONS.SAVE_LOGIN,
        data: response,
      });
      // console.log('response aa gya ', response);
      // if (response.user.token) {
      //   navigate(Screens.CITY);
      // }
    };

    const errorCall = errorResponse => {
      dispatch(SpinnerActions.hideSpinner());
      console.log(errorResponse, "fkfkfkfkfkfkfkfkfkf")
      alert(errorResponse.error.error[0])
      dispatch({
        type: Constants.ACTIONS.ERROR_IN_OTP,
        payload: errorResponse.error.error[0],
      });
    };
    Api.doPost(Locations.NEWLOGIN, params, successCall, errorCall);
  };
};


const ResetPassword = (phone_number, otp_type) => {
  console.log(phone_number, otp_type, ">>>>>?????????>>>>>>>????");
  const params = {
    phone_number,
    otp_type,
  };
  return function (dispatch) {
    // dispatch(SpinnerActions.showSpinner());
    const successCall = response => {
      console.log(response, "otp verification")
      dispatch(SpinnerActions.hideSpinner());
      dispatch({
        type: Constants.ACTIONS.RESET_PASSWORD,
        data: response,
      });
      console.log('USER_DATA+', response);

      if (response) {
        navigate(Screens.PASSWORD);
      }
    };

    const errorCall = errorResponse => {
      dispatch(SpinnerActions.hideSpinner());
      console.log(errorResponse, "asdfghjkoiuytrew")
    };

    Api.doPost(Locations.RESETPASSWORD, params, successCall, errorCall);
  };
};


const reSendOtp = mobileNumber => {
  const userCredentials = {
    phone_number: mobileNumber,
  };

  return function (dispatch) {
    console.log(mobileNumber);
    let loginSuccess = response => {
      dispatch({
        type: Constants.ACTIONS.RESEND_OTP_RESPONSE,
        payload: response,
      });
    };

    let errorCallback = errorResponse => {
      console.log(errorResponse, 'From Resend Otp');
    };
    Api.doPost(Locations.LOGIN, userCredentials, loginSuccess, errorCallback);
  };
};

const clearUser = () => {
  return function (dispatch) {
      dispatch({
          type: Constants.ACTIONS.CLEAR_USER_RESPONSE
      });
  }
}

export default {
  getUserData,
  reSendOtp,
  getUserDataByPassword,
  ResetPassword,
  VerifyUser,
  clearUser
};
