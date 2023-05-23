import React, { useState, useEffect } from 'react';
import './home.css'; 
import Navbar from '../../components/navbar';
import TaskCard from '../../components/task-card/';
import db from '../../config/firebase';
import { collection, onSnapshot } from "firebase/firestore";

function Home(){
    const [tasks, setTasks] = useState([]);
    const listTask = [];
    const colletionRef = collection(db, 'tasks');
    const [search, setSearch] = useState(''); 
    const [searchState, setSearchState] = useState(0);

    useEffect(() => {

        onSnapshot(colletionRef,async (querySnapshot) => { 
            await querySnapshot.forEach((doc) => {
                if(searchState == 0 && doc.data().userMaster.indexOf(search) == 0){
                    listTask.push({
                        id: doc.id,
                        ...doc.data()
                    })
                }else if((doc.data().userMaster.indexOf(search) == 0 && doc.data().state == searchState)){
                    listTask.push({
                        id: doc.id,
                        ...doc.data()
                    })

                }else if((doc.data().userMaster.indexOf(search) == 0 && (searchState == 2 && doc.data().state == 0))){
                    listTask.push({
                        id: doc.id,
                        ...doc.data()
                    })
                }
            });
            setTasks(listTask);
            })
            
    })

    return(
        <>
            <Navbar></Navbar>  
            <div className="btn-group p-3">
                <select value={searchState} onChange={(e) => setSearchState(e.target.value)} className="form-control" >
                        <option disabled selected value>-- Selecione o filtro --</option>
                        <option value={0}>Todas as tarefas</option>
                        <option value={1}>Todas as tarefas finalizadas</option>
                        <option value={2}>Todas as tarefas pendentes</option>
                </select> 
                <input className="form-control mr-sm-2" onChange={(e) => setSearch(e.target.value)} type="search" placeholder="Pesquisar por usuário" aria-label="Search"></input>
            </div>

            <div className='row p-3'>
                {tasks.map((task) => (
                    <TaskCard key={task.id} id={task.id} title={task.title} description={task.description} deadline={task.deadline} userMaster={task.userMaster} blocked={task.blocked} state={task.state}></TaskCard>
                ))} 
            </div>
        </>  
    );
}

export default Home;