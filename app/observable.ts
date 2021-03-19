export class Observable {
    _data: any;

    constructor(data:any) {
    this._data = {
            set current(a:any) {
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
    
   subscribe(param:any) {
        this._data.current = param;
    }
}