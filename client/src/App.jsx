import './App.css'
import UserForm from './components/UserForm'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import UserList from './components/UserList';
import Register from './components/Register';
import User from './components/User';
import LogOut from './components/LogOut';
import { useEffect, useState } from 'react';

function App() {
const logedIn = localStorage.getItem('isLogedIn');
const [stateLoged,setStateLoged] = useState(false)
useEffect(()=>{
console.log("testtt")

},[stateLoged])

  return (
   <div>
   <BrowserRouter>
    <LogOut setStateLoged={setStateLoged} stateLoged={stateLoged}></LogOut>
   { logedIn  ? 
     <Routes>
            
     <Route element={<Register setStateLoged={setStateLoged} stateLoged={stateLoged}/>} path="/register" default />
<Route element={<UserForm/>} path="/" default /> //adding the default makes this the default path
<Route element={<UserList/>} path="/users" default /> //adding the default makes this the default path
<Route element={<User/>} path="/users/:id" default /> //adding the default makes this the default path

     </Routes>
   
   
   : 
   <Routes>
            
            <Route element={<Register setStateLoged={setStateLoged}/>} path="/register" default />
	    <Route element={<Register setStateLoged={setStateLoged}/>} path="/" default /> //adding the default makes this the default path
      <Route element={<Register setStateLoged={setStateLoged}/>} path="/users" default /> //adding the default makes this the default path
      <Route element={<Register setStateLoged={setStateLoged}/>} path="/users/:id" default /> //adding the default makes this the default path
  
            </Routes>
   
   }
            
    	</BrowserRouter>
   </div>
  )
}

export default App
