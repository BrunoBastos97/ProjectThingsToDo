import React, { useState } from 'react';
import './login.css';
import 'firebase/auth';
import {
    signInWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider, 
    signInWithPopup
  } from 'firebase/auth';
import { useSelector, useDispatch } from 'react-redux';
import {useNavigate} from "react-router-dom";

function Login(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [messageType, setMessageType] = useState('');
    const [loading, setLoading] = useState();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSingIn = () => {  
        setLoading(1)
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            setLoading(0)
            setMessageType('success')
            dispatch({type: 'LOG_IN', userEmail: email});
        })
        .catch((error) => {
            setMessageType('error')
            setLoading(0)
        });
        
      };

    const handleSingInGoogle = () => {
        const provider = new GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

        const auth = getAuth();
        auth.languageCode = 'pt-br'
        signInWithPopup(auth, provider)
        .then((result) => {
            setLoading(0)  
            const user = result.user;
            dispatch({type: 'LOG_IN', userEmail: user.email});
         
        }).catch((error) => {
            setLoading(0)
        });
    }

    return(
        <div className='login-content d-flex align-item-center'>
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
                    : <button onClick={handleSingIn} className="w-100 btn btn-lg btn-login" type="button">Logar</button>         
                } 
                
                {
                    loading ? <div className="d-flex justify-content-center">
                    <div className="spinner-border text-light" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    </div>
                    : <button onClick={handleSingInGoogle} className="w-100 my-3 btn btn-lg btn-login" type="button">Google</button>         
                }

                <div className="message-login text-white text-center">
                    { messageType === 'success' && 
                        <span>
                            <strong>WoW!</strong>
                            Você está connctado!
                        </span>
                    }
                    { messageType === 'error' && 
                        <span>
                            <strong>Ops!</strong>
                            E-mail ou senha estão incorretos!
                        </span>
                    }   
                </div>

                <div className='login-options mt-5 text-center'>
                    <a className='mx-2' href="/registeruser">Cadastrar</a>
                </div>
            </form>
        </div>
    )
}

export default Login;