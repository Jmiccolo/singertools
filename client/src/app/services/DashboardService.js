import {NavbarService} from "./NavbarService.js";

export class DashboardService {
    constructor(props){
        this.isHome = true;
        this.isProfile = false;
        this.isSongs = false;
        this.render = this.render.bind(this);
    }
    render(){
        const navbarService = new NavbarService({header:"Singer", links:["Profile", "Songs", "Logout"], active:null});
        NavbarService.render();
    }   
}