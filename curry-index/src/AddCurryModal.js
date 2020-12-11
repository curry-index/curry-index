// Modules
import React from "react";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ImageUploader from 'react-images-upload';

import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

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
                    <div className="sublabel req">* Required field</div>
                    <br />
                    <div className="row">
                        <div className="col-8">
                            <Form.Label id="restaurantName-label" className="mb-1">Restaurant*</Form.Label><br />
                            <Form.Control autoComplete="off" size="sm" name="restaurantName" type="text" placeholder="Name of Restaurant" />
                            <br />

                            <Form.Label id="restaurantAddress-label" className="mb-1">Full Address of Restaurant*</Form.Label>
                            <br /><span className="sublabel">Can also write as "Restaurant name, City, State"</span>
                            <Form.Control autoComplete="off" size="sm" name="restaurantAddress" type="text" placeholder='e.g. "123 Thai St, Pittsburgh, PA"' />
                            <br />

                            <div className="container p-0">
                                <div className="row">
                                    <div className="col-8">
                                        <Form.Label id="curryType-label" className="mb-0">Curry Name*</Form.Label>
                                        <br /><span className="sublabel">Include "curry" in name</span>
                                        <Form.Control autoComplete="off" size="sm" name="curryType" type="text" placeholder='e.g. "Red Curry"' />
                                    </div>
                                    <div className="col-4">
                                        <Form.Label id="curryRating-label" className="mb-0">Rating*</Form.Label>
                                        <br /><span className="sublabel">1=worst, 5=best</span>
                                        <Form.Control autoComplete="off" size="sm" name="curryRating" type="text" placeholder="1-5" />
                                    </div>
                                </div>
                            </div>

                            <br />
                            <Form.Label id="tastingNotes-label" className="mb-1">Taste Notes</Form.Label>
                            <Form.Control as="textarea" name="tastingNotes" placeholder="Taste description of curry" rows={3} />

                        </div>

                        <div className="col-4">
                            <Form.Group>
                                <ImageUploader
                                    withIcon={false}
                                    buttonText='Upload Image'
                                    withPreview={true}
                                    singleImage={true}
                                    label={'Max file size: 5MB \n Accepted file types: jpg, gif, png'}
                                    onChange={props.onDrop}
                                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                    maxFileSize={5242880}
                                />
                                {/* <Form.Label className="mb-1">Add a Photo</Form.Label>
                                <Form.File multiple={false} onChange={props.handleImageUpload} name="curryPhoto" id="exampleFormControlFile1" /> */}
                            </Form.Group>
                        </div>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" size="sm" onClick={props.onHide}>Close</Button>
                    <Button variant="primary" type="submit" size="sm">Save</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}
export default AddCurryModal;
