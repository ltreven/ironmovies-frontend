import React, { Component } from 'react';
import '../Home.css';

class HomePage extends Component {

    render () {
        return (
            <div className="homepage">
                <div className="feat1">
                    <div className="feat1text">
                        <div className="feat1text1">
                            IRON MOVIES
                        </div>
                        <div className="feat1text2">
                            PUBLISH, SHARE AND WATCH INCREDIBLE MOVIES
                        </div>
                    </div>
                </div>
                <div className="highlight-feat2">
                    SOME TEXT THAT WILL DISAPPEAR WHEN RESIZING
                </div>
                <div className="feat2">
                    
                </div>
                <div className="carrusel">
                    carrusel
                </div>
                <div className="feat3">
                    PUBLISH HERE YOUR FAVORITE MOVIES
                </div>
                <div className="footer-photo">
                    <img src="/img/kito.jpeg" alt="Me" class="my-photo" />
                </div>
                <div className="footer-text">
                    <div></div><div></div>
                    <div>
                        Lourenço Trevenzolli
                    </div>
                    <div>
                        <a href="mailto:ltreven@gmail.com" target="_blank">
                            ltreven@gmail.com
                        </a>
                    </div>
                    <div>
                        <a href="https://github.com/ltreven/ironmovies-backend" target="_blank">
                            Repo Frontend
                        </a>
                    </div>
                    <div>
                        <a href="https://github.com/ltreven/ironmovies-backend" target="_blank">
                            Repo Backend
                        </a>
                    </div>
                    <div>
                        <a href="https://documenter.getpostman.com/view/2306941/SzKPUfw5?version=latest" target="_blank">
                            API Docs
                        </a>
                    </div>
                </div>
                <div className="footer-in">
                    <a href="https://www.linkedin.com/in/ltreven/" target="_blank">
                        <img src="/img/linkedin.png" alt="Me" class="linkedin" />
                    </a>
                </div>
            </div>
        );    
    }
    
}

export default HomePage;