import autoBind from "react-autobind";
import {AppConstants} from "../../../constants/AppConstants";
import {AppDispatcher} from "../../../dispatcher/AppDispatcher";
import {EventEmitter} from "events";
import Immutable from "immutable";

/* eslint-env browser */

const CHANGE_EVENT = "change";

let appState = {
    properties:[],
    snackBar: {
        open: false,
        message: "",
        autoHideDuration: 4000
    }
};

class MainStore extends EventEmitter {

    constructor() {
        super();
        autoBind(this);
    }

    _emitChange() {
        this.emit(CHANGE_EVENT);
    }

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }

    getState() {
        return Immutable.Map(appState).toObject();
    }

}


AppDispatcher.register((action) => {

    switch (action.actionType) {


        case AppConstants.ACTION.MAIN.GET_ALL_PROPERTIES_REQUEST_SUCCESS:

            appState.properties = action.payload.properties;
            console.info(action.payload.properties);
            mainStore._emitChange();
            break;


        case AppConstants.ACTION.MAIN.REQUEST_CLOSE_SNACK_BAR:
            appState.snackBar = {
                open: false,
                message: "",
                autoHideDuration: 4000
            };
            mainStore._emitChange();
            break;
    }
    return true;
});


export let mainStore = new MainStore();
