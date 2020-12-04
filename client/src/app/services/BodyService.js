import frontEnd from "../frontend";
import {FormService} from "./FormService";

export function BodyService(props){
    let {signin, signup} = props;
    let info = frontEnd.createElement("p", {innerText:"A place to record your progress, test your memory, and find new songs to perform!"});
    let cta = frontEnd.createElement("h2", {innerText:"Let's get Singing!"});
    let content = frontEnd.createElement("section", {}, cta, info);
    let container;
    if(signin || signup){
    let form = frontEnd.createElement("section", {}, frontEnd.createComponent(FormService, {signin, signup}));
    container = frontEnd.createElement("div", {className:"main"}, content, form);
    }
    else{
    container = frontEnd.createElement("div", {className:"main"}, content);
    }
    return container;    
}