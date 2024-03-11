import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Navbar from './component/common/Navbar';
import Signup from './pages/Signup';
import Login from './pages/Login';

function App() {
  return (
    <div className="flex min-h-screen w-screen flex-col bg-richblack-900 font-inter">
      <Navbar/>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>} />
      <Route path='/signup' element={<Signup/>} />
     </Routes>
    </div>
  );
}

export default App;
