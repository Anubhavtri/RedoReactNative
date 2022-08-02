import Api from '../../../../helpers/api';
import Locations from '../../../../helpers/locations';
import { resetScreen, Screens, navigate } from '../../../../helpers/Screens';
import SpinnerActions from '../../../../components/spinner/SpinnerActions';
import Constants from './RedoMealConstant'

const postmeal = (token) => {

    const params = {
        meal_type: "",
        food_name: "Split Peas (Mature Seeds)",
        food_id: "123454",
        measurement_description: "cup",
        serving_description: "1 cup",
        calories: "150",
        number_of_units: "2",
        total_calories: "300",
        metric_serving_unit: "g",
        meal_date: "2022-04-02"
    }
    return function (dispatch) {

        dispatch(SpinnerActions.showSpinner());
        const successCall = (response) => {
            console.log(response, "meal response come")
            dispatch(SpinnerActions.hideSpinner());
            dispatch({
                type: Constants.ACTIONS.MEAL,
                data: response
            });
        };
        const errorCall = (errorResponse) => {
            dispatch(SpinnerActions.hideSpinner());

        }

        Api.doPost(Locations.POST_MEAL, params, successCall, errorCall, token);
    }
}

export default {
    postmeal,

}