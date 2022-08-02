import SpinnerAction from '../../components/spinner/SpinnerActions';
import Api from '../../helpers/api';
import Locations from '../../helpers/locations';
import Constants from './PersonalInfoConstant';
import ProfileActions from '../ProfileScreen/ProfileAction';

const doEdit = (name,age,email,userName,image,gender,token) => {

    let location = `${Locations.EDITPROFILE}${userName}/`
    const userCredentials = {
        fullname: name,
        age,
        email,
        image,
        gender
    }
    console.log("edit body",userCredentials)

    return function (dispatch) {
        let loginSuccess = (response) => {
            console.log(response , "edit profiel action")
                dispatch({
                    type: Constants.ACTIONS.SAVE_PHONE_NUMBER,
                    payload: response
                }); 
                dispatch(ProfileActions.getProfileDetails(token))
        };
        let errorCallback = (errorResponse) => {
            console.log(errorResponse)
        };
        Api.doPut(location, userCredentials, loginSuccess, errorCallback,token);
    }

}
 
export default {
    doEdit,
}