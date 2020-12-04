import axios from "Axios";
import frontEnd from "../frontend"
import {DashboardService} from "./DashboardService"
import {LandingService} from "./LandingService"

export class Service extends frontEnd.component{
    constructor(props){
        super(props)
        this.state = {
            user:null,
            errors:null
        };
        this.render = this.render.bind(this);
        this.loginUser = this.loginUser.bind(this);
    }

    setUser(){
        if(localStorage.singerjwtoken){
            axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.singerjwtoken}`;
            axios["post"]("/api/auth/signin")
                .then(user => {
                    console.log(user);
                    if(user.data){
                        console.log("Got user")
                        this.setState({...this.state, user:user.data});
                    }
                })
                .catch(err => {
                    console.log(err)
                    this.setState({...this.state, errors:err});
                    this.render();
                });
        }
        else{
            console.log("From Here")
            this.render();
        }
    }
    setErrors(err){
        this.errors = err
        this.render();
    }

    loginUser(type, user){
        console.log("User is " + user)
        axios["post"](`/api/${type}`, user)
        .then(res => {
            console.log(res);
            localStorage.setItem("singerjwtoken", res.data.token);
            this.setState({...this.state, user:res.data.user});
        })
        .catch(err => {
            console.log(err)
            this.setErrors(err);
        })
    }

    logoutUser(){
        delete localStorage.singerjwtoken;
    }

    render(){
        let {render, loginUser, setUser, logoutUser} = this;
        if(this.state.user){
            return frontEnd.createComponent(DashboardService, {user: this.state.user, errors:this.state.errors, logoutUser});
        }
        else{
            return frontEnd.createComponent(LandingService, {loginUser, setUser});
        }
    
    }
}