import Api from '../../helpers/api';
import Locations from '../../helpers/locations';
import { resetScreen, Screens,navigate } from '../../helpers/Screens';
import SpinnerActions from '../../components/spinner/SpinnerActions';
import Constants from './ImaganingpackageConstant'

const getProfileDetails = () => {

    return function (dispatch) {
        const locations = `${Locations.IMAGANING_PACKAGE}?page=${1}/`
        
        
        dispatch(SpinnerActions.showSpinner());
        const successCall = (response) => {      
            dispatch(SpinnerActions.hideSpinner());
            dispatch({
                type: Constants.ACTIONS.GET_IMAGINE_PACKAGE,
                data: response.profile  
            });
           console.log(response , "imagine response ")
        };
        const errorCall = (errorResponse) => {
            console.log(errorResponse)
            dispatch(SpinnerActions.hideSpinner());

            // if (errorResponse.status === 401 || errorResponse.status === 403) {
            //     dispatch({
            //         type: Constants.ACTIONS.CLEAR_DATA
            //     });
            //     resetScreen(Screens.LOGIN_SCREEN)
            // }
        }
        Api.doGet(locations, {}, successCall, errorCall);
    }
}

export default {
    getProfileDetails,
}