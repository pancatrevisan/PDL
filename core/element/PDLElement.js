class PDLElement{
    constructor(){
        this.position = [];
        this.actions = {};
    }

    addAction(name, commands){
        this.actions[name] = commands;
    }
    setAttributes(attrs){
        

        for(let k in attrs){
            this[k] = attrs[k];
            
        }
    }

    render(){
        throw "Overwrite.";
    }
}