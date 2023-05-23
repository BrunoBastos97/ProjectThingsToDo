import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import {store, persistor} from '../src/store/';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";


/* PAGES */
import Login from './view/login';
import Home from './view/home';
import RegisterThingsToDo from './view/register-things-to-do';
import RegisterUser from './view/register-user';

function App(){
  return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <Routes>
              <Route exact path='/' Component={Login}></Route>
              <Route exact path='/home' Component={Home}></Route>
              <Route exact path='/registerthingstodo' Component={RegisterThingsToDo}></Route>
              <Route exact path='/task/:id' Component={RegisterThingsToDo}></Route>
              <Route exact path='/registeruser' Component={RegisterUser}></Route>
            </Routes>
          </BrowserRouter>
        </PersistGate>
      </Provider>
  );
}

export default App;
