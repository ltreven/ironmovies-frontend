import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, 
        Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { baseUrl } from '../BaseUrl.js';
import '../App.css';
import '../Header.css';

class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loginForm: {
                isOpen: false,
                username: {
                    value: '',
                    valid: true,
                    touched: false
                },
                password: {
                    value: '',
                    valid: true,
                    touched: false
                }
            },
            signupForm: {
                isOpen: false,
                username: {
                    value: '',
                    valid: true,
                    touched: false
                },
                fullName: {
                    value: '',
                    valid: true,
                    touched: false
                },
                password: {
                    value: '',
                    valid: true,
                    touched: false
                }
            }
        }
        // Make functions available for React:
        this.toggleForm = this.toggleForm.bind(this);
        
        this.handleLogin = this.handleLogin.bind(this);
        this.handleSignup = this.handleSignup.bind(this);

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    toggleForm = (formName) => (evt) => {
        this.setState({
            [formName]: {
                ...this.state[formName],
                isOpen: !this.state[formName].isOpen
            }
        });
    }

    login(username, password) {
        fetch(baseUrl + 'users/login', {
            headers: {
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(
                {
                    username: username, 
                    password: password
                })
        })
        .then(res => res.json())
        .then((data) => {
            if (data.success) {
                const cookies = new Cookies();
                cookies.set('iron-token', data.token, { path: '/' });
                alert("Succefully logged in!");
            }
        })
        .catch((err) => {
            alert("Invalid username or password. Please try again.");
        });
    }

    handleLogin(event) {
        this.toggleForm('loginForm')(event);
        this.login(this.state.loginForm.username.value, 
            this.state.loginForm.password.value);    
        event.preventDefault();
    }

    handleSignup(event) {
        this.toggleForm('signupForm')(event);

        // CALL POST
        fetch(baseUrl + 'users/signup', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: "POST",
            body: JSON.stringify(
                {
                    fullName: this.state.signupForm.fullName.value,
                    username: this.state.signupForm.username.value, 
                    password: this.state.signupForm.password.value
                })
        })
        .then(res => res.json())
        .then((data) => {
            if (data.ok) {
                alert('User created successfully');
                this.login(this.state.signupForm.username.value, this.state.signupForm.password.value)
            }
        })
        .catch((err) => {
            alert("Error creating user");
        });

        event.preventDefault();
    }

    handleBlur(event) {
        const fieldName = event.target.name;

        this.setState({
            loginForm: {
                ...this.state.loginForm,
                [fieldName]: {
                    ...this.state.loginForm[fieldName],
                    touched: true
                }
            }
        });
    }

    handleInputChange = (formName) => (event) => {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
  
        this.setState({
            [formName]: {
                ...this.state[formName],
                [fieldName]: {
                    ...this.state[formName][fieldName],
                    touched: true,
                    value: fieldValue,
                    valid: this.validateField(fieldName, fieldValue)
                }
            }
        });
    }

    validateField (fieldName, fieldValue) {
        if (fieldName === "username" 
            || fieldName === "password"
            || fieldName === "fullName") {
            // returns true if !== "" (valid situation) 
            return fieldValue !== "";
        }
        return true;
    }

    render () {

        return (
            <React.Fragment>
            <div className="header">
                <div className="logo">
                    <NavLink to="/home">&nbsp;&nbsp;&nbsp;&nbsp;</NavLink>
                </div>
                <div className="title">
                    Iron Movies
                </div>
                <div className="placeholder">
                </div>
                <div className="menu">
                    <NavLink to="/list">ALL MOVIES</NavLink>
                </div>
                <div className="menu">
                    <NavLink to="/recent">RECENT MOVIES</NavLink>
                </div>
                <div className="menu">
                    <NavLink to="/edit/0">ADD MOVIE</NavLink>
                </div>
                <div className="menu">
                    <Button className="menu" onClick={this.toggleForm('loginForm')}>
                        LOGIN
                    </Button>
                </div>
                <div className="menu">
                    <Button className="menu" onClick={this.toggleForm('signupForm')}>
                        SIGN UP
                    </Button>
                </div>
                <Modal isOpen={this.state.loginForm.isOpen} toggle={this.toggleForm('loginForm')}>
                    <ModalHeader toggle={this.toggleForm('loginForm')}>Login</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleLogin}>
                            <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" id="username" name="username"
                                    placeholder="Username or email"
                                    invalid={this.state.loginForm.username.touched && !this.state.loginForm.username.valid}
                                    onChange={this.handleInputChange('loginForm')}
                                    onBlur={this.handleBlur} />
                                <FormFeedback>
                                    Username is required
                                </FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password"
                                    invalid={this.state.loginForm.password.touched && !this.state.loginForm.password.valid}
                                    onChange={this.handleInputChange('loginForm')}
                                    onBlur={this.handleBlur} />
                                <FormFeedback>
                                    Password is required
                                </FormFeedback>
                            </FormGroup>
                            <FormFeedback>
                                Password is required
                            </FormFeedback>  
                            <FormGroup>
                                <Button color="primary" onClick={this.handleLogin} type="submit">Login</Button>{' '}
                                <Button color="secondary" onClick={this.toggleForm('loginForm')}>Cancel</Button>
                            </FormGroup>                          
                        </Form>
                    </ModalBody>
                </Modal>
                <Modal isOpen={this.state.signupForm.isOpen} toggle={this.toggleForm('signupForm')}>
                    <ModalHeader toggle={this.toggleForm('signupForm')}>SIGN UP</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSignup}>
                            <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" id="username" name="username"
                                    placeholder="Username or email"
                                    invalid={this.state.signupForm.username.touched && !this.state.signupForm.username.valid}
                                    onChange={this.handleInputChange('signupForm')}
                                    onBlur={this.handleBlur} />
                                <FormFeedback>
                                    Username is required
                                </FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="fullName">Full Name</Label>
                                <Input type="text" id="fullName" name="fullName"
                                    invalid={this.state.signupForm.fullName.touched && !this.state.signupForm.fullName.valid}
                                    onChange={this.handleInputChange('signupForm')}
                                    onBlur={this.handleBlur} />
                                <FormFeedback>
                                    Full Name is required
                                </FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password"
                                    invalid={this.state.signupForm.password.touched && !this.state.signupForm.password.valid}
                                    onChange={this.handleInputChange('signupForm')}
                                    onBlur={this.handleBlur} />
                                <FormFeedback>
                                    Password is required
                                </FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Button color="primary" onClick={this.handleSignup} type="submit">CREATE ACCOUNT</Button>{' '}
                                <Button color="secondary" onClick={this.toggleForm('signupForm')}>CANCEL</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
            </React.Fragment>
        );    
    }
    
}

export default Header;