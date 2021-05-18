import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "../styles/style.css";

const parser = new DOMParser();

export class Component {
    constructor(componentName) {
        this.componentName = componentName;
        components[componentName] = {};
        components[componentName]['functions'] = [];
    }

    /**
    *  require all components from "/components" folder. Component must be create with this class and "createBody" method.
    */   
    static defineComponents() {
        const componentsList = require.context('../components/', true, /\.js$/);
        componentsList.keys().forEach((path) => {
            require(`../components/${path.slice(2)}`);
        });
    }

    /**
    *  associates DOM-node with name.
    *
    * @param {string} targetName name of target
    * @param {Node} node DOM-node received through querySelector
    */
    static defineTarget(targetName, node){
        targets[targetName] = node;
    }

    /**
    *  save html-code as template for component render
    *
    * @param {string} html html-compatible code. Props insert with %prop%  
    */
    createBody(html) {
        components[this.componentName]['body'] = html;
    }

    /**
    *  save function into current object. All saved functions will be launced adter component render.
    *
    * @param {Function} function
    */
    addFunction(func) {
        components[this.componentName]['functions'].push(func);
    }

    /**
    *  Replace props with special tags in component body (%tag%).
    *  Parses final string into DOM-nodes and add it into target.
    *  Launches saved functions.
    *
    * @param target: node for insert rendered component
    * @param {boolean} clear: clear target or not
    * @param {string} componentList: component name
    * @param {object} props: object where keys = tags and value = content
    * or
    * @param {Array} componentList: array of objects {name: componentName, props: {props}} with component names and props 
    * 
    */
    static renderComponent(target, componentList, props={}) {
        targets[target].innerHTML = '';

        function render(target, componentName, props={}){
            if(!components[componentName]){
                console.error(`Компонент ${componentName} не найден!`);
                return;
            }

            let html = components[componentName]['body'];

            if (Object.keys(props).length !== 0){
            
                for(let key in props){
                    const pattern = new RegExp(`%${key}%`, 'g');
                    html = html.replace(pattern, props[key]);
                }

                const pattern = new RegExp('%.*%', 'g');
                html = html.replace(pattern, '');
            }
            const node = parser.parseFromString(html, 'text/html').body.childNodes[0];
    
            targets[target].appendChild(node);
    
            const functions = components[componentName]['functions'];
            if(functions.length !== 0){
                functions.forEach((func => func(props)));
            }
        }

        if (Array.isArray(componentList)){
            for(let component of componentList){
                render(target, component.name, component.props);
            }
        }else{
            render(target, componentList, props);
        }
    }
}

const targets = {};
const components = {};

