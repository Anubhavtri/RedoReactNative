import Api from '../../helpers/api';
import Locations from '../../helpers/locations';
import { resetScreen, Screens } from '../../helpers/Screens';
import SpinnerActions from '../../components/spinner/SpinnerActions';
import Constants from './BookingConstant';

const fetchBooking = ( token, disableSpinner) => {

    return function (dispatch) {

        const successCall = (response) => {
            disableSpinner();
            dispatch({
                type: Constants.ACTIONS.GET_BOOKING,
                data: response.results
            });
        };

        const errorCall = (errorResponse) => {
            disableSpinner();
            // resetScreen(Screens.LOGIN_SCREEN);
            // dispatch({
            //     type: Constants.ACTIONS.CLEAR_DATA,
            // });
        };
       
        Api.doGet(Locations.CUSTOMERBOOKINGDETAILS, {}, successCall, errorCall, token);
    }
}


const downloadReport = ( token, disableSpinner , pk)  => {

    const locations=`${Locations.DOWNLOAD}${pk}/`

    return function (dispatch) {

        const successCall = (response) => {
            disableSpinner();
            dispatch({
                type: Constants.ACTIONS.DOWNLOAD,
                data: response
            });
            console.log(response, " here is base64")
            if(response.message)
            {
                alert(response.message)
            }
            if(response?.allReportDetails?.reportDetails){
                alert("Something went worng")
            }
        };

        const errorCall = (errorResponse) => {
            disableSpinner();
            // resetScreen(Screens.LOGIN_SCREEN);
            // dispatch({
            //     type: Constants.ACTIONS.CLEAR_DATA,
            // });
        };
       
        Api.doGet(locations, {}, successCall, errorCall, token);
    }
}
const setLatiLangPhlebo = (latlng)  => {
    console.log(latlng, "Here it is phlebo")
    return function (dispatch) {
        dispatch({
            type: Constants.ACTIONS.SET_LAT_LAG_PHLEBO,
            data : latlng
        });
       
    }
}
const setLatiLangCustomer = (latlng)  => {
    console.log(latlng, "Here it is customer")
    return function (dispatch) {
        dispatch({
            type: Constants.ACTIONS.SET_LAT_LAG_CUSTOMER,
            data : latlng
        });
       
    }
}


export default {
    fetchBooking,
    downloadReport,
    setLatiLangPhlebo,
    setLatiLangCustomer,
    showPackageModal: showMessage => {
        return { type: Constants.ACTIONS.OPEN_PACKAGE_MODAL, showMessage: showMessage };
    },
    hidePackageModal: () => {
        return { type: Constants.ACTIONS.CLOSE_PACKAGE_MODAL };
    },
}