import {AppConstants} from "../../../constants/AppConstants";
import  {AppDispatcher}  from "../../../dispatcher/AppDispatcher";
import {mainClient} from "../client/MainClient";

export class MainAction {
    /**
     *
     */
    static getAllProperties() {

        AppDispatcher.dispatch({
            actionType: AppConstants.ACTION.MAIN.GET_ALL_PROPERTIES_REQUEST_PENDING,

        });

        mainClient.getAllPropertiesClient().then((properties) =>
            AppDispatcher.dispatch({
                actionType: AppConstants.ACTION.MAIN.GET_ALL_PROPERTIES_REQUEST_SUCCESS,
                payload: {
                    properties
                }
            })
        ).catch(() => {
            AppDispatcher.dispatch({
                actionType: AppConstants.ACTION.MAIN.GET_ALL_PROPERTIES_REQUEST_ERROR,

            });
        });
    }

    static requestCloseSnackBarAction() {
        AppDispatcher.dispatch({
            actionType: AppConstants.ACTION.MAIN.REQUEST_CLOSE_SNACK_BAR,
        });
    }
}