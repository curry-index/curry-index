// HOW TO USE MAPS API: https://dev.to/jessicabetts/how-to-use-google-maps-api-and-react-js-26c2

// Modules
import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import Geocode from "react-geocode";
import Image from 'react-bootstrap/Image';
import noodleheadRed from './noodlehead-red.jpg';

// CSS
import './Map.css';
import 'bootstrap/dist/css/bootstrap.css';

Geocode.setApiKey('AIzaSyAYZ0l37RYVyu6rfb-K6WEP1tbFrPfJmKM');

const mapStyles = {
    width: '80%',
    height: '330px',
    position: 'relative'
};

function loadCurryList() {
    let unparsedCurryList = localStorage.getItem('curryList')
    //Using && to condition on unparsedCurryList else null
    return (unparsedCurryList && JSON.parse(unparsedCurryList))
}

function loadMarkerInfo() {
    let markersList = [];
    if (!loaded_curryList) {
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
            return <Marker
                    key={rest.name + "_" + index}
                    id={index}
                    position={{
                        lat: rest.latitude,
                        lng: rest.longitude
                    }}
                    icon = {{url: "http://maps.google.com/mapfiles/kml/pal2/icon41.png"}}
                    onClick={() => this.markerClicked(rest, index)} />
        })
    }

    markerClicked(restInfo, index) {
        this.setState({ markerSelected: true });

        // open infowindow.open(map, marker);
        document.getElementById("instrucs").innerHTML = "Selected restaurant: ";

        // Set restaurant name
        for (var i = 0; i < document.getElementsByClassName("rest-name").length; i++) {
            document.getElementsByClassName("rest-name")[i].innerHTML = restInfo.name;
        }

        console.log(this.state.curryList)

        // Set curry type
        document.getElementById("ranking").innerHTML = "#" + (index + 1);

        document.getElementById("curry-type").innerHTML = this.state.curryList[index].curryType;

        document.getElementById("taste-notes").innerHTML = this.state.curryList[index].tastingNotes;

        document.getElementById("rate").innerHTML = this.state.curryList[index].curryRating;


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
                        initialCenter={{ lat: 40.4476, lng: -79.9809 }}
                    >
                        {this.displayMarkers()}
                    </Map>
                </div>

                <div id="notice">Note: if map doesn't update or show markers, and curries in index, refresh page</div>

                { this.state.markerSelected &&
                    <div id="selected-curry" className="mt-2 mt-md-2">
                        <Image alt="curry" src={noodleheadRed} className="selected-curry-image left-fl mr-4" />
                        <div className="left-fl">
                            <span className="left-fl">
                                <span id="ranking">#1</span>
                            </span>

                            <span className="left-fl mt-3">
                                <h2 className="rest-name mb-0">n</h2>
                                <h3 id="curry-type">Type</h3>
                            </span>

                            <div className="clear">
                                Taste notes: <span id="taste-notes"></span>
                                <br />
                                Rating: <span id="rate"></span>/5
                            </div>
                        </div>
                    </div>
                }

            </div>
        )
    }
}

export default GoogleApiWrapper({ apiKey: 'AIzaSyAYZ0l37RYVyu6rfb-K6WEP1tbFrPfJmKM' })(MapContainer);