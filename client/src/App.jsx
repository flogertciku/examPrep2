import './App.css'
import UserForm from './components/UserForm'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import UserList from './components/UserList';
import User from './components/User';

function App() {


  return (
   <div>
   <BrowserRouter>
            <Routes>
	    <Route element={<UserForm/>} path="/" default /> //adding the default makes this the default path
      <Route element={<UserList/>} path="/users" default /> //adding the default makes this the default path
      <Route element={<User/>} path="/users/:id" default /> //adding the default makes this the default path
  
            </Routes>
    	</BrowserRouter>
   </div>
  )
}

export default App
