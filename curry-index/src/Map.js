// HOW TO USE MAPS API: https://dev.to/jessicabetts/how-to-use-google-maps-api-and-react-js-26c2

// Modules
import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import Geocode from "react-geocode";

// CSS
import './Map.css';
import 'bootstrap/dist/css/bootstrap.css';

Geocode.setApiKey('AIzaSyAYZ0l37RYVyu6rfb-K6WEP1tbFrPfJmKM');

const mapStyles = {
    width: '80%',
    height: '60%',
};

function loadCurryList() {
    let unparsedCurryList = localStorage.getItem('curryList')
    //Using && to condition on unparsedCurryList else null
    return (unparsedCurryList && JSON.parse(unparsedCurryList))
}

function loadMarkerInfo(){
    let markersList = [];
        for (let i = 0; i < loaded_curryList.length; i++) {
            let curry = loaded_curryList[i];

            Geocode.fromAddress(curry.restaurantAddress).then(
                response => {
                    const { lat, lng } = response.results[0].geometry.location;
                    //   console.log("address: ", curry.restaurantAddress, " ", lat, lng);
                    markersList.push(
                        { latitude: lat, longitude: lng, name: curry.restaurantName }
                    );
                },
                error => {
                    console.error(error);
                }
            );
        }
        return markersList;
}

// Globals
let loaded_curryList = loadCurryList();
let loaded_markerInfo = loadMarkerInfo();

class MapContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            curryList: loaded_curryList || [],
            restaurants: loaded_markerInfo || []
        }
    }

    displayMarkers = () => {
        return this.state.restaurants.map((rest, index) => {
            return <Marker key={rest.name + "_" + index} id={index} position={{
                lat: rest.latitude,
                lng: rest.longitude
            }}
                onClick={() => this.markerClicked(rest)} />
        })
    }

    markerClicked(restInfo){
        document.getElementById("rest-name").innerHTML=restInfo.name;
    }
    
    render() {
        return (
            <div id="bootstrap-overrides">
                <div id="selected-restaurant">Selected restaurant: <span id="rest-name"><i>None selected</i></span></div>
                <Map
                    google={this.props.google}
                    zoom={13}
                    style={mapStyles}
                    initialCenter={{ lat: 40.4406, lng: -79.9959 }}
                >
                    {this.displayMarkers()}
                </Map>

            </div>
        )
    }
}

export default GoogleApiWrapper({ apiKey: 'AIzaSyAYZ0l37RYVyu6rfb-K6WEP1tbFrPfJmKM' })(MapContainer);