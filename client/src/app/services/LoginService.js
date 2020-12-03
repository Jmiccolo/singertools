import axios from "axios";

export class LoginService{
    constructor(props){
        this.type = props.type;
        this.setUser = props.setUser;
        this.loginUser = props.loginUser;
        this.username = "";
        this.email = "";
        this.password = "";
        this.name = "";
        this.handleChange = this.handleChange.bind(this);
        this.render = this.render.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e){
        const {username, email, password, name} = this;
        e.preventDefault;
        let user = {
            username,
            email,
            password,
            name
        }
        this.loginUser(this.type, user);
    }
    handleChange(e){
        this[e.target.name] = e.target.value;
        this.render();
    }
    render(){
        console.log(this.username);
        if(this.type === "singer/new"){
            if(document.querySelector(".form-container")){
            let oldcontainer = document.querySelector(".form-container");
            oldcontainer.parentNode.removeChild(oldcontainer);
            }
            let container = document.createElement("section");
            container.classList.add("form-container")
            let form = document.createElement("form");
            form.id = "login-form";
            let usernameDiv = document.createElement("div")
            usernameDiv.classList.add("form-group")
            let usernameLabel = document.createElement("label");
            usernameLabel.for = "username"
            usernameLabel.innerText = "Username"
            let username = document.createElement("input")
            username.type = "text";
            username.name = "username"
            username.id = "username"
            username.defaultValue = this.username;
            username.required = true;
            usernameDiv.append(usernameLabel, username);
            let emailDiv = document.createElement("div")
            emailDiv.classList.add("form-group")
            let emailLabel = document.createElement("label");
            emailLabel.for = "email"
            emailLabel.innerText = "email"
            let email = document.createElement("input")
            email.type = "email";
            email.name = "email"
            email.id = "email"
            email.defaultValue = this.email;
            email.required = true;
            emailDiv.append(emailLabel, email);
            let passwordDiv = document.createElement("div")
            passwordDiv.classList.add("form-group")
            let passwordLabel = document.createElement("label");
            passwordLabel.for = "password"
            passwordLabel.innerText = "password"
            let password = document.createElement("input")
            password.type = "password";
            password.name = "password"
            password.defaultValue = this.password
            password.id = "password"
            password.required = true;
            passwordDiv.append(passwordLabel, password);
            let nameDiv = document.createElement("div")
            nameDiv.classList.add("form-group")
            let nameLabel = document.createElement("label");
            nameLabel.for = "name"
            nameLabel.innerText = "name"
            let name = document.createElement("input")
            name.type = "text";
            name.name = "name"
            name.id = "name"
            name.defaultValue = this.name;
            name.required = true;
            nameDiv.append(nameLabel, name);
            let submit = document.createElement("button");
            submit.innerText = "Submit";
            form.append(usernameDiv, emailDiv, passwordDiv, nameDiv, submit);
            container.append(form)
            let Main = document.querySelector("main");
            Main.innerHTML += container.outerHTML;
            document.getElementById("login-form").addEventListener("submit", this.handleSubmit);
            document.getElementById("username").addEventListener("change", this.handleChange);
            document.getElementById("email").addEventListener("change", this.handleChange);
            document.getElementById("password").addEventListener("change", this.handleChange);
            document.getElementById("name").addEventListener("change", this.handleChange);
        }
        else{
            
        }
    }
}