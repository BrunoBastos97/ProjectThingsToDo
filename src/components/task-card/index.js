import React, { useState } from 'react';
import './task-card.css';
import {Link} from 'react-router-dom';
import {
    doc,
    updateDoc,
    deleteDoc,
    collection,
  } from 'firebase/firestore';
  import db from '../../config/firebase';

import { useSelector } from 'react-redux';

function TaskCard({id, title, description, deadline, userMaster, blocked, state}){
    const [loading, setloading] = useState('');
    const userEmail = useSelector(state => state.userEmail);
    const colletionRef = collection(db, 'tasks');
    const date = new Date().toISOString().substr(0, 10);

    function conclude(){
        setloading(1);
        try {
            const taskRef = doc(colletionRef, id);
            updateDoc(taskRef, {
                state: 1 
            }).then(() => {
                setloading(0);
            });
          } catch (error) {
            setloading(0);
          }    
    }

    function taskDelete(){
        setloading(1);
        try {
            const schoolRef = doc(colletionRef, id);
            deleteDoc(schoolRef, schoolRef);
            setloading(0);
        } catch (error) {
            setloading(0);
        }
    }

    return(
       
        <div className='col-md-3 col-sm-12'>
            <h5></h5>
            <div className="card">  
                {
                    deadline <= date && state != 1 ? 
                      <h5 className="card-header text-white bg-danger">{title}</h5>
                    : deadline >= date && state != 1 ? <h5 className="card-header text-white bg-warning">{title}</h5>
                    : <h5 className="card-header text-white bg-success">{title}</h5> 
                }

            

                <div className="card-body">
                    <h6>{deadline}</h6>
                    <h6 className="card-title">{userMaster}</h6>
                    <p className="card-text">{description}</p>
                    {   
                        (userMaster === userEmail && blocked === 1) || (blocked === 0) ?
                        <div className='row d-flex align-items-center'>
                            <a href="#" className="btn btn-primary btn-sm btn-to-file col-6" onClick={conclude}>Concluir</a>
                            <a href="#" className="btn btn-danger btn-sm btn-delete col-6" onClick={taskDelete}>Excluir</a>
                        </div> : ''
                    }
                    <div className='row p-2 text-center rodape-card'>
                        <div className='col-12'>
                            <Link to={'/task/'+id}  className="btn rodape-card-btn btn-info btn-sm btn-to-view col-md-9">Visualizar</Link>    
                        </div>   
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default TaskCard;