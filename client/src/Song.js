import React from 'react';

const Song = (props) => {
    let song = props.song;
    let text = song.text.map((word,index)=>{
        if(word !== "<br>"){
            return <span key={index}>{word} </span>
        }
        else{
            return <br key={index}/>
        }
    })
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
                <h2>{song.title}</h2>
                <h3>Composer-{song.composer}</h3>
                <h3>Key-{song.key}</h3>
                <p>
                    {text}
                </p>
            </section>
          </main>
        </>
    );
};

export default Song;