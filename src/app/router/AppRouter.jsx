import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import React from "react";
import {Route, Router, Redirect, hashHistory} from "react-router";
import {AppMainView} from "../components/main/AppMainView.jsx";
import {Map} from "../components/Map";

export class AppRouter extends React.Component {

    constructor() {
        super();
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}>

                <Router history={hashHistory}>
                    <Route path="/main" component={AppMainView}/>
                    <Route path="/map" component={Map}/>

                    <Redirect
                        from={"*"}
                        to={"/map"}
                    />
                </Router>
            </MuiThemeProvider>
        );
    }

}