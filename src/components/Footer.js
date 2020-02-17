import React, { Component } from 'react';
import '../App.css';
import '../Footer.css';

class Footer extends Component {
    render () {
        return (
            <div className="footer">
                <div className="linkedin">
                    <a href="https://www.linkedin.com/in/ltreven/" target="_blank">
                        <img src="/img/linkedin.png" alt="Me" className="linkedin" />
                    </a>
                </div>
                <div className="name">Lourenço Trevenzolli</div>
                <div className="docs">
                    <a href="https://documenter.getpostman.com/view/2306941/SzKPUfw5?version=latest" target="_blank">
                        API Docs
                    </a>
                </div>
                <div className="contact">
                    <a href="mailto:ltreven@gmail.com" target="_blank">
                        ltreven@gmail.com
                    </a>
                </div>
                <div className="docs">
                    <a href="https://github.com/ltreven/ironmovies-backend" target="_blank">
                        Repo Frontend
                    </a>
                </div>
                <div className="contact">
                    +34 675 74 2525
                </div>
                <div className="docs">
                    <a href="https://github.com/ltreven/ironmovies-backend" target="_blank">
                        Repo Backend
                    </a>
                </div>
            </div>
        );
    }
}

export default Footer;