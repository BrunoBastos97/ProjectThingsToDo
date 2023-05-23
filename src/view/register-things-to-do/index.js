import React, { useState, useEffect } from 'react';
import './register-things-to-do.css';
import Navbar from '../../components/navbar';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
    doc,
    addDoc,
    updateDoc,
    deleteDoc,
    collection,
    getDoc,
  } from 'firebase/firestore';
  import db from '../../config/firebase';



function RegisterThingsToDo(props){ 
    const [loading, setLoading] = useState(0);
    const [messageType, setMessageType] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');
    const [time, setTime] = useState('');
    const userEmail = useSelector(state => state.userEmail);
    const [userUpdate, setUserUpdate ] = useState('');
    const [email, setEmail] = useState('');
    const [state, setState] = useState('');
    const [blocked, setBlocked] = useState(0);
    const colletionRef = collection(db, 'tasks');
    const {id} = useParams();

    useEffect(() => { 
        setLoading(0);
        if(id){
            setLoading(1);
            const fetchClass = async () => {
                const classRef = doc(db, "tasks", id);
                await getDoc(classRef).then(result => {
                    setTitle(result.data().title);
                    setDescription(result.data().description);
                    setDeadline(result.data().deadline);
                    setTime(result.data().time);
                    setEmail(result.data().userMaster);
                    setUserUpdate(result.data().userUpdate);  
                    setBlocked(result.data().blocked);
                    setState(result.data().state);    
                });
            }
            fetchClass();           
        }
        setLoading(0);
    }, [loading])
 
    async function register(){
        setLoading(1);
        try {             
            await addDoc(collection(db, "tasks"), { 
                title: title,
                description: description,
                deadline: deadline,
                time: time, 
                userMaster: userEmail,         
                state: 0,
                blocked: blocked,
                dateCreated: new Date()
            }).then(() =>{
                setMessageType('success');
                setLoading(0); 
            }).catch(erro => {
                alert(erro);
                setMessageType('error');
            });
            
        } catch (e) {
            setLoading(0);     
        }
    
    }

    async function update(){
        setLoading(1);
        try {
            const taskRef = doc(colletionRef, id);
            await updateDoc(taskRef, {
                title: title,
                description: description,
                deadline: deadline,
                time: time, 
                userUpdate: userEmail,      
                state: 0,
                blocked: blocked
            }).then(() => {
                setLoading(0);
            });
          } catch (error) {
            setLoading(0);
          }    
    }

    async function unlock(){
        setLoading(1);
        try {
            const taskRef = doc(colletionRef, id);
            await updateDoc(taskRef, {
                blocked: 0 
            }).then(() => {
                setLoading(0);
            });
          } catch (error) {
            setLoading(0);
          }    
    }

    async function block(){
        setLoading(1);
        try {
            const taskRef = doc(colletionRef, id);
            await updateDoc(taskRef, {
                blocked: 1 
            }).then(() => {
                setLoading(0);
            });
          } catch (error) {
            setLoading(0);
          }    
    }

    async function conclude(){
        setLoading(1);
        try {
            const taskRef = doc(colletionRef, id);
            await updateDoc(taskRef, {
                state: 1 
            }).then(() => {
                setLoading(0);
            });
          } catch (error) {
            setLoading(0);
          }    
    }

    async function taskDelete(){
        setLoading(1);
        try {
            const schoolRef = doc(colletionRef, id);
            await deleteDoc(schoolRef, schoolRef);
            setLoading(0);
        } catch (error) {
            setLoading(0);
        }
    }

    return(
        <>
            <Navbar></Navbar>  
            <div className='my-5 mx-5'>
                <div className='row'>
                    <h3 className='text-center'>{id ? 'Editar tarefa' : 'Nova tarefa'}</h3>
                </div>

                <form>
                    <div className='form-group'>
                        <label>Titulo:</label>
                        <input onChange={(e) => setTitle(e.target.value)} type='text' className='form-control' value={title && title}></input>
                    </div>

                    <div className='form-group'>
                        <label>Descrição:</label>
                        <textarea onChange={(e) => setDescription(e.target.value)} className='form-control' rows='3' value={description && description}></textarea>
                    </div>

                    <div className='form-group row'>
                        <div className='col-6'>
                            <label>Data do prazo final:</label>
                            <input onChange={(e) => setDeadline(e.target.value)} type= 'date' className='form-control' rows='3'  value={deadline && deadline}></input>
                        </div>
                        <div className='col-6'>
                            <label>Hora do prazo final:</label>
                            <input onChange={(e) => setTime(e.target.value)} type= 'time' className='form-control' rows='3'  value={time && time}></input>
                        </div>
                    </div>
                    
                    {
                        id ?
                        <div className='my-2 col-6'>
                                <label>Tarefa criada por: {email}</label>
                        </div> : ''
                    }
                    {
                        id && userUpdate?
                        <div className='my-2 col-6'>
                                <label>Tarefa atualizado por: {userUpdate}</label>
                        </div> : ''    
                    }
                    {
                        state !== 1 && loading == 0 ?    
                        <>
                            <>
                                {
                                    id ? 
                                    <div className='text-center my-3'>
                                        <a onChange={conclude} className="btn btn-primary btn-sm btn-to-file col-6" href="/home">Concluir</a> 
                                        <a onChange={taskDelete} className="btn btn-danger btn-sm btn-delete col-6" href="/home">Excluir</a>
                                    </div> : ''
                                }
                            </>
                            {
                                (userEmail !== email && blocked === 0) || (userEmail === email) ? 
                                <div className='text-center'>
                                    <a  onClick={id ? update : register} type='button' className='btn col-6 btn-lg btn-block mt-3 btn-cadastro'>{id ? 'Atualizar Evento' : 'Publicar Evento'}</a>
                                </div> : ''
                            }   
                            {
                                userEmail === email ? 
                                <div>
                                    <div className='text-center'>
                                        <a onClick={blocked === 0 ? block : unlock} type='button' className='btn col-1 btn-lg btn-block mt-3 btn-cadastro'>{blocked === 0 ? <i class="fa-solid fa-lock"></i> : <i class="fa-solid fa-unlock"></i>}</a>
                                    </div> 
                                </div>
                                : ''                            
                            }
                        </> 
                        : state == 1 && loading == 0 ? <div className="d-flex justify-content-center">
                            <div className="spinner-border text-warning" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                          </div> : ''
                    }
                </form>

                <div className="message-login text-center mt-2">
                    { messageType === 'success' && 
                        <span>
                            <strong>WoW!</strong>
                            Cadastrado com sucesso!
                        </span>
                    }
                    { messageType === 'error' && 
                        <span>
                            <strong>Ops!</strong>
                            Não foi possível cadastrar!
                        </span>
                    }   
                </div>
            </div>
        </>
       
    )
}

export default RegisterThingsToDo;