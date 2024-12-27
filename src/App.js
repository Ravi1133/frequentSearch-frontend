import logo from './logo.svg';
import './App.css';
import AddForm from './UserForm/AddForm';
import { Route, Routes } from 'react-router-dom';
import UserList from './UserForm';
function App() {
  return (
    <div className="App">

      <Routes>

        <Route path='/' element={<AddForm/>}></Route>
        <Route path='/UserList' element={<UserList/>}></Route>

      </Routes>
        
    </div>
  );
}

export default App;
