import axios from "Axios";
import {DashboardService} from "./DashboardService"
import {LandingService} from "./LandingService"

export class Service {
    constructor(){
        this.user = null;
        this.errors = null;
        this.render = this.render.bind(this);
        this.setUser = this.setUser.bind(this);
        this.setErrors = this.setErrors.bind(this);
        this.loginUser = this.loginUser.bind(this);
        this.start = this.start.bind(this);
    }

    start(){
        this.setUser();
    }

    setUser(){
        if(window.localStorage.singerjwtoken){
            axios.defaults.headers.common["Authorization"] = Window.localStorage.singerjwtoken;
            axios["get"]("/api/registertoken")
                .then(user => {
                    if(user){
                        this.user = user;
                        this.render();
                    }
                })
                .catch(err => {
                    this.errors = err.message;
                    this.render();
                });
        }
        else{
            this.render();
        }
    }
    setErrors(err){
        this.errors = err
        this.render();
    }

    loginUser(type, user){
        axios["post"](`/${type}`, user)
        .then(res => {
            console.log(res);
            window.localStorage.singerjwtoken = res.token;
            this.user = res.singer;
            this.setUser();
        })
        .catch(err => {
            console.log(err)
            this.setErrors(err);
        })
    }

    logoutUser(){
        delete Window.localStorage.singerjwtoken;
    }

    render(services){
        let {user, errors, render, loginUser, setUser} = this;
        if(user){
            const dashboardService = new DashboardService(user, errors,logoutUser);
            dashboardService.render();
        }
        else{
            const landingService = new LandingService({loginUser, setUser})
            landingService.render();
        }
    
    }
}