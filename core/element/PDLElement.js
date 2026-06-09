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
        console.log("Commands");
        //TODO: aqui
        for(let i = 0; i < commands.length; i++){      
            console.log((commands[i]));
        }
        
    }
    getApp(){
        return this.screen.getApp();
    }
    setEventDataValue(event, value, param){
        console.log("update :" + event + ","+value+","+param);
    }
    setPropertyDataValue(dataName, value){
        console.log("Updata data "+dataName + " : " + value);
        this.getApp().updateDataValue(dataName, value);
    }

    setPropertyAndAttribute(name, value){
        for(let p = 0; p < this.properties.length; p++){
            if(this.properties[p]['name'] == name){
                this.properties[p]['value'] = value;
            }
        }
        this[name] = value;

    }
    setAttributes(attrs){
        for(let k in attrs){
            this[k] = attrs[k];
            
            //set properties values. Used in editor.
            for(let p = 0; p < this.properties.length; p++){
                if(this.properties[p]['name'] == k){
                    this.properties[p]['value'] = attrs[k];
                }
            }
        }
    }


    render(){
        throw "Overwrite.";
    }
}