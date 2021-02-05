import React from 'react';

const Song = (props) => {
    let song = props.song;
    let showBeats = (e) => {
        e.target.querySelector("span").style.visibility = "visible";
    }
    let hideBeats = (e) => {
        e.target.querySelector("span").style.visibility = "hidden";
    }
    let text = song.text.map((word,index)=>{
        if(word !== "<br/>"){
            return <span style={{position: "relative"}} onMouseEnter={showBeats} onMouseLeave={hideBeats} key={index}>{word} <span style={{position: "absolute", bottom:"100%", left:"0%", background:"white", visibility:"hidden"}}>BEATBOX!</span></span>
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
                <h2>{song.title.title}</h2>
                <h3>Composer-{song.title.composer}</h3>
                <h3>Key-{song.title.key} </h3>
                <p style={{fontSize:"25px", lineHeight:"1.2"}}>
                    {text}
                </p>
            </section>
          </main>
        </>
    );
};

export default Song;