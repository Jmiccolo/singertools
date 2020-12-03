
export class NavbarService {
    constructor({header, links, actions}){
        this.header = header;
        this.links = links;
        this.actions = actions;
        this.render = this.render.bind(this);
    }
    render(){
        if(document.querySelector(".navbar")){
            let oldnavbar = document.querySelector(".navbar")
            oldnavbar.parentNode.removeChild(oldnavbar);
        }
        let navbar = document.createElement("nav")
        navbar.classList.add("navbar");
        let title = document.createElement("div");
        let homepage = document.createElement("h1");
        homepage.innerText = this.header;
        title.appendChild(homepage);
        let links = document.createElement("div");
        let linklist = document.createElement("ul");
        this.links.forEach(link=>{
            const linkitem = document.createElement("li");
            const button = document.createElement("button")
            button.id = link;
            button.innerText = link;
            linkitem.appendChild(button);
            linklist.appendChild(linkitem);
        });
        links.append(linklist);
        navbar.append(title);
        navbar.append(links);
        let header = document.querySelector("header");
        header.append(navbar);
        this.links.forEach(link => {
            const button = document.getElementById(link);
            button.addEventListener("click", this.actions[link]);
        })
    }
}