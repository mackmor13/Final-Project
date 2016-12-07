import React from 'react';
import controller from './congressController';
import { Dialog, DialogTitle, DialogActions, DialogContent } from 'react-mdl'; 
import Mailto from 'react-mailto';
import { Button, Well, Image, Collapse, Form, FormControl, InputGroup, Glyphicon} from 'react-bootstrap';
import $ from 'jquery';
import firebase from 'firebase';
import './MorgansTamp.css';

//Class which generates the entire application being created
class App extends React.Component {
    render() {
        return (
            // Container which is split into the 12 column layout where 3 columns are the menu and 9 columns are for the headlines
            <div id="wrapper">
                 <CongressDialog />
            </div>
        );
    }
}

class CongressDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {contactForm:[]};
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  fetchData(zip) {
        var thisComponent = this;
        controller.CongressInfo(zip)
        .then(function(data){
            if(data.results.length === 0) {
                alert('Please enter a valid Zip code')
            }
            thisComponent.setState({contactForm:data.results})
    })
 }

  handleOpenDialog() {
    this.setState({
      openDialog: true
    });
  }

  handleCloseDialog() {
    this.setState({
      openDialog: false,
     contactForm:[]
    });
  }

  render() {
   var  Representative = this.state.contactForm.map(function(element) {
        return <div>
       <Image className="RepImage" src={controller.GetPictureUrl(element)} alt="picture for {element.last_name}"/>
       <Mailto email={element.oc_email} obfuscate={true}>
      {element.first_name} {element.last_name}</Mailto></div>;      
   })
    return (
      
      <div>
        <Button onClick={this.handleOpenDialog}>Show Dialog</Button>
        <Dialog id="Dialog"  open={this.state.openDialog}>
        <Button id="close" onClick={this.handleCloseDialog}>&times;</Button>
          <DialogTitle><h1>Email your Representative</h1></DialogTitle>
          <DialogContent id="DialogContent">
            <SearchTypes searchFunction={this.fetchData} />
            <p>{Representative}</p>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

class SearchTypes extends React.Component {

  constructor(props){
    super(props);
    this.state = {value:''}
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  
  // Gets what the user typed
  handleChange(event){
    this.setState({value:event.target.value});
  }

  // Returns what the user typed
  handleClick(event) {
    this.props.searchFunction(this.state.value);
    this.setState({value:''})
  }

  onSubmit(event) {
      event.preventDefault();
      this.handleClick();
  }
  
  //Search function that brings up a modal 
  render() {
    return (
      <Form inline id="search" onSubmit={this.onSubmit}>
        <InputGroup>
          <FormControl type="text" value={this.state.value} placeholder="Enter your Zip code..." onChange={this.handleChange} />
           <InputGroup.Button>
            <Button onClick={this.handleClick} type="button"><Glyphicon glyph="search" aria-label="Search" /></Button>
          </InputGroup.Button>
        </InputGroup>
      </Form>
    );
  }
}



export default App; //make this class available to other files (e.g., index.js) 