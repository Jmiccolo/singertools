const db = require("../models");
const songList = require("./Songlist");

function Seed(){
    songList.forEach((song, index)=>{
        song.text = song.text.replace(/\n/g, " <br/> ").split(" ");
        db.Title.create({...song, creator:"5fe4bb6b125df1523ccfdaba"})
            .then(title => {
                console.log("Title Created", index)
                db.Song.create({title:title})
                    .then(song=>{
                        song.text = title.text;
                        song.user = title.creator;
                        song.save();
                        console.log("Song Created", index);
                    })
                    .catch(err=>{
                        console.log(err);
                    })
            })
            .catch(err=>{
                console.log(err);
            })
    })
}

Seed();