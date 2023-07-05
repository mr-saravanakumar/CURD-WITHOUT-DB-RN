import {useState,useEffect} from 'react';
import axios from 'axios';

function App() {

  const [name,setName]=useState("");
  const [age,setAge]=useState(0);
  const [msg,setMsg]=useState("");
  const [data,setData]=useState([]);
  // const [deleteData,setDeleteData]=useState("");

  useEffect(()=>{
    axios.get("http://localhost:3001/fetchdata")
    .then((response)=>{
      setData(response.data);
      console.log(data.indexOf(response.data))
    }).catch((error)=>{
      console.log(error);
    })

  },[]);

  const submit=()=>{
      if(!name)
      {
        setMsg("Please enter a name");
      }
      else
      {
      axios.post("http://localhost:3001/insert",{
        name,
        age
      }).then((response)=>{
         setMsg(response.data.message);
         console.log(response.data.message);
      }).catch(err=>{
        console.log(err);
      })
    }
    }

    const DeleteData=(d)=>{
    console.log(d);
    axios.delete(`http://localhost:3001/delete/${d}`,{
    }).then(response=>{
      setMsg(response.data.message);
    }).catch((err)=>{
      console.log(err);
    })
    }

    const updateData=(id)=>{
      const newdata=window.prompt("enter data:");
      if(!newdata){
        setMsg("need an data..");
      }
      else{
      axios.put("http://localhost:3001/update",{
       id,
       newdata,
      }).then((response)=>{
        setMsg(response.data.message);
      }).catch(err=>{
       console.log(err);
      })
    }
    }


  return (
    <div className="App">
      <div >
      <input type='text' onChange={(e)=>{setName(e.target.value)}}/><br/>
      <input type='number' onChange={(e)=>{setAge(e.target.value)}}/><br/>
      <p>{msg}</p><br/>
      <button onClick={submit}>SUBMIT</button>
      </div>
      <div>
      {
        data.map((datas,i)=>{
          return <div>
           <p>{datas.name}</p>
           <p>{datas.age}</p>
           <p>{i}</p>
           <button onClick={()=>updateData(i)}>Update</button>
           <button onClick={()=>DeleteData(i)}>delete</button>
          </div>
        })
      }
      </div>
    </div>
  );
  }

export default App;
