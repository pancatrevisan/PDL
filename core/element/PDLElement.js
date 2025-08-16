class PDLElement{
    constructor(){
        this.position = [];
        this.actions = {};
        this.screen = null;

        this.app = null;
    }

    setScreen(screen){
        this.screen = screen;
    }
    setApp(app){
        this.app = app;
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