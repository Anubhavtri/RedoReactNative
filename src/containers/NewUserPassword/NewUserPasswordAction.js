import Api from '../../helpers/api';
import Locations from '../../helpers/locations';
import {resetScreen, Screens, navigate} from '../../helpers/Screens';
import SpinnerActions from '../../components/spinner/SpinnerActions';
import Constants from './NewUserPasswordconstant';

const NewUserPassword = (oldpassowrd,  password, confirmpassword , token) => {
  const params = {
    old_password : oldpassowrd,
    new_password :  password,
    confirm_password : confirmpassword,
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
        navigate(Screens.CITY);
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

    Api.doPost(Locations.NEW_USER_PASSWORD, params, successCall, errorCall , token);
  };
};


export default {
  NewUserPassword,
};
