export class Observable {

    constructor(data) {

        this.data = {
            set current(a) {
                if (document.querySelector("[bind-text='" + data + "']") != undefined){
                document.querySelector("[bind-text='" + data + "']").innerHTML = a;
                }
                else if (document.querySelector("[bind-class='" + data + "']") != undefined){
                    if(document.querySelector("[bind-class='" + data + "']").classList != undefined){
                        document.querySelector("[bind-class='" + data + "']").className = a;
                    }
                    else {
                        document.querySelector("[bind-class='" + data + "']").classList.add = a;
                    }
                }
            }
        }

    }
    
    subscribe(param) {
        this.data.current = param;
    }

}