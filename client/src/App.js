
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css';
import Navbar from './components/Navbar';
import Signin from './components/Routes/Signin';
import Signup from './components/Routes/Signup';
import Profile from './components/Routes/Profile';
import Home from './components/Routes/Home';
import CreatePost from './components/Routes/CreatePost';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import Feeds from './components/Routes/Feeds';
import PrivateRoutes from './components/features/PrivateRoutes';
import UserProfile from './components/Routes/UserProfile';


const Routing = () => {

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/home' element={<PrivateRoutes />}>

        <Route path='/home/feeds' element={<Feeds />} />
        <Route path='/home/profile' element={<Profile />} />
        <Route path='/home/feeds/:userId' element={<UserProfile />} />
        <Route path='/home/create' element={<CreatePost />} />
      </Route>
      <Route path='/signin' element={<Signin />} />
      <Route path='/signup' element={<Signup />} />



    </Routes>
  )
}
function App() {


  return (
    <>

      <BrowserRouter>
        <Navbar />
        <ToastContainer />
        <Routing />
          </BrowserRouter>

    </>
  );
}

export default App;
