// HOW TO USE MAPS API: https://dev.to/jessicabetts/how-to-use-google-maps-api-and-react-js-26c2

// Modules
import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import Geocode from "react-geocode";
import Image from 'react-bootstrap/Image';
import curryBowl from './currybowllg.svg';
import AddCurryModal from './AddCurryModal';

// CSS
import './Map.css';
import 'bootstrap/dist/css/bootstrap.css';

Geocode.setApiKey('AIzaSyAYZ0l37RYVyu6rfb-K6WEP1tbFrPfJmKM');

const mapStyles = {
    width: '80%',
    height: '330px',
    position: 'relative'
};

function throwError(inputName) {
    document.getElementById(inputName + "-label").style = "color: #dc3545; font-weight: 600";
}

// Store curry list in local storage
function store(lizt) {
    localStorage.setItem('curryList', JSON.stringify(lizt))
}

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
                
                console.error("No location found for restaurant ", loaded_curryList[i].restaurantName, " at ", loaded_curryList[i].restaurantAddress, "\nTechnical error for this to follow (just ignore):\n", error);
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
            markerSelected: false,
            modalShow: false,
            curryFalling: false,
            pictures: []
        }
        this.onDrop = this.onDrop.bind(this);
    }

    onDrop(pictureFiles, pictureDataURLs) {
        this.setState({
            pictures: pictureDataURLs
        });
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

        // Set curry type
        document.getElementById("curry-img").src = this.state.curryList[index].pic;

        document.getElementById("ranking").innerHTML = "#" + (index + 1);

        document.getElementById("curry-type").innerHTML = this.state.curryList[index].curryType;

        document.getElementById("taste-notes").innerHTML = this.state.curryList[index].tastingNotes;

        document.getElementById("rate").innerHTML = this.state.curryList[index].curryRating;


    }

    setModalShow(bool) {
        // on open, reset picture stored for upload so no repeats if someone doesn't upload one
        if(bool === true){
            this.setState({
                pictures:[]
            })
        }
        this.setState({ modalShow: bool });
    }

    addItem = (e) => {
        e.preventDefault();
        // Error checker: make sure all input values are filled (except excluded inputs if any)
        let excludedInputs = "tastingNotes";
        let error = false;
        // Go through each input field and make sure it's not empty
        for (var i = 0; i < 5; i++) {
            if (e.target[i].value === "" && !excludedInputs.includes(e.target[i].name)) {
                throwError(e.target[i].name);
                error = true;
            }
            else if (document.getElementById(e.target[i].name + "-label").style.color !== "#212529") {
                document.getElementById(e.target[i].name + "-label").style.color = "#212529";
                document.getElementById(e.target[i].name + "-label").style.fontWeight = "400"
            }
        }
        if (error === true) {
            document.getElementsByClassName("req")[0].style.color = "#dc3545";
            return null
        }

        let currCurryList = this.state.curryList;

        let newCurry = {};
        for (i = 0; i < 5; i++) {
            // If optional inputs empty, fill with "None"
            if (excludedInputs.includes(e.target[i].name) && e.target[i].value === "") {
                e.target[i].value = "N/A"
            }

            newCurry[e.target.elements[i].name] = e.target[i].value;
        }
        if(this.state.pictures.length === 0){
            newCurry["pic"] = curryBowl
        }
        else{
            newCurry["pic"] = this.state.pictures;
        }

        currCurryList.push(newCurry)
        this.setState({ curryList: currCurryList });
        store(currCurryList)

        // close modal
        this.setModalShow(false);

        // Start animation: Falling curry bowls
        this.setState({ curryFalling: true });
    }

    render() {
        return (
            <div id="bootstrap-overrides">
                { this.state.curryFalling &&
                    <span className="falling-curry container">
                        <span onAnimationEnd={() => this.setState({ curryFalling: false })} className="fallingLeaves"></span>
                        <span className="fallingLeaves"></span>
                        <span className="fallingLeaves"></span>
                        <span className="fallingLeaves"></span>
                        <span className="fallingLeaves"></span>
                        <span className="fallingLeaves"></span>
                        <span className="fallingLeaves"></span>
                        <span className="fallingLeaves"></span>
                        <span className="fallingLeaves"></span>
                        <span className="fallingLeaves"></span>
                        <span className="fallingLeaves"></span>
                    </span>
                }
                <div id="selected-restaurant">
                    <span id="instrucs">Select a Pinned Thai Curry Restaurant</span> <span className='rest-name'></span>
                    <br />
                    <span className="link-like-span" onClick={() => this.setModalShow(true)}>
                        + Add New Curry
                    </span>
                </div>

                <AddCurryModal
                    show={this.state.modalShow}
                    onHide={() => this.setModalShow(false)}
                    currySetter={this.addItem}
                    onDrop ={this.onDrop}
                />

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

                <div id="notice">Note: if map doesn't update or show markers and curries in index, refresh page</div>

                { this.state.markerSelected &&
                    <div id="selected-curry" className="mt-2 mt-md-2">
                        <Image alt="curry" src={curryBowl} id="curry-img" className="selected-curry-image left-fl mr-4" />
                        <div className="left-fl">
                            <span className="left-fl">
                                <span id="ranking">#1</span>
                            </span>

                            <span className="left-fl ml-1 mt-3">
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