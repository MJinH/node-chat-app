import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import MainPage from "./components/MainPage" 
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import { AuthContextProvider } from './authContext/AuthContext';


function App() {
  return (
    <AuthContextProvider>
        <Router>
          <Routes>
            <Route exact path="/" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/:username" element={<MainPage/>} />
          </Routes>
      </Router>
    </AuthContextProvider>

  );
}

export default App;
