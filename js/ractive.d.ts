declare class Ractive {
    constructor(option : any);
    on(action : string, func : any);
    on(params : any);
    get(name : string) : any;
    set(name : string, value : any);
    set(params : any);
    push(keypath : string, item : any);
    pop(keypath : string);
    unshift(keypath : string, item : any);
    shift(keypath : string, item : any);
    splice(keypath : string, index : number, count : number);
    splice(keypath : string, index : number, count : number, obj : any);
    observe(params : any);
    observe(keypath : string, func : any);
    update();
}