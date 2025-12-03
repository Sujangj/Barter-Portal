// import React, {useState} from "react";
// import { data } from './data'
// const url = "https://api.github.com/users";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Home';
import About from './About';
import Contact from "./Contact";
import Error from "./Error";



//To use State in React we use useState -> Hook
//useState is a function
//useState function is an array that conatins 2 values -> 1. undefined, 2. function

function App(){
  // const value = useState();
  // console.log(value);

//   const[Text, conversion] = useState("Chicken");
//   function handleClick(){
//    if(Text == "Chicken"){
//     conversion("Egg");
//    }else{
//     conversion("Chicken");
//    }
//   }
//   return(
//     <>
//        <h1>{Text}</h1>   
//        <button type="submit" onClick = {handleClick}>Click me</button>
//     </>
//   );
// }

//Array of objects with useState

// function App(){
  // const [teams, setTeam] = useState(data);
  
  // function clearTeams(){
  //   setTeam([]);
  // }
  
  // function handleClick(){
  //   if(teams === data){
  //     setTeam([]);
  //   }else{
  //     setTeam(data);
  //   }
  // }
  //useEffect function

  // const [count, setItem] = useState(0);
  // const [gUsers, setgUsers] = useState([]);

  // async function getData(){
  //   const response = await fetch(url);
  //   const users = await response.json();
  //   setgUsers(users);
  // }

  // useEffect(()=>{
  //   getData();
  // }, []); //Initial render
  
  // function setIncrement(){
  //   setItem(count + 1);
  // }

  //Multiple returns
  //Conditional rendering

  // const[loading, setLoading] = useState(1);


//   if(loading){
//   return (
//     <>
//       <h1>LifeGoesOn</h1>
//     </>
//   );
// }

//short circuit evaluation

// const [text, setText] = useState("");

// const firstValue = text || "Trinity";
// const secondValue = text && "MG Road";


//ternary operator
// const [text, setText] = useState("");
// const [showModal, setShowModal] = useState(false);

// function clickHandle(){
//   setShowModal(!showModal);
// }

//Forms -> value and onCahange are the two main attributes.

// const [name, setName] = useState("");
// const [age,setAge] = useState("");

// function handleClick(e){
//   e.preventDefault();
//   console.log(name, age);
// }

// function handleChangeName(e){
//   setName(e.target.value);
// }

// function handleChangeAge(e){
//   setAge(e.target.value);
// }
    return(
//       <>
//         <h1>{firstValue}</h1>
//         <h2>value :{secondValue}</h2>
//       </>
//     );
    <>
       {/* {teams.map((team)=>{
        return(
          <div key={team.id}>
            <h4>{team.name}</h4>
          </div>
        )
       })}
       <button type="submit" onClick={handleClick}>Clear</button>
        */}
        {/* <h1>{count}</h1>
        <button onClick={setIncrement}>Click</button> */}


        {/* {gUsers.map((gUser)=>{
          return <li>{gUser.login}</li>
        })} */}

        {/* {text ? <h1>Good</h1> : <h1>Bad</h1>} 
        <button type="submit" onClick={clickHandle}>Click me</button>
        {showModal && <h1>clear all</h1>} */}

        {/* <form onSubmit = {handleClick}>
          <label htmlFor='name'>Name</label>
          <input type ='text' 
                 id = 'name'
                 name = 'name'
                 value = {name}
                 onChange = {handleChangeName} />
          <label htmlFor='age'>Age</label>
          <input type ='number' 
                 id = 'age'
                 age = 'age'
                 value = {age}
                 onChange = {handleChangeAge} />
          <button type="submit">submit</button>
        </form> */}



       <Router>
         <Routes>
           <Route path="/" element={<Home />} />
           <Route path="/about" element={<About />} />
           <Route path="/contact" element={<Contact />} />
           <Route path="*" element={<Error />} />
         </Routes>
       </Router>   

    </>
  );

}

export default App;