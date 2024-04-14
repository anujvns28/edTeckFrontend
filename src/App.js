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
import EnrolledCourses from './component/core/dashboard/EnrolledCourses';
import Cart from './component/core/dashboard/Cart/Cart';
import Setting from './component/core/dashboard/setting/Setting';
import OpenRoute from './component/core/auth/OpenRoute';
import PrivateRoute from './component/core/auth/PrivateRoute';
import AddCourse from './component/core/dashboard/addCourse';
import MyCourses from './component/core/dashboard/InstructorCourses/MyCourses';
import EditCourse from './component/core/dashboard/EditCourse/EditCourse';
import Catlog from './pages/Catlog';
import CouseDetails from './pages/CouseDetails';
import ViewCourse from './pages/ViewCourse';
import VideoSection from './component/core/viewCourse/VideoSectionSidebar';
import VideoDetail from './component/core/viewCourse/VideoDetail';


function App() {
  return (
    <div className="flex min-h-screen w-screen flex-col bg-richblack-900 font-inter">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />

        <Route
          path='/login'
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          } />

        <Route
          path='/signup'
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />

        <Route
          path='/verify-email'
          element={
            <OpenRoute>
              <VeryfiEmail />
            </OpenRoute>
          } />

        <Route
          path='/forgot-password'
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          } />

        <Route
          path='update-password/:token'
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          } />

        <Route 
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } >
          <Route path='/dashboard/My-profile' element={<MyProfile />} />
          <Route path='/dashboard/enrolled-courses' element={<EnrolledCourses />} />
          <Route path='/dashboard/cart' element={<Cart />} />
          <Route path='/dashboard/settings' element={<Setting />} />


          <Route path='dashboard/add-course' element={<AddCourse/>} />
          <Route path='dashboard/my-courses' element={<MyCourses/>} />
          <Route path='dashboard/edit-course/:courseId' element={<EditCourse/>} />
        </Route>

        <Route path='/catalog/:catlogName' element={<Catlog/>} />
        <Route path='/courses/:couseId' element={<CouseDetails/>} />


        <Route element={<ViewCourse/>} >
          <Route  path="view-course/:courseId/take"
          element={<VideoDetail/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
