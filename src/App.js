import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from "react-router-dom";
import { Login } from './componetns/login/Login';
import { Signup } from './componetns/signup/Signup';
import SessionContext from './context/SessionContext';


function App() {
  return (<>
    <Router>
      <SessionContext>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
        </Routes>
      </SessionContext>
      </Router>
  </>
    
  )
}

export default App;
