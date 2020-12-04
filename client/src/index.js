import frontend from "./app/frontend";
import "./index.scss";
import {Service} from "./app/services";

frontend.virtualDOM.render(Service, ".root")