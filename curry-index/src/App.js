// Make maps update without manual refresh?

// Modules
import React, { Component } from "react";
import Image from 'react-bootstrap/Image';
import AddCurryModal from './AddCurryModal';
// import noodleheadRed from './noodlehead-red.jpg';
import curryBowl from './currybowllg.svg';

// CSS
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

function throwError(inputName) {
    document.getElementById(inputName + "-label").style = "color: #dc3545; font-weight: 600";
}

// Store curry list in local storage
function store(lizt) {
    localStorage.setItem('curryList', JSON.stringify(lizt))
}

// Load from storage
function load() {
    let unparsedCurryList = localStorage.getItem('curryList')
    //Using && to condition on unparsedCurryList else null
    return (unparsedCurryList && JSON.parse(unparsedCurryList))
}

// Globals
let loaded_curryList = load();

class Curry extends React.Component {
    render() {
        return (
            <div className="col-sm-12 col-md-6 mb-4">
                <div className="mt-4 mt-sm-auto">
                    <div className="row">
                        <div className="col-12 col-md-7 col-lg-6">
                            <Image alt="curry" src={this.props.pic} className="card-images" />
                        </div>
                        <div className="col-12 col-md-5 col-lg-6">
                            <h2 className="mb-0 mt-2 mt-md-0 curry-card-title">{this.props.restaurant}</h2>
                            <h3>{this.props.curry}</h3>
                            <p>
                                Taste notes: {this.props.tastingNotes}
                                <br />Rating: {this.props.rating}/5
                            </p>

                            <span className="delete-btn" onClick={(e) => this.props.deleteItem(e, this.props.i)}>
                                Delete
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //Using || for backup assignment if no curryList in storage
            curryList: loaded_curryList || [],
            modalShow: false,
            curryFalling: false,
            pictures: [],
            noCurriesInIndex: true
        }
        this.onDrop = this.onDrop.bind(this);
    }

    onDrop(pictureFiles, pictureDataURLs) {
        this.setState({
            pictures: pictureDataURLs
        });
    }

    renderCurryItem(restaurant, curryType, tastingNotes, rating, pict, i) {
        return <Curry restaurant={restaurant} curry={curryType} tastingNotes={tastingNotes} rating={rating} i={i} key={i} deleteItem={this.deleteItem} pic={pict} />
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

        this.setState({noCurriesInIndex: false})

        // Start animation: Falling curry bowls
        this.setState({ curryFalling: true });
    };

    deleteItem = (event, i) => {
        event.stopPropagation(); // Makes the delete button work
        let currCurryList = this.state.curryList;
        currCurryList.splice(i, 1);
        this.setState({ curryList: currCurryList });
        store(currCurryList);

        if(this.state.curryList.length === 0){
            this.setState({noCurriesInIndex: true})
        }
    };

    setModalShow(bool) {
        // on open, reset picture stored for upload so no repeats if someone doesn't upload one
        if(bool === true){
            this.setState({
                pictures:[]
            })
        }
        this.setState({ modalShow: bool });
    }

    render() {
        let curriesInIndex = [];
        if (this.state.curryList !== null) {
            for (let i = 0; i < this.state.curryList.length; i++) {
                let curry = this.state.curryList[i];
                curriesInIndex.push(
                    this.renderCurryItem(
                        curry.restaurantName,
                        curry.curryType,
                        curry.tastingNotes,
                        curry.curryRating,
                        curry.pic,
                        i
                    )
                );
            }
        }

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
                {/* Curry Index: List of curries */}
                <div className="header pb-0 pb-md-3">
                    <h1 className="mb-0">Saved Curries</h1>
                    <span className="link-like-span" onClick={() => this.setModalShow(true)}>
                        + Add New Curry
                    </span>
                </div>

                <div className="row">
                    { this.state.noCurriesInIndex &&
                    <h3 className="ml-3 mt-4">No curries in index. Start by clicking "+ Add New Curry"!</h3>
                    }
                    {curriesInIndex}
                </div>
                <AddCurryModal
                    show={this.state.modalShow}
                    onHide={() => this.setModalShow(false)}
                    currySetter={this.addItem}
                    onDrop ={this.onDrop}
                />
            </div >
        );
    }
}

export default App;
