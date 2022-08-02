import Api from '../../helpers/api';
import Locations from '../../helpers/locations';
import { resetScreen, Screens } from '../../helpers/Screens';
import SpinnerActions from '../../components/spinner/SpinnerActions';
import Constants from './UploadPrescreptionConstant';
import {ToastAndroid} from 'react-native'
import { validatePathConfig } from '@react-navigation/core';

const uploadprescreption = ( body ,token) => {
    return function (dispatch) {
        const successCall = (response) => {
            console.log(response,"Upload Prescreption Response")
            dispatch({
                type: Constants.ACTIONS.UPLOAD_PRESCREPTION,
                data: response
            }); 
        };
        const errorCall = (errorResponse) => {
            console.log(errorResponse)
            alert(JSON.stringify(errorResponse?.error))
        };
        Api.doPost(Locations.UPLOAD_PRESCREPTION, body, successCall, errorCall, token);
    }
}

export default {
    uploadprescreption,
}