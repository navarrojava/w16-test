import React from "react";
import ReactDOM from "react-dom";
import {mainStore} from "../core/main/store/MainStore";
import {MainAction} from "../core/main/action/MainAction";
import autoBind from "react-autobind";


/*global console, window */
const google = window.google;
const myCenter = new google.maps.LatLng(-27.608384, -48.62649);

let styleArray = [
    {
        featureType: "all",
        stylers: [
            {saturation: 0}
        ]
    },
    {
        featureType: "poi",
        elementType: "labels",
        stylers: [
            {visibility: "off"}
        ]
    }, {
        featureType: "transit",
        elementType: "labels",
        stylers: [
            {visibility: "off"}
        ]
    }
];

let mapProp = {
    center: myCenter,
    disableDefaultUI: false,
    zoom: 18,
    mapTypeId: google.maps.MapTypeId.HYBRID,
    styles: styleArray
    //ROADMAP, SATELLITE, HYBRID e TERRAIN
};

/*global google, document , window, setTimeout */
export class Map extends React.Component {

    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            properties: [],
            mapProp: {
                center: myCenter,
                disableDefaultUI: true,
                zoom: 5,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                styles: styleArray
                //ROADMAP, SATELLITE, HYBRID e TERRAIN
            },
            flightPlanCoordinates: []
        };
    }

    componentDidMount() {
        mainStore.addChangeListener(this._onChangeMainStore);
        let node = ReactDOM.findDOMNode(this);
        let map = new google.maps.Map(node, this.state.mapProp);
        this.setState({map});
        // this.mountPath(map);
    }

    componentWillMount() {
        MainAction.getAllProperties();
    }

    comnentWillUnmount() {
        mainStore.removeChangeListener(this._onChangeMainStore);
    }

    _onChangeMainStore() {
        console.info("_onChangeMainStore");
        this.setState(mainStore.getState());
        this.mountPath(this.state.map);
        console.log(this.state.properties);
    }


    initialize(map) {

        console.debug("initialize()");

        let flightPath = new google.maps.Polyline({
            path: this.state.flightPlanCoordinates,
            geodesic: true,
            strokeColor: "#FF3300",
            strokeOpacity: 1.0,
            strokeWeight: 4
        });

        flightPath.setMap(map);
    }


    mountPath(map) {


        let array = this.state.properties;
        let markers = [];


        array.map((singleLocation) => {
            let infoWindow = new google.maps.InfoWindow({
                content: `<div> 
                                 <img src=${singleLocation.photo} style="height:90px;width: 150px"> 
                                 ${singleLocation.name}<br/>
                                 ${singleLocation.description}<br/>
                                  
                        </div>`
            });

            let marker = new google.maps.Marker({
                position: new google.maps.LatLng(singleLocation.lat, singleLocation.lon),
                map: this.state.map,
                title: singleLocation.name
            });

            marker.addListener("click", () => {
                infoWindow.open(map, marker);
            });

            markers.push(marker);
        });
    }


    render() {
        return (
            <div id="map" style={{position: "absolute", top: 0, right: 0, bottom: 0, left: 0, width:"50%"}}/>

        );
    }
}