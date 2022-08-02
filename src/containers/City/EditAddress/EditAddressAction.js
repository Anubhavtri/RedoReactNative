import Api from '../../helpers/api';
import Locations from '../../helpers/locations';
import { resetScreen, Screens,navigate } from '../../helpers/Screens';
import SpinnerActions from '../../components/spinner/SpinnerActions';
import Constants from './EditAddressConstants'


const editAddress = (body,token,id) => {
    const location = `${Locations.EDITADDRESS}${id}/`
    return function (dispatch) {

        const successCall = (response) => {      
        
        };

        const errorCall = (errorResponse) => {
            console.log(errorResponse)
                
        }
        Api.doPut(location, body, successCall, errorCall,token);
    }
}

const deleteAddress = (body, token,id) => {
    const location = `${Locations.EDITADDRESS}${id}/`
    console.log(token,id, "delete adree api")
    return function (dispatch) {

        const successCall = (response) => {      
           console.log(response)
            
        };

        const errorCall = (errorResponse) => {
            console.log(errorResponse)
                
        }
        Api.doPut(location, body, successCall, errorCall,token);
    }
}


export default {
    editAddress,
    deleteAddress 
}
