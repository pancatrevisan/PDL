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
    /*
    addAction(name, commands){
        this.actions[name] = commands;
    }*/
   addAction(name, commands){
    console.log(commands);
    console.log("action: " + name);
        this[name] = function(){
            for(let i = 0; i < commands.length; i++){
                this.app.commandCenter.pushCommand(commands[i]);
            }
            
        };
        console.log(this.onclick);
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