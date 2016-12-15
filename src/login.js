// gives the sign in form for users
import React from 'react';
import { Link, hashHistory } from 'react-router';
import firebase from 'firebase';
import './style.css';
import { Spinner } from 'react-mdl';
// import "./style.css";

/*A form for logging into a website. Specifies email, password.*/
class SignInForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            'email': undefined,
            'password': undefined,
            showSpinner: false
        };

        //function binding
        this.handleChange = this.handleChange.bind(this);

    }

    componentDidMount() {
        /* Add a listener and callback for authentication events */
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({ userId: user.uid });
                hashHistory.push('/newsfeed') //redirect to main page once logged in 
            }
            else {
                this.setState({ userId: null }); //null out the saved state
            }
        })
    }

    //update state for specific field
    handleChange(event) {
        var field = event.target.name;
        var value = event.target.value;

        var changes = {}; //object to hold changes
        changes[field] = value; //change this field
        this.setState(changes); //update state
    }

    //handle signIn button
    signIn(event) {
        event.preventDefault(); //don't submit
        this.setState({ showSpinner: true })
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .catch((err) => alert(err));
    }

    /*A helper function to validate a value based on a hash of validations
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
        }

        //display details
        if (!errors.isValid) { //if found errors
            errors.style = 'has-error';
        }
        else if (value !== undefined) { //valid and has input
            errors.style = 'has-success' //show success coloring
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
        //button validation
        var signInEnabled = (emailErrors.isValid);

        return (
            <div>
                <header>
                    <strong>PLEASE LOG IN FIRST</strong>
                </header>
                <form role="form" className="sign-up-form">

                    <ValidatedInput field="email" type="email" label="The Email Address That You Always Remember" changeCallback={this.handleChange} errors={emailErrors} />

                    <ValidatedInput field="password" type="password" label="Your Unforgettable Top-Secret Password" changeCallback={this.handleChange} errors={passwordErrors} />


                    <div className="form-group sign-up-buttons">
                        <button aria-label="Sign In" aria-role="button" className="btn btn-primary" disabled={!signInEnabled} onClick={(e) => this.signIn(e)}>Sign-in</button>
                        {this.state.showSpinner &&
                            <Spinner />
                        }
                    </div>
                    <Link aria-role="link" aria-label="To Sign-up" to="join" activeClassName="activeLink">New Users Feel Free To Sign-Up Here </Link>
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
                    <p className="help-block">Required!</p>
                }
                {this.props.errors.email &&
                    <p className="help-block">Not an email address!</p>
                }
                {this.props.errors.minLength &&
                    <p className="help-block">Must be at least {this.props.errors.minLength}characters.</p>
                }
            </div>
        );
    }
}

export default SignInForm;