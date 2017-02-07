import {AppBar} from "../common/AppBar";
import {AppConstants} from "../../constants/AppConstants";
import autoBind from "react-autobind";
import React from "react";
import Snackbar from "material-ui/Snackbar";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import {MainAction} from "../../core/main/action/MainAction";
import {mainStore} from "../../core/main/store/MainStore";

const google = window.google;


/*global console, window */
export class AppMainView extends React.Component {

    constructor(props) {
        super(props);
        autoBind(this);

        this.state = {
            snackBar: {
                open: false,
                message: "",
                autoHideDuration: 4000
            }
        };
    }

    componentDidMount() {
        mainStore.addChangeListener(this._onChangePalindromeStore);
    }

    componentWillUnmount() {
        mainStore.removeChangeListener(this._onChangePalindromeStore);
    }

    componentWillMount() {
    }

    _onChangePalindromeStore() {
        this.setState({
            snackBar: mainStore.getState().snackBar

        });
    }

    onTouchTapVerifyTextButton() {
        MainAction.getAllProperties(this.state.file);
    }


    handleRequestClose() {
        MainAction.requestCloseSnackBarAction();
    }

    handleFileField(evt){
     this.setState({file: evt.target.files[0]});
    }

    render() {
        const appContentStyle = {
            margin: 0,
            paddingTop: "64px"
        };

        const styles = {
            root: {
                width: "100%",
                display: "flex",
                flexWrap: "wrap",
            },
        };

        const fixedStyle = {
            position: "fixed",
            top: 0,
            float: "left",
            width: "100%",
            zIndex: 2
        };

        const style = {
            margin: 12,
        };

        return (
            <div>
                <AppBar
                    title={"Palindrome Test"}
                    style={fixedStyle}
                    children={<div style={appContentStyle}>
                        <div style={styles.root}>

                            <TextField
                                hintText="Full width"
                                type={"file"}
                                fullWidth={true}
                                onChange={this.handleFileField}
                            />
                            <RaisedButton
                                label="Verify if is a palindrome"
                                primary={true}
                                onTouchTap={this.onTouchTapVerifyTextButton}
                                style={style}
                            />

                        </div>

                    </div>}
                />
                <Snackbar
                    open={this.state.snackBar.open}
                    message={this.state.snackBar.message}
                    autoHideDuration={this.state.snackBar.autoHideDuration}
                    onRequestClose={this.handleRequestClose}
                />

            </div>
        );
    }
}

AppMainView.contextTypes = {
    router: React.PropTypes.object.isRequired
};
