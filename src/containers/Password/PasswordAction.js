import Api from '../../helpers/api';
import Locations from '../../helpers/locations';
import {resetScreen, Screens, navigate} from '../../helpers/Screens';
import SpinnerActions from '../../components/spinner/SpinnerActions';
import Constants from './PasswordConstant';

const NewPassword = (mobile,  password, otp) => {
  const params = {
      mobile,
      password,
      otp,
  };
  return function (dispatch) {
    dispatch(SpinnerActions.showSpinner());
    const successCall = response => {
      console.log(response , "otp verification")
      dispatch(SpinnerActions.hideSpinner());
      dispatch({
        type: Constants.ACTIONS.SAVE_USER_DETAILS,
        data: response,
      });
      if (response) {
        navigate(Screens.NEW_LOGIN);
      }
    };

    const errorCall = errorResponse => {
      dispatch(SpinnerActions.hideSpinner());
      console.log(errorResponse,"ASDE SJKJD")

      dispatch({
        type: Constants.ACTIONS.ERROR_IN_OTP,
        payload: errorResponse.error.error[0],
      });
    };

    Api.doPost(Locations.NEW_PASSWORD, params, successCall, errorCall);
  };
};




export default {
    NewPassword,
};
