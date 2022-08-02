import Api from '../../helpers/api';
import Locations from '../../helpers/locations';
import { resetScreen, Screens,navigate } from '../../helpers/Screens';
import SpinnerActions from '../../components/spinner/SpinnerActions';
import Constants from './PatientDetailsconstants'

const Patientdata = (CustomerDetails) => {
    console.log(CustomerDetails,'here')
    return function (dispatch) {
            dispatch({
                type: Constants.ACTIONS.SAVE_PATIENT_DETAILS,
                data: CustomerDetails 
            });
        };
    }

export default {
    Patientdata, 
}