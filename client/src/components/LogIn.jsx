import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const LogIn = ({setStateLoged}) => {
    const navigate= useNavigate()
    //keep track of what is being typed via useState hook

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const [val,setVal]= useState({})

    
    //handler when the form is submitted
    const onSubmitHandler = (e) => {
        //prevent default behavior of the submit
        e.preventDefault();
        //make a post request to create a new person
        axios.post('http://localhost:8000/api/login', {
        
                email,
                password,
             
        },{withCredentials:true})
            .then(res=>{
                console.log(res); // always console log to get used to tracking your data!
                console.log(res.data);

setVal({})
localStorage.setItem('isLogedIn', true);
setStateLoged(true)
navigate("/users")
            })
            .catch(err=>{ console.log(err);err.response.data.errors? setVal(err.response.data.errors): console.log(err)})
    }
    
    return (
        <form onSubmit={onSubmitHandler}>
            <p>Log in</p>
            <p> 
            { val.email? <p>{val.email.message}</p> : "" }
                <label>Email</label><br/>
                <input type="text" onChange = {(e)=>setEmail(e.target.value)}/>
            </p>
            <p>
            { val.password? <p>{val.password.message}</p> : "" }
                <label>Password</label><br/>
                <input type="text" onChange = {(e)=>setPassword(e.target.value)}/>
            </p>

            <input type="submit"/>
        </form>
    )
}
export default LogIn;

