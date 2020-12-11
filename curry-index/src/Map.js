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
    position: 'relative'
};

function loadCurryList() {
    let unparsedCurryList = localStorage.getItem('curryList')
    //Using && to condition on unparsedCurryList else null
    return (unparsedCurryList && JSON.parse(unparsedCurryList))
}

function loadMarkerInfo() {
    let markersList = [];
    if(!loaded_curryList){
        loaded_curryList = []
    }
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
            restaurants: loaded_markerInfo || [],
            markerSelected: false
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

    markerClicked(restInfo) {
        console.log("hi")
        this.setState({markerSelected: true});
        document.getElementById("instrucs").innerHTML="Selected restaurant: ";
        
        // Set restaurant name
        for(var i=0; i < document.getElementsByClassName("rest-name").length; i++){
            document.getElementsByClassName("rest-name")[i].innerHTML = restInfo.name;
        }

        // Set curry type
        document.getElementById("curry-type")
    }

    render() {
        return (
            <div id="bootstrap-overrides">
                <div id="selected-restaurant">
                    <span id="instrucs">Select a Pinned Thai Curry Restaurant</span> <span className='rest-name'></span>
                </div>

                <div id="map-box">
                    <Map
                        google={this.props.google}
                        zoom={13}
                        style={mapStyles}
                        initialCenter={{ lat: 40.4406, lng: -79.9959 }}
                    >
                        {this.displayMarkers()}
                    </Map>
                </div>
                <div id="selected-curry" className="mt-2 mt-md-2">
                    <div className="row">
                        <div className="col-3">
                            <span id="ranking">#1</span>
                        </div>
                        <div className="col mt-3">
                            <h2 className="rest-name">Name</h2>
                            <h3 id="curry-type">Type</h3>
                        </div>
                    </div>
                    <br />
                    Taste notes: <span id="taste-notes"></span>
                    <br />
                    Rating: <span id="rate"></span>/5


                </div>

            </div>
        )
    }
}

export default GoogleApiWrapper({ apiKey: 'AIzaSyAYZ0l37RYVyu6rfb-K6WEP1tbFrPfJmKM' })(MapContainer);