import frontEnd from "../frontend";
import {NavbarService} from "./NavbarService";
import {BodyService} from "./BodyService";
import {FooterService} from "./FooterService";

export class LandingService extends frontEnd.component{
    constructor(props){
        super(props);
        this.state = {
            signin:false,
            signup:false
        }
        this.signInSet = this.signInSet.bind(this);
        this.signUpSet = this.signUpSet.bind(this);
        this.home = this.home.bind(this);
    }
    signInSet(){
        console.log("called")
        this.setState({signin:true, signup:false})
    }
    signUpSet(){
        this.setState({signin:false, signup:true})
    }
    home(){
        this.setState({signin:false, signup:false})
    }
    render(){
        let {signin, signup} = this.state;
        console.log(signin, signup);
        let header = NavbarService({header:"SingerTools", links:["Signin", "Signup"], Signin:this.signInSet, Signup:this.signUpSet, home:this.home});
        let main = frontEnd.createElement("main", {}, BodyService({signin, signup}));
        let footer = FooterService({});
        return frontEnd.compile(header, main, footer);
    }
}