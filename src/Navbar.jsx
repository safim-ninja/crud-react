import React from 'react';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function Navbar() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                        <div>
                            <Link className="navbar-brand" to="/">Safim</Link>
                            {/*<a className="" href="#">Navbar</a>*/}
                        </div>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav align-content-end ms-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link active" to="/items">Home</Link>
                                    {/*<a  aria-current="page" href="#">Home</a>*/}
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Link</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link">Disabled</a>
                                </li>
                            </ul>
                        </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;


