class PDLElement{
    constructor(){
        this.position = [];
        this.actions = {};
    }

    addAction(name, commands){
        this.actions[name] = commands;
    }
}