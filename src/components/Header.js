import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, 
        Form, FormGroup, Label, Input, FormFeedback, ModalFooter } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import Cookies from 'universal-cookie';
import FacebookLogin from 'react-facebook-login';
import { baseUrl } from '../BaseUrl.js';
import '../App.css';
import '../Header.css';

class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            search: '',
            facebook: {},
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

        this.search = this.search.bind(this);

        this.handleFacebookLogin = this.handleFacebookLogin.bind(this);
        this.loginFacebookClick = this.loginFacebookClick.bind(this);
        this.signupFacebookClick = this.signupFacebookClick.bind(this);
    }

    search = (evt) => {
        this.setState({
            search: evt.target.value
        });        
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
            alert("Invalid email or password. Please try again.");
        });
    }

    handleLogin(event) {
        // validate all fields to prevent clicking on login button
        // before touching fields
        if (this.state.loginForm.username.value === '' || 
                this.state.loginForm.password.value === '') {
            alert("please provide e-mail and password");
        } else {
            this.toggleForm('loginForm')(event);
            this.login(this.state.loginForm.username.value, 
                this.state.loginForm.password.value);        
        }

        event.preventDefault();
    }

    handleSignup(event) {
        if (this.state.signupForm.username.value === '' || 
                this.state.signupForm.password.value === '' ||
                this.state.signupForm.fullName.value === '' ||
                !this.state.signupForm.username.valid) {
            alert("please provide email, password and full name");
            event.preventDefault();
            return;
        }

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
            alert('User created successfully');
            this.login(this.state.signupForm.username.value, this.state.signupForm.password.value)
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
        if (fieldName === "password"
            || fieldName === "fullName") {
            // returns true if !== "" (valid situation) 
            return fieldValue !== "";
        }
        if (fieldName === "username") {
            return fieldValue !== "" && /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(fieldValue);
        }

        return true;
    }

    handleFacebookLogin (fbResponse) {
        console.log("STORE Facebook Data. Token: ", fbResponse.accessToken);

        fetch(baseUrl + 'users/login/facebook', {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + fbResponse.accessToken
            },
            method: "POST",
            body: JSON.stringify({})
        })
        .then(res => res.json())
        .then((data) => {
            if (data.success) {
                const cookies = new Cookies();
                cookies.set('iron-token', data.token, { path: '/' });
                alert("Succefully logged in! Welcome " + fbResponse.name);
            }
        })
        .catch((err) => {
            alert("Could not login via Facebook.");
        });

    }

    loginFacebookClick () {
        console.log("loginFacebook function");
        this.toggleForm('loginForm')();
    }

    signupFacebookClick () {
        this.toggleForm('signupForm')();
    }

    render () {
        return (
            <React.Fragment>
            <div className="topbar">
                <div className="iron">
                    <div>
                        <NavLink to="/home">
                            <img src="/img/ironhack.png" alt="logo" className="logo" height="40px" />
                        </NavLink>
                    </div>
                    <div>
                        IRON MOVIES
                    </div>
                </div>
                <div className="search">
                    <div>
                        <input type="text" size="30" 
                        placeholder="(search title or director)" 
                        onChange={this.search} 
                        onBlur={this.search}/>
                    </div>
                    <div>
                        <NavLink to={"/results?q=" + this.state.search}>SEARCH</NavLink>
                    </div>
                </div>
                <div className="menu">
                    <div>
                        <NavLink to="/list">CATEGORIES</NavLink>
                    </div>
                    <div>
                        <NavLink to="/edit/0">ADD</NavLink>
                    </div>
                    <div>
                        <Button className="menu" onClick={this.toggleForm('loginForm')}>
                            LOGIN
                        </Button>
                    </div>
                    <div>
                        <Button className="menu" onClick={this.toggleForm('signupForm')}>
                            SIGN UP
                        </Button>
                    </div>
                </div>
                <Modal isOpen={this.state.loginForm.isOpen} toggle={this.toggleForm('loginForm')}>
                    <ModalHeader toggle={this.toggleForm('loginForm')}>Login</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleLogin}>
                            <FormGroup>
                                <Label htmlFor="username">E-mail</Label>
                                <Input type="text" id="username" name="username"
                                    placeholder="E-mail"
                                    invalid={this.state.loginForm.username.touched && !this.state.loginForm.username.valid}
                                    onChange={this.handleInputChange('loginForm')}
                                    onBlur={this.handleBlur} />
                                <FormFeedback>
                                    E-mail is required
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
                    <ModalFooter>
                        <FormGroup>
                        <FacebookLogin
                            appId="1034092406940238"
                            autoLoad={false}
                            fields="name,email,picture"
                            icon="fa-facebook"
                            onClick={this.loginFacebookClick}
                            callback={this.handleFacebookLogin} />
                        </FormGroup>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={this.state.signupForm.isOpen} toggle={this.toggleForm('signupForm')}>
                    <ModalHeader toggle={this.toggleForm('signupForm')}>SIGN UP</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSignup}>
                            <FormGroup>
                                <Label htmlFor="username">E-mail</Label>
                                <Input type="text" id="username" name="username"
                                    placeholder="E-mail"
                                    invalid={this.state.signupForm.username.touched && !this.state.signupForm.username.valid}
                                    onChange={this.handleInputChange('signupForm')}
                                    onBlur={this.handleBlur} />
                                <FormFeedback>
                                    E-mail is required
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
                    <ModalFooter>
                        <FormGroup>
                        <FacebookLogin
                            appId="1034092406940238"
                            autoLoad={false}
                            fields="name,email,picture"
                            icon="fa-facebook"
                            textButton="SIGNUP WITH FACEBOOK"
                            onClick={this.signupFacebookClick}
                            callback={this.handleFacebookLogin} />
                        </FormGroup>
                    </ModalFooter>

                </Modal>
            </div>

            </React.Fragment>
        );    
    }
    
}

export default Header;