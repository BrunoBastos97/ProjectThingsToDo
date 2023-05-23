import React, { useState } from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function Navbar(){

    const dispatch = useDispatch();
 
    return(
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
                <a className="navbar-brand text-white" href="/home">Things To Do</a>
                <button className="navbar-toggler text-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <i className="fas fa-light fa-bars text-white"></i>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/home">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/registerthingstodo">Adicionar Coisas a Fazer</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" onClick={() => dispatch({type: 'LOG_OUT'})} to="/">Sair</Link>
                        </li>
                    </ul>
                   
                </div>
            </div>
        </nav>
    );
}

export default Navbar;

/**/ 