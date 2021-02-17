export class Observable {

    constructor(data) {

        this.data = {
            set current(a) {
                document.querySelector("[data-bind='" + data + "']").innerText = a;
            }
        }

    }
    
    subscribe(param) {
        this.data.current = param;
    }

}