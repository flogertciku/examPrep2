import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {useParams} from "react-router-dom";
const User = (props) => {
    const [person, setPerson] = useState({})
    const {id} = useParams(); 
    // const [degree,setDegree2]=useState(false)
    useEffect(() => {
        axios.get("http://localhost:8000/api/people/" + id)
            .then( res => {
                console.log(res.data);
                setPerson(res.data);
            })
            .catch( err => console.log(err) );
    }, []);
    const handleChange= (vleraNdryshuar)=>{
        console.log(person)
        axios.patch('http://localhost:8000/api/people/' + id, {
            // lastName: lastName ,email:email ,belt:e.target.checked
            ...person,...vleraNdryshuar// this is shortcut syntax for firstName: firstName,
                  // this is shortcut syntax for lastName: lastName
        })
            .then(res => {
                console.log(res);
                // navigate("/home"); // this will take us back to the Main.js
            })
            .catch(err => console.log(err))

    }
    return (
        <div>
            <p>First Name: {person.name}</p>
            <p>Last Name: {person.email}</p>
            <label htmlFor="">Degree</label>
            <p>{JSON.stringify(person.degree)}</p>
            <p>Degree</p><input type='checkbox' checked={person.degree} onChange={e=>{setPerson({...person,degree:e.target.checked}) ;handleChange({degree:e.target.checked})}}></input><br></br>
           <p>Belt: </p> <input type='checkbox' checked={person.belt} onChange={e=>{ setPerson({...person,belt:e.target.checked});handleChange({belt:e.target.checked})}}></input>
        
        </div>
    );
}
export default User;

