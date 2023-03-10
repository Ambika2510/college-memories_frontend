
import './App.css';
import{BrowserRouter,Routes, Route} from 'react-router-dom';
import Home from './Page/Home';
import Login from './Page/Login';
import Signup from './Page/Signup';
import Createpost from './Page/Createpost';
import Userprofile from './Page/Userprofile';
import Updateprofile from './Components/Updateprofile';
function App() {
  return (
    <BrowserRouter>
    <div className="app">
   <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/createpost" element={<Createpost/>}/>
    <Route path="/profile/:postuserid/:userid" element={<Userprofile/>}/>
    <Route path="/updateprofile/:userid" element={<Updateprofile/>}/>
   </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
