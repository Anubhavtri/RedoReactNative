import Api from '../../helpers/api';
import Locations from '../../helpers/locations';
import { resetScreen, Screens } from '../../helpers/Screens';
import SpinnerActions from '../../components/spinner/SpinnerActions';
import Constants from './AddAddressConstants';

const fetchAddress = ( token ) => {

    return function (dispatch) {
        const params = { 

        }
        const successCall = (response) => {
            dispatch({
                type: Constants.ACTIONS.SAVE_ADDRESS,
                data: response.results
            });
        };
        const errorCall = (errorResponse) => {
            console.log(errorResponse)
        };
        Api.doGet(Locations.ADDRESS, params, successCall, errorCall, token);
    }
}

const SelectedAddress = (address) => {
        console.log(address)
    return function (dispatch) {
        console.log(address)
        dispatch({
            type: Constants.ACTIONS.SAVE_SEL_ADDRESS,
            data: address
        });
    }
    
}


export default {
    fetchAddress,
    SelectedAddress
}