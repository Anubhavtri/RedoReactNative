import Api from '../../helpers/api';
import Locations from '../../helpers/locations';
import { resetScreen, Screens } from '../../helpers/Screens';
import SpinnerActions from '../../components/spinner/SpinnerActions';
import Constants from '../loginScreen/LoginConstants';
import MyAccountConstants from './MyAccountConstants'

const getUserData = (token) => {


    return function (dispatch) {

        dispatch(SpinnerActions.showSpinner());
        const successCall = (response) => {      
            dispatch(SpinnerActions.hideSpinner());
            dispatch({
                type: Constants.ACTIONS.SAVE_USER_INFO,
                data: response.profile
                
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

        }

        Api.doGet(Locations.USER, {}, successCall, errorCall, token);
    }
}



export default {
    getUserData,
   
}