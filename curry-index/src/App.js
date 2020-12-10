// Questions
// Making images work in react by src link without import?
//    - need this to add custom images
// Make maps update without manual refresh?

// Modules
import React, { Component } from "react";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import noodleheadRed from './noodlehead-red.jpg';

// CSS
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

function throwError(inputName) {
    document.getElementById(inputName + "-label").style = "color: #dc3545; font-weight: 600";
}

function AddCurryModal(props) {
    return (
        <Modal id="bootstrap-overrides"
            show={props.show}
            size="md"
            backdrop="static"
            className="modal-add-curry"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Form onSubmit={props.currySetter}>
                <Modal.Body className="container-fluid">
                    <h2 className="mb-1">New Curry Entry</h2>
                    <div className="sublabel">* Required field</div>
                    <br />
                    {/* <div className="row"> */}
                    {/* <div className="col-8"> */}
                    <Form.Label id="restaurantName-label" className="mb-1">Restaurant*</Form.Label><br />
                    <Form.Control size="sm" name="restaurantName" type="text" placeholder="Name of Restaurant" />
                    <br />

                    <Form.Label id="restaurantAddress-label" className="mb-1">Full Address of Restaurant*</Form.Label>
                    <Form.Control size="sm" name="restaurantAddress" type="text" placeholder='e.g. "123 Thai St, Pittsburgh, PA"' />
                    <br />

                    <div className="container p-0">
                        <div className="row">
                            <div className="col-8">
                                <Form.Label id="curryType-label" className="mb-0">Curry Name*</Form.Label>
                                <br /><span className="sublabel">Include "curry" in name</span>
                                <Form.Control size="sm" name="curryType" type="text" placeholder='e.g. "Red Curry"' />
                            </div>
                            <div className="col-4">
                                <Form.Label id="curryRating-label" className="mb-0">Rating*</Form.Label>
                                <br /><span className="sublabel">1=worst, 5=best</span>
                                <Form.Control size="sm" name="curryRating" type="text" placeholder="1-5" />
                            </div>
                        </div>
                    </div>

                    <br />
                    <Form.Label id="tastingNotes-label" className="mb-1">Taste Notes</Form.Label>
                    <Form.Control as="textarea" name="tastingNotes" placeholder="Taste description of curry" rows={3} />

                    {/* </div> */}

                    {/* <div className="col-4">
                            <Form.Group>
                                <Form.Label className="mb-1">Add a Photo</Form.Label>
                                <Form.File name="curryPhoto" id="exampleFormControlFile1" />
                            </Form.Group>
                        </div> */}
                    {/* </div> */}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" size="sm" onClick={props.onHide}>Close</Button>
                    <Button variant="primary" type="submit" size="sm">Save</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
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
                            {/* <Image alt="curry" src={require("./noodlehead-red.jpg")} /> */}
                            <Image alt="curry" src={noodleheadRed} className="card-images" />
                        </div>
                        <div className="col-12 col-md-5 col-lg-6">
                            <h2 className="mb-0 mt-2 mt-md-0 curry-card-title">{this.props.restaurant}</h2>
                            <h3>{this.props.curry}</h3>
                            <p>
                                Taste notes: {this.props.tastingNotes}
                                <br />Rating: {this.props.rating}/5
                            </p>

                            <span className="delete-btn" onClick={(e) => this.props.deleteItem(e, this.props.i)}>
                                {/* <span onClick={() => deleteCurry()} className="delete-btn"> */}
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
            newCurryContent: "",
            modalShow: false,
            curryFalling: false,
        };
    }

    renderCurryItem(restaurant, curryType, tastingNotes, rating, i) {
        return <Curry restaurant={restaurant} curry={curryType} tastingNotes={tastingNotes} rating={rating} i={i} key={i} deleteItem={this.deleteItem} />;
    }

    addItem = (e) => {
        e.preventDefault();
        // Error checker: make sure all input values are filled (except excluded inputs if any)
        let excludedInputs = "tastingNotes";

        let error = false;
        // Go through each input field and make sure it's not empty
        for (var i = 0; i < e.target.elements.length - 2; i++) {
            if (e.target[i].value === "") {
                if (!excludedInputs.includes(e.target[i].name)) {
                    throwError(e.target[i].name);
                    error = true;
                }
                else if (excludedInputs.includes(e.target[i].name)) {
                    e.target[i].value = "None"
                }
            }
            else if (document.getElementById(e.target[i].name + "-label").style.color !== "#212529") {
                document.getElementById(e.target[i].name + "-label").style.color = "#212529";
                document.getElementById(e.target[i].name + "-label").style.fontWeight = "400"
            }
        }
        if (error === true) {
            return null
        }

        let currCurryList = this.state.curryList;

        let newCurry = {};
        for (i = 0; i < e.target.elements.length - 2; i++) {
            newCurry[e.target.elements[i].name] = e.target[i].value;
        }

        currCurryList.push(newCurry)
        this.setState({ curryList: currCurryList });
        store(currCurryList)

        // close modal
        this.setModalShow(false);

        // Start animation: Falling curry bowls
        this.setState({ curryFalling: true });
    };

    deleteItem = (event, i) => {
        event.stopPropagation(); // Makes the delete button work
        let currCurryList = this.state.curryList;
        currCurryList.splice(i, 1);
        this.setState({ curryList: currCurryList });
        store(currCurryList);
    };

    setModalShow(bool) {
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
                        i
                    )
                );
            }
        }

        return (
            <div id="bootstrap-overrides">
                { this.state.curryFalling &&
                    <span className="falling-curry container">
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
                        <span className="fallingLeaves"></span>
                    </span>
                }
                {/* Curry Index: List of curries */}
                <div className="header pb-0 pb-md-3">
                    <h1 className="mb-0">Saved Curries</h1>
                    <span className="link-like-span" onClick={() => this.setModalShow(true)}>
                        <u>+ Add New Curry</u>
                    </span>
                </div>

                <div className="row">
                    {curriesInIndex}
                </div>
                <AddCurryModal
                    show={this.state.modalShow}
                    onHide={() => this.setModalShow(false)}
                    currySetter={this.addItem}
                />
            </div >
        );
    }
}

export default App;
