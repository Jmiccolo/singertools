import {NavbarService} from "./NavbarService";
import {detailService} from "./detailService"
import {LoginService} from "./LoginService";
export class LandingService {
    constructor(props){
        let {setUser, loginUser} = props;
        this.setUser = setUser;
        this.loginUser = loginUser;
        this.signin = false;
        this.signup = false;
        this.signInSet = this.signInSet.bind(this);
        this.signUpSet = this.signUpSet.bind(this);
        this.render = this.render.bind(this);
    }
    signInSet(){
        this.signin = true;
        this.signup = false;
        this.render();
    }
    signUpSet(){
        this.signin = false;
        this.signup = true;
        this.render();
    }
    render(){
        let {loginUser, setUser, signInSet, signUpSet} = this;
        const navbarService = new NavbarService({header:"SingerTools", links:["signin","signup"], actions:{home:setUser, signin:signInSet, signup:signUpSet}, active:null})
        navbarService.render();
        detailService();
        if(this.signin){
            const loginService = new LoginService({type:"auth/login", setUser, loginUser});
            loginService.render();
        }else if(this.signup){
            const loginService = new LoginService({type:"singer/new", setUser, loginUser});
            loginService.render();
        }
    }
}