import React, { useState } from 'react'
import axios from 'axios';

const LogOut = ({stateLoged,setStateLoged}) => {
  
    const logOutFunc = ()=>{
        axios.post('http://localhost:8000/api/logout', {}, {withCredentials: true})
        .then(res =>  {localStorage.removeItem('isLogedIn'); setStateLoged(false)})
        .catch(err=> alert("coc nuk shkoj mir"))
    }
    return (
      <input type="button" value={"logout"} onClick={logOutFunc} />
    )
}
export default LogOut;

