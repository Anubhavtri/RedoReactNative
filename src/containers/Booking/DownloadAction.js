import Api from '../../helpers/api';
import Locations from '../../helpers/locations';
import { resetScreen, Screens } from '../../helpers/Screens';
import SpinnerActions from '../../components/spinner/SpinnerActions';
import Constants from './BookingConstant';


const downloadReport = ( token, disableSpinner , pk)  => {

    return function (dispatch) {

        const successCall = (response) => {
            disableSpinner();
            dispatch({
                type: Constants.ACTIONS.DOWNLOAD,
                data: response.results
            });
        };

        const errorCall = (errorResponse) => {
            disableSpinner();
            
        };
       
        Api.doGet(Locations.CUSTOMERBOOKINGDETAILS, {}, successCall, errorCall, token);
    }
}


export default {
    fetchBooking,
    downloadReport,
    showPackageModal: showMessage => {
        return { type: Constants.ACTIONS.OPEN_PACKAGE_MODAL, showMessage: showMessage };
    },
    hidePackageModal: () => {
        return { type: Constants.ACTIONS.CLOSE_PACKAGE_MODAL };
    },
}