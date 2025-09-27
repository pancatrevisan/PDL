class PDLElement{
    constructor(){
        this.position = [];
        this.actions = {};
        this.screen = null;
        //this.commands = null;
        
        this.events = {};
    }

    setScreen(screen){
        this.screen = screen;
    }
    setApp(app){
        this.app = app;
    }
    addEvents(html_tag){
        
        for(let k in this.events){
            html_tag.addEventListener(k, this.events[k]);
            //html_tag.k = this.events[k];
            console.log(k );
        }
    }

   addAction(name, commands){
    
    let el = this;     
    this.events[name] = 
        function(){
            for(let i = 0; i < commands.length; i++){      
                el.screen.app.commandCenter.pushCommand(commands[i]);
            }
        };
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