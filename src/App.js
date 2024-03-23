import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Navbar from './component/common/Navbar';
import Signup from './pages/Signup';
import Login from './pages/Login';
import VeryfiEmail from './pages/VeryfiEmail';
import ForgotPassword from './pages/ForgotPassword';
import UpdatePassword from './pages/UpdatePassword';
import About from './pages/About';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import MyProfile from './component/core/dashboard/MyProfile';


function App() {
  return (
    <div className="flex min-h-screen w-screen flex-col bg-richblack-900 font-inter">
      <Navbar/>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/verify-email' element={<VeryfiEmail/>} />
      <Route path='/forgot-password' element={<ForgotPassword/>} />
      <Route path='update-password/:token' element={<UpdatePassword/>} />
      <Route path='/about' element={<About/>} />
      <Route path='/contact' element={<Contact/>} />

      <Route element={<Dashboard/>} >
      <Route path='/dashboard/My-profile' element={<MyProfile/>} />
    
      </Route>
     </Routes>
    </div>
  );
}

export default App;
