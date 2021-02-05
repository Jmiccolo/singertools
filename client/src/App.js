import React, {useState} from 'react';
import axios from "axios";
import './App.css';
import Dashboard from "./Dashboard";
import Song from "./Song"

const App = ()=>{
  const [singer, setSinger]= useState("5fe4bb6b125df1523ccfdaba");
  const [song, setSong] = useState("");
  function changeSong(e){
      axios["get"](`/api/song/${e.target.value}`)
      .then(res=> setSong(res.data));
  }
  if(song){
    return(
      <>
      <Song song={song} changeSong={changeSong} setSong={setSong} />
      </>
    )
  } 
  else{

  }
  return (
    <>
      <Dashboard singer={singer} setSinger={setSinger} changeSong={changeSong} setSong={setSong}/>
    </>
  );
}

export default App;
