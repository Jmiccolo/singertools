import React, {useState, useEffect} from 'react';
import axios from "axios";
const Dashboard = (props) => {
    const singer = props.singer;
    const [songList, setSongList] = useState([])
    const [globalSongs, setGlobalSongs] = useState([]);
    const addSong = (e)=>{
        console.log(e.target.value);
        axios['put'](`/api/singer/${singer}/addSong`, {id:e.target.value})
        .then(res=> console.log(res.data))
        .catch(err => console.log(err));
    }
    useEffect(function(){
        axios["get"]("/api/song/").then(res=>{
            let newSongs = res.data.map(song=>{
            return(
                <tr key={song._id}>
                    <td>{song.title}</td>
                    <td>{song.composer}</td>
                    <td>{song.key}</td>
                    <td>{song.range}</td>
                    <td><button value={song._id} onClick={addSong}>Add Me</button></td>
                </tr>
            )
            });
            setGlobalSongs(newSongs);
        })
    },[])
    useEffect(function(){
         axios["get"](`/api/singer/${singer}/songs`).then(res=>{
            let singerSongs = res.data.map(song=>{
                return (
                    <tr key={song._id}>
                        <td><button value={song._id} onClick={props.changeSong}>{song.title}</button></td>
                        <td>{song.composer}</td>
                        <td>{song.key}</td>
                        <td>{song.range}</td>
                        <td><progress value={song.learned.all} max="100"></progress></td>
                    </tr>
                )
            })
            setSongList(singerSongs)
        }).catch(err=> console.log(err));
    },[singer])
    return (
        <>
          <header>
            <nav className="navbar">
                <a className="navbar-header" href="/">SingerTools</a>
                <ul className="navbar-list">
                    <li className="navbar-list-item">
                        <a className="navbar-link"href="/profile">Profile</a>
                    </li>
                    <li className="navbar-list-item">
                        <a className="navbar-link"href="/songs">Songs</a>
                    </li>
                    <li className="navbar-list-item">
                        <a className="navbar-link"href="/logout">Logout</a>
                    </li>
                </ul>
            </nav>
          </header>
          <main>
            <section>
                <h2>Your Songs</h2>
                <table>
                     <thead>
                        <tr>
                            <th>Title</th>
                            <th>Composer</th>
                            <th>Key</th>
                            <th>Range</th>
                            <th>Learned</th>
                        </tr>
                    </thead>
                    <tbody>
                        {songList}
                    </tbody>
                </table>
            </section>
            <section>
                <h2>Find Songs You Want To Sing</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Composer</th>
                            <th>Key</th>
                            <th>Range</th>
                            <th>Add Song</th>
                        </tr>
                    </thead>
                    <tbody>
                         {globalSongs}
                    </tbody>
                </table>
            </section>
          </main>
        </>
    );
};

export default Dashboard;