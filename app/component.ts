declare module globalThis {
    let routes: any;
}

export class Component {
    
    constructor() {
        
    }
    
    render(el:any) {
        if (globalThis.routes.findIndex((x:any) => x.path === el['path']) !== -1) {
            var root = document.getElementById('root');
            root.innerHTML = `<` + el['path'] + `>` + el['template'] + `</` + el['path'] + `>`;
            var style = document.createElement('style');
            style.innerHTML = el['style'];
            root.appendChild(style);
        }
        else {
            var nested_comp = document.getElementsByTagName(el['path'])[0]
            var style = document.createElement('style')
            style.innerHTML = el['style'];
            nested_comp.innerHTML = el['template'];
            nested_comp.appendChild(style);
            var script = document.createElement('script');
            if (el['path'] === 'home-component') {
                script.src = "../dist/" + el['path'] + ".ts"
            }
            else {
                script.src = "../dist/" + el['path'] + ".js"
            }
            nested_comp.appendChild(script)
        }
    }

}