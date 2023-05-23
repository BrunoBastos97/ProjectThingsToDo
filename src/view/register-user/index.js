import React, { useState } from 'react';
import './register-user.css';
import 'firebase/auth';
import {
    createUserWithEmailAndPassword,
    getAuth,
  } from 'firebase/auth';
import { useSelector, useDispatch } from 'react-redux';
import {useNavigate} from "react-router-dom";

function RegisterUser(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRegister = () => {  
        setLoading(1);
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            setLoading(0);
            dispatch({type: 'LOG_IN', userEmail: email});
        })
        .catch((error) => {
            alert(error);
            setLoading(0);
        });
        
    };


    return(
        <div className='register-content d-flex align-item-center'>
            {
                useSelector(state => state.userLogged) > 0 ? 
                    navigate('/home')    
                : null
            }

            <form className='form-signin mx-auto'>
                <div className='text-center mb-4'>
                    <i className="fas fa-solid fa-user fa-8x text-white"></i>   
                </div>
 
                <div className="form-floating">
                    <input onChange={(e) => setEmail(e.target.value)}  type="email" class="form-control my-2" id="floatingEmail" placeholder="name@example.com"/>
                    <label className="text-center" for="floatingEmail">name@example.com</label>
                </div>

                <div className="form-floating">
                    <input onChange={(e) => setPassword(e.target.value)} type="password" class="form-control my-2" id="floatingPassword" placeholder="Password"/>
                    <label className="text-center" for="floatingPassword">Password</label>
                </div>

                {
                    loading ? <div className="d-flex justify-content-center">
                                <div className="spinner-border text-light" role="status">
                                     <span className="visually-hidden">Loading...</span>
                                </div>
                              </div>
                    : <button onClick={handleRegister} className="w-100 btn btn-lg btn-register" type="button">Cadastrar</button>         
                }
 
            </form>
        </div>
    )
}

export default RegisterUser;