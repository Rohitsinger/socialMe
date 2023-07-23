import React,{useEffect,createContext,useReducer,useContext} from 'react';
import {BrowserRouter,Routes,Route, useNavigate} from 'react-router-dom'

import './App.css';
import Navbar from './components/Navbar';
import Signin from './components/Routes/Signin';
import Signup from './components/Routes/Signup';
import Profile from './components/Routes/Profile';
import Home from './components/Routes/Home';
import CreatePost from './components/Routes/CreatePost';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import Feeds from './components/Routes/Feeds';
import PrivateRoutes from './components/features/PrivateRoutes';


const Routing=()=>{

  return(
    <Routes>
         <Route  path='/home' element={<Home />}/>
       <Route exact path='/' element={<PrivateRoutes/>}>
     
          <Route   path='/feeds' element={<Feeds />}/>
      
       </Route>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/create' element={<CreatePost/>}/>
     
    </Routes>
  )
}
function App() {

  // const [state,dispatch]= useReducer(reducer,initialState)
  // axios.defaults.baseURL = 'http://localhost:5000/';
  // axios.defaults.withCredentials = true;
 
  return (
    <>
   {/* <UserContext.Provider  */}
  {/* //  value={{state,dispatch}} */}
   {/* > */}
    <BrowserRouter>
    <Navbar/>
    <ToastContainer/>
       <Routing/>
       
    </BrowserRouter>
    {/* </UserContext.Provider> */}
    </>
  );
}

export default App;
