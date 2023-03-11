
import './App.css';
import{BrowserRouter,Routes, Route,Navigate} from 'react-router-dom';
import Home from './Page/Home';
import Login from './Page/Login';
import Signup from './Page/Signup';
import Createpost from './Page/Createpost';
import Userprofile from './Page/Userprofile';
import Updateprofile from './Components/Updateprofile';
function App() {
  let user=null;
  if(localStorage.length>0){
      user=localStorage.getItem('user');
  }
  return (
    <BrowserRouter>
    <div className="app">
   <Routes>
   <Route path="/" element={user ? <Home/> : <Navigate to= "/login" />} />
   <Route   path="/login"  element={!user? <Login /> : <Navigate to="/" />} />
 <Route  path="/signup"  element={!user ? <Signup /> : <Navigate to="/" />} />
    <Route path="/createpost" element={<Createpost/>}/>
    <Route path="/profile/:postuserid/:userid" element={<Userprofile/>}/>
    <Route path="/updateprofile/:userid" element={<Updateprofile/>}/>
   </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
