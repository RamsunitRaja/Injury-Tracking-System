import './App.css';
import Nav from './components/NavBar';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './components/Login';
import PrivateComponent from './components/PrivateComponent'
import ReportList from './components/ReportList';
import UpdateReport from './components/UpdateReport';
import Profile from './components/Profile';
import CreateReport from './components/CreateReport';
import LogoutButton from './components/Logout';
function App() {
  return (
    <div className="App">
      <BrowserRouter >
      <Nav />
      <Routes>

      {/* private components which are only visible when user is signed in */}
      <Route element={<PrivateComponent/>} >
      <Route path='/' element={<ReportList/>} />
      <Route path='/createReport' element={<CreateReport/>} />
      <Route path='/update/:id' element={<UpdateReport/>} />
      <Route path='/logout' element={<LogoutButton/>} />
      <Route path='/profile' element={<Profile/>} />
      </Route>
       {/* private components which are only visible when user is signed in */}



      {/* NOT private components which are always visible*/}
      <Route path="/login" element={<Login/>} />
      {/* NOT private components which are always visible*/}


      </Routes> 
     </BrowserRouter>
    </div>
  );
}

export default App;
