// implements instance of frontEnd DOM manipulators
class virtualDOM{
    constructor(){
        this.render = this.render.bind(this);
    }
    render(component, location){
        const root = document.querySelector(location);
        const instance = createComponent(component, {});
        console.log(instance);
        root.append(instance);
    }
}
function createElement(type, props, ...children){
    let el = document.createElement(type)
    Object.assign(el, props);
    for(let child of children){
        el.append(child);
    }
    return el;
}

class component {
    constructor(){
        this.state = {};
        this.setState = this.setState.bind(this);
        this.render = this.render.bind(this);
    }
    setState(newstate){
        let node = this.render();
        let oldstate = this.state;
        this.state = {...newstate};
        if(Object.keys(oldstate) !== Object.keys(newstate)){
            node.parentNode.replaceChild(this.render(), node);
        }
        else{
            for(let key in Object.keys(oldstate)){
                if(oldstate[key] !== this.state[key]){
                    node.parentNode.replaceChild(this.render(), node);
                    break;
                }
            }
        }   
    }
    render(){

    }
}
function createComponent(component, props){
    const newcomponent = new component(props);
    return newcomponent.render();
}

function compile(...components){
    let result = createElement("div", {}, ...components);
    return result;
}

const frontEnd = {
    virtualDOM: new virtualDOM(),
    createElement,
    component,
    createComponent,
    compile
}








module.exports = frontEnd