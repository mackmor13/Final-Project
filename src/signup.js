import React from 'react';
import md5 from 'js-md5';
import firebase from 'firebase';
import { Link, hashHistory } from 'react-router';
import { Button, Spinner } from 'react-mdl';


/* A form for signing up and logging into a website.
  Specifies email, password, user handle, and avatar picture url.
 */
class SignUpForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      'email': undefined,
      'password': undefined,
      'sedPassword': undefined,
      'handle': undefined,
      'avatar': undefined,
      showSpinner: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.signUp = this.signUp.bind(this);
  }

  //update state for specific field
  handleChange(event) {
    var field = event.target.name;
    var value = event.target.value;

    var changes = {}; //object to hold changes
    changes[field] = value; //change this field
    this.setState(changes); //update state

    if (field === "email") {
      this.setState({ avatar: 'https://www.gravatar.com/avatar/' + md5(event.target.value) }); //create gravatar url
    }
  }


  //A callback function for registering new users
  signUp(event, email, password, handle, avatar) {

    event.preventDefault(); //don't submit
    /* Create a new user and save their information */
    this.setState({ showSpinner: true })
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(function (firebaseUser) {
        firebaseUser.sendEmailVerification();//let firebase send email verification
        alert("Check verification email");
        var profilePromise = firebaseUser.updateProfile({
          displayName: handle,
          photoURL: avatar
        }); //return promise for chaining

        //create new entry in the Cloud DB (for others to reference)
        var userRef = firebase.database().ref('users/' + firebaseUser.uid);
        var userData = {
          handle: handle,
          avatar: avatar
        }
        var userPromise = userRef.set(userData); //update entry in JOITC, return promise for chaining
        return Promise.all(profilePromise, userPromise); //do both promises at once!
      })
      .catch((err) => alert(err));
    hashHistory.push('/channels');
  }


  /**
   * A helper function to validate a value based on a hash of validations
    second parameter has format*/
  validate(value, validations) {
    var errors = { isValid: true, style: '' };

    if (value !== undefined) { //check validations
      //handle required
      if (validations.required && value === '') {
        errors.required = true;
        errors.isValid = false;
      }

      //handle minLength
      if (validations.minLength && value.length < validations.minLength) {
        errors.minLength = validations.minLength;
        errors.isValid = false;
      }

      //handle email type ??
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
    var handleErrors = this.validate(this.state.handle, { required: true, minLength: 3 });
    var passwordMatchErrors = this.validate(this.state.sedPassword, { required: true, match: true });

    //button validation
    var signUpEnabled = (emailErrors.isValid && passwordErrors.isValid && handleErrors.isValid && passwordMatchErrors.isValid);

    return (
      <div>
        <header>
          <strong>LET'S SET YOU UP</strong>
        </header>
        <form id="SignUpForm" role="form" className="sign-up-form">

          <ValidatedInput field="email" type="email" label="The Email Address That You Can't Forget" changeCallback={this.handleChange} errors={emailErrors} />
          <ValidatedInput field="handle" type="text" label="The Name That You Want To Be Known As" changeCallback={this.handleChange} errors={handleErrors} />
          <ValidatedInput field="password" type="password" label="You Top-Secret Unforgettable Password" changeCallback={this.handleChange} errors={passwordErrors} />
          <ValidatedInput field="sedPassword" type="password" label="Tell Me That Password One More Time" changeCallback={this.handleChange} errors={passwordMatchErrors} />

          <div className="form-group sign-up-buttons">
            <Button aria-label="sign up" raised colored className="btn btn-primary" disabled={!signUpEnabled} onClick={(e) => this.signUp(e, this.state.email, this.state.password, this.state.handle, this.state.avatar)}>Sign-up</Button>
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