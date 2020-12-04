import {NavbarService} from "./NavbarService.js";

export class DashboardService {
    constructor(props){
        this.logoutUser = props.logoutUser;
        this.Active = "Home";
        this.render = this.render.bind(this);
        this.setHome = this.setHome.bind(this);
        this.setProfile = this.setProfile.bind(this);
        this.setSongs = this.setSongs.bind(this);
    }
    setHome(){
        this.Active = "Home"
        this.render(); 
    }
    setProfile(){
        this.Active = "Profile"
        this.render(); 
    }
    setSongs(){
        this.Active = "Songs"
        this.render();
    }
    render(){
        console.log("Rendered Dashboard");  
        const navbarService = new NavbarService({header:"Singer", links:["Profile", "Songs", "Logout"], actions:{Profile:this.setProfile, Songs:this.setSongs, Logout:this.logoutUser}, active:this.Active, setHome: this.setHome});
        console.log(navbarService);
        navbarService.render();
    }   
}