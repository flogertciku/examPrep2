import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {useParams} from "react-router-dom";
const User = (props) => {
    const [person, setPerson] = useState({})
    const {id} = useParams(); 
    const [degree,setDegree2]=useState(false)
    useEffect(() => {
        axios.get("http://localhost:8000/api/people/" + id)
            .then( res => {
                console.log(res.data);
                setPerson(res.data);
            })
            .catch( err => console.log(err) );
    }, []);
    const setDegree= ()=>{
        console.log(person)
        axios.patch('http://localhost:8000/api/people/' + id, {
            ...person ,
            degree:degree // this is shortcut syntax for firstName: firstName,
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
            <input type='checkbox' checked={person.degree} onChange={e=>{setPerson(prev=>({...prev,degree:e.target.checked}));setDegree2(e.target.checked) ;setDegree();console.log(e.target.checked)}}></input>
        </div>
    );
}
export default User;

