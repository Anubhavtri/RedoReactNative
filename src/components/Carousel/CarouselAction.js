import Api from '../../helpers/api';
import Locations from '../../helpers/locations';
import { resetScreen, Screens } from '../../helpers/Screens';
import SpinnerActions from '../spinner/SpinnerActions';
import Constants from './CarouselConstant';

const getbannerdata = ( token, disableSpinner) => {

    return function (dispatch) {

        const successCall = (response) => {
            disableSpinner();
            dispatch({
                type: Constants.ACTIONS.GET_BANNER,
                data: response.results
            });
        };

        const errorCall = (errorResponse) => {
            disableSpinner();
            if (errorResponse.status === 401 || errorResponse.status === 403) {
                dispatch({
                    type: Constants.ACTIONS.CLEAR_DATA
                });              
                resetScreen(Screens.LOGIN_SCREEN)
            }
        };
       
        Api.doGet(Locations.BANNER, {}, successCall, errorCall, token);
    }
}


export default {
    getbannerdata,
    showPackageModal: showMessage => {
        return { type: Constants.ACTIONS.OPEN_PACKAGE_MODAL, showMessage: showMessage };
    },
    hidePackageModal: () => {
        return { type: Constants.ACTIONS.CLOSE_PACKAGE_MODAL };
    },
}