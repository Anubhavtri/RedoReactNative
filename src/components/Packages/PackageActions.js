import Api from '../../helpers/api';
import Locations from '../../helpers/locations';
import { resetScreen, Screens } from '../../helpers/Screens';
import SpinnerActions from '../spinner/SpinnerActions';
import Constants from './PackageConstants';

const fetchPackages = (token, disableSpinner, cityId = "", search = "", best = "") => {

    const queryParam = {
        code: search,
        city_id: cityId,
        best,
        plan: 'true',
        org_type:'homedx'
    }

    return function (dispatch) {

        dispatch(SpinnerActions.showSpinner());
        const successCall = (response) => {
            dispatch(SpinnerActions.hideSpinner());
            dispatch({
                type: Constants.ACTIONS.SAVE_PACKAGE_LIST,
                data: response.results
            });
        };

        const errorCall = (errorResponse) => {
            dispatch(SpinnerActions.hideSpinner());
        };
        Api.doGet(Locations.PACKAGES, queryParam, successCall, errorCall, token);
    }
}

const getCart = (cityId, token) => {
    const queryParam = {
        city_id: cityId,
    }
    return function (dispatch) {

        const successCall = (response) => {
            if (response[0] && response[0].product) {
                dispatch({
                    type: Constants.ACTIONS.GET_MYCART,
                    data: response[0].product
                });
            } else {
                dispatch({
                    type: Constants.ACTIONS.GET_MYCART,
                    data: []
                });
            }
        };

        const errorCall = (errorResponse) => {

            console.log(errorResponse)
        };
        Api.doGet(Locations.CART, queryParam, successCall, errorCall, token);
    }
}



export default {
    fetchPackages,
    getCart,
    showPackageModal: showMessage => {
        return { type: Constants.ACTIONS.OPEN_PACKAGE_MODAL, showMessage: showMessage };
    },
    hidePackageModal: () => {
        return { type: Constants.ACTIONS.CLOSE_PACKAGE_MODAL };
    },
}