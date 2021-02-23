export class Component {

    constructor() {
        this.parents = [];
    }

    parent(route) {
        this.parents.push(route)
    }

    render(el) {
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
        else {
            var style = document.createElement('style')
            style.innerHTML = el['template'][1];
            document.getElementsByTagName(el['path'])[0].innerHTML = el['template'][0];
            document.getElementsByTagName(el['path'])[0].appendChild(style);
            var script = document.createElement('script');
            script.src = "../dist/" + el['path'] + ".js"
            document.getElementsByTagName(el['path'])[0].appendChild(script)  
        }
    }

}