import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './components/Home';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import AddCar from './components/AddCar';
import UpdateCar from './components/UpdateCar';

function App() {
  return (
    <Router>
      <Routes>
        <Route excat path='/' element={<Home />} />
        <Route excat path='/SignUp' element={<SignUp />} />
        <Route excat path='/SignIn' element={<SignIn />} />
        <Route excat path='/AddCar' element={<AddCar />} />
        <Route excat path='/UpdateCar/:id' element={<UpdateCar />} />
      </Routes>
    </Router>
  );
}

export default App;
