import React from 'react';
import controller from './congressController';
import { Dialog, DialogTitle, DialogActions, DialogContent } from 'react-mdl';
import Mailto from 'react-mailto';
import { Button, Well, Image, Collapse, Form, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import $ from 'jquery';
import firebase from 'firebase';
import './button.css';

//Class which generates the entire application being created
class App extends React.Component {
  render() {
    return (
      // This div contains the dialog and button for contacting a representative
      <div id="wrapper">
        <CongressDialog />
      </div>
    );
  }
}

// Creates a dialog that allows you to contact your local represntative based on zip
class CongressDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = { contactForm: [] };
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  // Gets the data of the representatives based on zip from api
  fetchData(zip) {
    var thisComponent = this;
    controller.CongressInfo(zip)
      .then(function (data) {
        if (data.results.length === 0) {
          alert('Please enter a valid Zip code')
        }
        thisComponent.setState({ contactForm: data.results })
      })
  }

  // updates the state to open dialog
  handleOpenDialog() {
    this.setState({
      openDialog: true
    });
  }

  // updates the state to closed dialog
  handleCloseDialog() {
    this.setState({
      openDialog: false,
      contactForm: []
    });
  }

  // Displays the representatives image, name with link to email, phone number and party
  render() {
    var Representative = this.state.contactForm.map(function (element) {
      return <div>
        <Image className="RepImage" src={controller.GetPictureUrl(element)} alt="picture for {element.last_name}" />
        <div><Mailto email={element.oc_email} obfuscate={true}>{element.first_name} {element.last_name}</Mailto></div>
        <div>Phone: {element.phone}</div><div>Party: {element.party}</div></div>;
    })
    // the button and the dialog box
    return (
      <div>
        <Button onClick={this.handleOpenDialog} data-toggle="tooltip" data-placement="bottom" title="Email a Representative"><i className="fa fa-envelope" aria-hidden="true"></i></Button>
        <Dialog id="Dialog" open={this.state.openDialog}>
          <Button aria-role="button" aria-lable="Close" id="close" onClick={this.handleCloseDialog}>&times;</Button>
          <DialogTitle className="emailTitle"><h4>Email your Representative</h4></DialogTitle>
          <DialogContent id="DialogContent">
            <SearchTypes searchFunction={this.fetchData} />
            <p>{Representative}</p>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

// allows the user to search for a representative based on zip
class SearchTypes extends React.Component {

  constructor(props) {
    super(props);
    this.state = { value: '' }
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // Gets what the user typed
  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  // Returns what the user typed
  handleClick(event) {
    this.props.searchFunction(this.state.value);
    this.setState({ value: '' })
  }

  // allows enter key to submit
  onSubmit(event) {
    event.preventDefault();
    this.handleClick();
  }

  //Search function that brings up the users local representatives 
  render() {
    return (
      <Form inline id="search" onSubmit={this.onSubmit}>
        <InputGroup>
          <FormControl type="text" value={this.state.value} placeholder="Enter your Zip code..." onChange={this.handleChange} />
          <InputGroup.Button>
            <Button aria-role="button" onClick={this.handleClick} type="button"><Glyphicon glyph="search" aria-label="Search" /></Button>
          </InputGroup.Button>
        </InputGroup>
      </Form>
    );
  }
}



export default App; //make this class available to other files (e.g., index.js) 