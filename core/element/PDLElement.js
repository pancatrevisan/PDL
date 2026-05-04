class PDLElement{
    static ID_COUNTER = 0;
    constructor(){
        this.position = [];
        this.screen = null;

        //so the editor knows easily the editable attributes and events.
        this.availableEvents = {};
        this.properties = {};
        
        
        this.events = [];
        
        this.id = "PDLElement_"+PDLElement.ID_COUNTER;
        PDLElement.ID_COUNTER++;
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

    /* Every action is described in the XML. The action tag name is the event, for
       example, 'onclick' would be <click> ... </click>
    */
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