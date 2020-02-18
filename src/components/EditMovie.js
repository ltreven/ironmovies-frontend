import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import DatePicker from "react-datepicker";
import Cookies from 'universal-cookie';
import { baseUrl } from '../BaseUrl.js';
import { baseImgUrl } from '../BaseImgUrl.js';
import { categories } from '../Categories.js';
import '../Details.css';

class EditMovie extends Component {

    constructor(props) {
        super(props);

        this.state = {
            movie: {
                release: new Date()
            },
            form: {
                posterFile: null,
                title: {
                    valid: true,
                    touched: false
                },
                director: {
                    valid: true,
                    touched: false
                },
                release: {
                    valid: true,
                    touched: false
                },
                score: {
                    valid: true,
                    touched: false
                },
                category: {
                    valid: true,
                    touched: false
                },
            },
            redirect: false
        }

        // Make functions available for React:
        this.handleSave = this.handleSave.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleFile = this.handleFile.bind(this);
    }

    componentDidMount() {
        const pathName = window.location.pathname;
        const pathSplit = pathName.split('/');
        const pMovieId = pathSplit[pathSplit.length-1];

        if (pMovieId === "0") {
            return;
        }

        fetch(baseUrl + 'movies/' + pMovieId)
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
        })
        .then((movie) => {
            console.log(movie);
            this.setState({
                movie: {
                    ...movie,
                    release: new Date(movie.release)
                }
            });
        })
        .catch(err => console.log("Error loading movie ID ", pMovieId));
    }

    canSubmit() {
        let can = true;

        //NEW Movies 
        if (!this.state.movie._id) {
            // Have to load an image
            if (!this.state.form.posterFile) {
                can = false;
            }
            if (!this.state.movie.title ||
                !this.state.movie.director ||
                !this.state.movie.score) {
                can = false;
            }
        }
        // NEW OR UPDATING EXISTING:
        if ((this.state.form.title.touched && !this.state.form.title.valid)
            || (this.state.form.director.touched && !this.state.form.director.valid)
            || (this.state.form.score.touched && !this.state.form.score.valid)) {

            can = false;
        }
 
        return can;
    }

    handleSave(event) {

        if (!this.canSubmit()) {
            alert("Please correct errors before saving.");
            return;
        }

        const dateUtc = (date) => {
            const mm = date.getMonth() + 1;
            const dd = date.getDate();
            //UTC time is defined with a capital letter Z.
            return [date.getFullYear(),
                    '-', (mm>9 ? '' : '0') + mm,
                    '-', (dd>9 ? '' : '0') + dd,
                    'T00:00:00Z'].join('');
        };

        let theMovie = this.state.movie;
        theMovie = {
            ...theMovie,
            release: dateUtc(this.state.movie.release)
        };

        const cookies = new Cookies();

        const saveMovie = () => {
            let url = baseUrl + 'movies/';
            let method = "POST";
            let message = "create";

            if (this.state.movie._id) {
                // Movie already exists.
                // CALL PUT instead of POST
                url += this.state.movie._id;
                method = "PUT";
                message = "update";
            }

            fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + cookies.get("iron-token")
                },
                method: method,
                body: JSON.stringify(theMovie)
            })
            .then((res) => {
                if (!res.ok) {
                    if (res.status === 401) {
                        alert('Unauthorized. Please login.');
                    }
                    throw new Error(res.statusText);
                }
                return res.json();
            })
            .then((movie) => {
                this.setState({
                    movie: {
                        ...this.state.movie,
                        _id: movie._id
                    }
                });
                alert("Movie " + message + "d successfully!"); 
                this.setState({
                    redirect: true
                })
            })
            .catch((err) => alert("Could not " + message + " movie. "));            
        }

        //UPLOAD IMAGE, if any
        const upload = (file) => {
            
            const formData = new FormData();
            formData.append('posterImage', file);

            console.log("file: ", file);

            fetch(baseUrl + 'upload/', {
                    method: 'POST',
                    headers: {
                    'Authorization': 'Bearer ' + cookies.get("iron-token")
                },
                    body: formData
                })
            .then((res) => {
                if (!res.ok) {
                    if (res.status === 401) {
                        alert('Unauthorized. Please login.');
                    }
                    throw new Error(res.statusText);
                }
                return res.json();
            })
            .then((success) => {
                console.log("RESPONSE: ", success); 
                theMovie.posterImageUrl = baseImgUrl + file.name;
                saveMovie();
            })
            .catch(error => console.log(error));
        };

        if (this.state.form.posterFile) {
            upload(this.state.form.posterFile);
        } else {
            saveMovie();
        }

    }

    handleFile = (event) => {
        this.setState({
            form: {
                ...this.state.form,
                posterFile: event.target.files[0],
                posterSrc: URL.createObjectURL(event.target.files[0])
            },
            movie: {
                ...this.state.movie,
                posterImageUrl: null
            }
        });
    }

    handleBlur(event) {
        const fieldName = event.target.name;

        this.setState({
            form: {
                ...this.state.form,
                [fieldName]: {
                    ...this.state.form[fieldName],
                    touched: true
                }
            }
        });
    }

    handleInputChange(event) {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
  
        this.setState({
            movie: {
                ...this.state.movie,
                [fieldName]: fieldValue
            },
            form: {
                ...this.state.form,
                [fieldName]: {
                    ...this.state.form[fieldName],
                    touched: true,
                    valid: this.validateField(fieldName, fieldValue)
                }
            }
        });
    }

    validateField (fieldName, fieldValue) {
        if (fieldName === "title" 
            || fieldName === "director") {

            // returns TRUE if field is not empty (valid situation) 
            return fieldValue !== "";
        }
        if (fieldName === "score") {
            return /^([1-9]|10)$/.test(fieldValue);
        }
        return true;
    }

    render() {

        if (this.state.redirect) {
            const redirect = '/details/' + this.state.movie._id;
            return (
                <div>
                    <Redirect to={redirect} />
                </div>
            );
        }


        const categoryList = categories.map((cat) => {
            return (<option value={cat.id}>{cat.miniTitle}</option>);
        });

        return (
            <div>
                <Form onSubmit={this.handleSave} className="details-grid-container">
                    <div className="pagetitle">
                        Edit Movie
                    </div>
                    <FormGroup className="movietitle">
                        <Label htmlFor="title">Movie Title</Label>
                        <Input type="text" id="title" name="title"
                            value={this.state.movie.title || ''}
                            invalid={this.state.form.title.touched && !this.state.form.title.valid}
                            onChange={this.handleInputChange}
                            onBlur={this.handleBlur} />
                        <FormFeedback>
                            Title is required
                        </FormFeedback>
                    </FormGroup>
                    <FormGroup  className="poster"> 
                        <Label htmlFor="posterImageUrl">Poster Image</Label>
                        <br/>
                        <img src={this.state.movie.posterImageUrl || this.state.form.posterSrc || '/img/upload.png'} alt="upload poster" />
                        <Input type="file" name="file" onChange={this.handleFile}/>
                    </FormGroup>
                    <FormGroup  className="director">
                        <Label htmlFor="director">Director's Name</Label>
                        <Input type="text" id="director" name="director"
                            value={this.state.movie.director || ''}
                            invalid={this.state.form.director.touched && !this.state.form.director.valid}
                            onChange={this.handleInputChange}
                            onBlur={this.handleBlur} />
                        <FormFeedback>
                            Director is required
                        </FormFeedback>
                    </FormGroup>
                    <FormGroup className="release">
                        <Label htmlFor="release">Release Date</Label>
                        <DatePicker 
                            selected={this.state.movie.release || new Date()} 
                            onChange={(date) => {
                                this.setState({
                                    movie: {
                                        ...this.state.movie,
                                        release: date
                                    }
                                });
                            }} />
                    </FormGroup>
                    <FormGroup className="movieCategory"> 
                        <Label htmlFor="release">Category</Label>
                        <Input type="select" id="category" name="category" 
                            value={this.state.movie.category  || ''}
                            onChange={this.handleInputChange}
                            onBlur={this.handleBlur}>
                                {categoryList}
                        </Input>
                    </FormGroup>
                    <FormGroup className="score"> 
                        <Label htmlFor="score">Score movie (0-10)</Label>
                        <Input type="text" id="score" name="score"
                            value={this.state.movie.score || ''}
                            invalid={this.state.form.score.touched && !this.state.form.score.valid}
                            onChange={this.handleInputChange}
                            onBlur={this.handleBlur} />
                        <FormFeedback>
                            Score must be between 1 and 10
                        </FormFeedback>
                    </FormGroup>
                    <FormGroup className="buttonEdit"> 
                        <Button color="primary" onClick={this.handleSave}>SAVE</Button>{' '}
                    </FormGroup>
                </Form>
            </div>            
        );

    }

}

export default EditMovie;