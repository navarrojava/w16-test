import autoBind from "react-autobind";
import fetch from "isomorphic-fetch";

const BASE_URL = "@@urlEndpointDefault";

class MainClient {

    constructor() {
        autoBind(this);
    }

    _getEntityUrl() {
        return BASE_URL;
    }

    _getHeaders() {
        return {
            "Accept": "application/json",
            "Content-Type": "application/json"
            // "ApiKey": "@@ApiKey"
        };
    }

    /**
     *
     * @returns {Promise}
     */
    getAllPropertiesClient() {
        return new Promise((resolve, reject) => {

            fetch(`${this._getEntityUrl()}/getAllProperties`, {
                method: "GET",
                headers: this._getHeaders()
            }).then((response) => {
                if (response.status !== 200) {
                    reject();
                } else {
                    response.json().then((properties) =>
                        resolve(properties)
                    ).catch((error) => {
                        reject(error.message);
                    });
                }
            })
                .catch((error) => {
                    reject(error.message);
                });
        });
    }
}

export let mainClient = new MainClient();
