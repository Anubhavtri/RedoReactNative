import Api from '../../helpers/api';
import Locations from '../../helpers/locations';
import { resetScreen, Screens,navigate } from '../../helpers/Screens';
import SpinnerActions from '../../components/spinner/SpinnerActions';
import Constants from './AppointmentConstants'

const leadGenration = (name,phone_no,city) => {

    const params = {
        name,
        phone_no,
        city,
        source:'Mobile'
    }
    return function (dispatch) {

        dispatch(SpinnerActions.showSpinner());
        const successCall = (response) => {      
            dispatch(SpinnerActions.hideSpinner());
            dispatch({
                type: Constants.ACTIONS.LEAD_GENRATION,
                data: response
                
            });
            if(response){
                alert("Your data has been submitted successfully")
                navigate(Screens.TAB)
            }
            
           
        };
        const errorCall = (errorResponse) => {
            dispatch(SpinnerActions.hideSpinner());

        }

        Api.doPost(Locations.LEADGENRATION, params, successCall, errorCall);
    }
}

export default {
    leadGenration,
   
}