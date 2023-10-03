import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
const UserList = (props) => {
    /* We deconstruct getter and setter which were passed down 
    via props by the parent component (app.js) to our child 
    component (PersonList.js). Now we can easily use the getter 
    and setter without having to write props.getter or props.setter every time: */
    const [people, setPeople] = useState([]);
    const [updated,setUpdated]= useState(false)
    const [order,setOrder]=useState("name")
    const [filter,setFilter]=useState("")
    
    useEffect(()=>{
    	axios.get("http://localhost:8000/api/people",{withCredentials:true})
    	.then((res)=>{
	    console.log(res.data);
            setPeople(res.data);
	})
    	.catch((err)=>{
            console.log(err);
    	})
    }, [updated])
    const handleDelete=(id)=>{
        axios.delete("http://localhost:8000/api/people/"+id,{withCredentials:true})
    	.then((res)=>{
	    console.log(res.data);
            setUpdated(!updated)
	})
    	.catch((err)=>{
            console.log(err);
    	})
    }

    
    return (
        <div>
            {/* {JSON.stringify(people)} */}
            <input onChange={e=>setFilter(e.target.value)} type='text' placeholder='Search by name or email '/>  
            <button onClick={e=>setOrder("name")}>Sort By Name</button> <button onClick={e=>setOrder("email")} >Sort By email</button>
            {people &&
                people.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()) || person.email.toLowerCase().includes(filter.toLowerCase())).sort((a,b)=>a[order].toLowerCase().localeCompare(b[order].toLowerCase())).map((person, index)=>{
                return <p key={index}> <Link to={`/users/${person._id}`}>{person.name}</Link> , {person.email} <img src={person.imgUrl} width={50}height={50}></img> {person.role === "teacher" ? <p>{person.role}</p> :""  } <button onClick={e=> handleDelete(person._id)}>Delete</button> </p>
                })
            }
        </div>
    )
}
export default UserList;

