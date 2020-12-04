import frontEnd from "../frontend";
export function NavbarService(props){
    let links = [];
    for(let link in props.links){
        let button = frontEnd.createElement("button",{className:"btn", id:`btn-${props.links[link]}`, innerText:props.links[link], onClick:props[props.links[link]]});
        let li = frontEnd.createElement("li", {className:"link"}, button);
        links.push(li);
    }
    let home = frontEnd.createElement("h1", {className:"nav-head", innerText:props.header});
    let homeDiv = frontEnd.createElement("div", {className:"nav-header"}, home);
    let linklist = frontEnd.createElement("ul", {className:"nav-links-list"}, ...links);
    let linkDiv = frontEnd.createElement("div", {className:"nav-links"}, linklist);
    let navbar = frontEnd.createElement("nav",{className:"navbar"}, homeDiv, linkDiv);
    let header = frontEnd.createElement("header", {}, navbar);
    return header;
}