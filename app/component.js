export class Component {

    constructor() {
        this.parents = [];
    }

    parent(route) {
        this.parents.push(route)
    }

    render(el) {
        // check if it is parent component or nested component
        if (this.parents.indexOf(el['path']) !== -1) {
            var root = document.getElementById('root');
            root.innerHTML = `<` + el['path'] + `>` + el['template'][0] + `</` + el['path'] + `>`;
            var style = document.createElement('style');
            style.innerHTML = el['template'][1];
            root.appendChild(style);
            var script = document.createElement('script');
            script.src = "../dist/" + el['path'] + ".js"
            root.appendChild(script)
        }
        // nested component
        else {
            
            var nested_comp = document.getElementsByTagName(el['path'])[0]
            var style = document.createElement('style')
            style.innerHTML = el['template'][1];
            nested_comp.innerHTML = el['template'][0];
            nested_comp.appendChild(style);
            var script = document.createElement('script');
            script.src = "../dist/" + el['path'] + ".js"
            nested_comp.appendChild(script)
        }
    }

}