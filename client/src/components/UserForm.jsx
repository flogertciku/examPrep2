import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const UserForm = () => {
    const navigate= useNavigate()
    //keep track of what is being typed via useState hook
    const [name, setName] = useState(""); 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [role, setRole] = useState("");
    const [belt, setBelt] = useState(false);
    const [degree, setDegree] = useState(false);
    const [val,setVal]= useState({})
    //handler when the form is submitted
    const onSubmitHandler = (e) => {
        //prevent default behavior of the submit
        e.preventDefault();
        //make a post request to create a new person
        axios.post('http://localhost:8000/api/users', {
                name,
                email,
                password,
                imgUrl,
                role,
                belt,
                degree
        })
            .then(res=>{
                console.log(res); // always console log to get used to tracking your data!
                console.log(res.data);

setVal({})
navigate("/users")
            })
            .catch(err=>{ console.log(err);err.response.data.errors? setVal(err.response.data.errors): console.log(err)})
    }
    
    return (
        <form onSubmit={onSubmitHandler}>
            <p> 
                { val.name? <p>{val.name.message}</p> : "" }
                <label>Name</label><br/>
                {/* When the user types in this input, our onChange synthetic event 
                    runs this arrow function, setting that event's target's (input) 
                    value (what's typed into the input) to our updated state   */}
                <input type="text" onChange = {(e)=>setName(e.target.value)}/>
            </p>
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
            <p>
            { val.imgUrl? <p>{val.imgUrl.message}</p> : "" }
                <label>Image</label><br/>
                <input type="text" onChange = {(e)=>setImgUrl(e.target.value)}/>
            </p>
            <p>
            { val.role? <p>{val.role.message}</p> : "" }
                <label>Role</label><br/>
                <select name="" onChange = {(e)=>setRole(e.target.value)} id="" >
                    <option value={""}>Select</option>
                    <option value={"student"}>student</option> 
                    <option value={"teacher"}>teacher</option>          
                </select>
           
            </p>
            <p>
                <label>Belt Exam</label><br/>
                <input type="checkbox" onChange = {(e)=>setBelt(e.target.checked)}/>
            </p>
            <p>
                <label>Degree</label><br/>
                <input type="checkbox" onChange = {(e)=>setDegree(e.target.checked)}/>
            </p>
            <input type="submit"/>
        </form>
    )
}
export default UserForm;

