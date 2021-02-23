
export class Component {

    constructor() {
    }

    render(el) {
        var root = document.getElementById('root');
        root.innerHTML = `<` + el['path'] + `>` + el['template'] + `</` + el['path'] + `>`;
        var style = document.createElement('style');
        style.innerHTML = el['style'];
        root.appendChild(style);
    }

    subrender(el) {
        var nested_comp = document.getElementsByTagName(el['path'])[0]
        var style = document.createElement('style')
        style.innerHTML = el['style'];
        nested_comp.innerHTML = el['template'];
        nested_comp.appendChild(style);
        var script = document.createElement('script');
        script.src = "../dist/" + el['path'] + ".js"
        nested_comp.appendChild(script)
    }

    show(el) {
        var root = document.getElementById('root')
        var script = document.createElement('script');
        script.src = "../dist/" + el['path'] + ".js"
        root.appendChild(script)
    }

}