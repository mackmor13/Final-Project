// makes users sign up so that they can see the news
import React from 'react';
import firebase from 'firebase';
import './style.css';
import { Link, hashHistory } from 'react-router';
import { Button, Spinner } from 'react-mdl';

/* A form for signing up and logging into this website.
  Specifies email, password.
 */
class SignUpForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      'email': undefined,
      'password': undefined,
      'sedPassword': undefined,
      errMessage: '',
      showSpinner: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.signUp = this.signUp.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  //update state for specific field
  handleChange(event) {
    var field = event.target.name;
    var value = event.target.value;

    var changes = {}; //object to hold changes
    changes[field] = value; //change this field
    this.setState(changes); //update state
  }

  cancel(e) {
    e.preventDefault();
    hashHistory.push('/login');
  }


  //A callback function for registering new users
  signUp(event, email, password) {

    event.preventDefault(); //don't submit
    /* Create a new user and save their information */
    this.setState({showSpinner : true});
    var thisComponent = this;
    this.setState({ showSpinner: true })
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(function (err){
        console.log(err);
        thisComponent.setState({
          errMessage : err.message,
          showSpinner : false
        })
      })
      .then(function(){
        if(firebase.auth().currentUser){
          hashHistory.push('/newsfeed');
        }
      })
  }


  /**
   * A helper function to validate a value based on a hash of validations
    second parameter has format*/
  validate(value, validations) {
    var errors = { isValid: true, style: '' };

    if (value !== undefined) { //check validations
      if (validations.required && value === '') {
        errors.required = true;
        errors.isValid = false;
      }

      if (validations.minLength && value.length < validations.minLength) {
        errors.minLength = validations.minLength;
        errors.isValid = false;
      }

      if (validations.email) {
        var valid = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value)
        if (!valid) {
          errors.email = true;
          errors.isValid = false;
        }
      }

      if (validations.match && value !== this.state.password) {
        errors.match = true;
        errors.isValid = false;
      }
    }

    //display details
    if (!errors.isValid) { //if found errors
      errors.style = 'has-error';
    }
    else if (value !== undefined) { //valid and has input
      // errors.style = 'has-success' //show success coloring
    }
    else { //valid and no input
      errors.isValid = false; //make false anyway
    }
    return errors; //return data object
  }

  render() {
    //field validation
    var emailErrors = this.validate(this.state.email, { required: true, email: true });
    var passwordErrors = this.validate(this.state.password, { required: true, minLength: 6 });
    var passwordMatchErrors = this.validate(this.state.sedPassword, { required: true, match: true });
    //button validation
    var signUpEnabled = (emailErrors.isValid && passwordErrors.isValid && passwordMatchErrors.isValid);

    return (
      <div>
        {this.state.errMessage!='' &&
                    <div className="alert alert-danger" role="alert">{this.state.errMessage}</div>
        }

        <header className="title">
          <strong>Sign Up Form</strong>
        </header>
        <form id="SignUpForm" role="form" className="sign-up-form">

          <ValidatedInput field="email" type="email" label="The Email Address That You Can't Forget" changeCallback={this.handleChange} errors={emailErrors} />
          <ValidatedInput field="password" type="password" label="You Top-Secret Unforgettable Password" changeCallback={this.handleChange} errors={passwordErrors} />
          <ValidatedInput field="sedPassword" type="password" label="Tell Me That Password One More Time" changeCallback={this.handleChange} errors={passwordMatchErrors} />

          <div className="form-group sign-up-buttons">
            <Button aria-label="Sign up" aria-role="button" raised colored className="btn btn-success" disabled={!signUpEnabled} onClick={(e) => this.signUp(e, this.state.email, this.state.password)}>Sign-up</Button>
            <Button aria-label="Cancel" aria-role="button" raised colored className="btn btn-primary" onClick={(e) => this.cancel(e)}>Cancel</Button>
            {this.state.showSpinner &&
              <Spinner />
            }
          </div>
        </form>
      </div>
    );
  }
}

//A component that displays an input form with validation styling
//props are: field, type, label, changeCallback, errors
class ValidatedInput extends React.Component {
  render() {
    return (
      <div className={"form-group " + this.props.errors.style}>
        <label htmlFor={this.props.field} className="control-label">{this.props.label}</label>
        <input aria-label="input" id={this.props.field} type={this.props.type} name={this.props.field} className="form-control" onChange={this.props.changeCallback} />
        <ValidationErrors errors={this.props.errors} />
      </div>
    );
  }
}

//a component to represent and display validation errors
class ValidationErrors extends React.Component {
  render() {
    return (
      <div>
        {this.props.errors.required &&
          <p className="help-block">Required!</p >
        }
        {this.props.errors.email &&
          <p className="help-block">Not an email address!</p >
        }
        {this.props.errors.minLength &&
          <p className="help-block">Must be at least {this.props.errors.minLength}characters.</p >
        }
        {this.props.errors.match &&
          <p className="help-block">Password must match!</p >
        }
      </div>
    );
  }
}

export default SignUpForm;
export { SignUpForm };