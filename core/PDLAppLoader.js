class PDLAppLoader{

    //textData: XML content. 
    constructor(textData){
        let parser= new DOMParser();
        this.xmlDoc = parser.parseFromString(textData,"text/xml");
    }


    loadApp(){
        let app = new PDLApp();

        let firstScreenName = this.xmlDoc.getElementsByTagName("startScreen")[0].childNodes[0].nodeValue;
        console.log(firstScreenName);
        app.startScreen = firstScreenName; 
        let xmlScreens = this.xmlDoc.getElementsByTagName('screen');

        for(let scr of xmlScreens){
            let screen = this.loadScreen(scr);
            app.addScreen(screen);
        }
        

        return app;
    }

    loadScreen(xml){
        //screen name.
        let name = xml.getAttribute('name');

        let screen = new PDLScreen();
        screen.name = name;
        screen.name = name;
        //load screen's elements
        let els_ = xml.getElementsByTagName('element');

        for (let e of els_){
            let el = this.loadElement(e);
            console.log(el);
            screen.addElement(el);

        }
        return screen;
    }
    loadElement(el){

        let clasName = el.getAttribute('type');

        let element = eval('new '+clasName+'()');// new PDLElement();

        let el_attributes = {};

        for (let i = 0; i < el.attributes.length; i++) {
            const attr = el.attributes[i];
            el_attributes[attr.name] = attr.nodeValue;
        }
        element.setAttributes(el_attributes);

        let actions = el.getElementsByTagName('actions');
        
        //cada action... 
        if(actions.length > 0 ){

            actions = actions[0].childNodes; //só tem um actions por element.
            for(let a of actions){
                
                if(a.nodeType == Node.ELEMENT_NODE){
                    let act = {};
                    act['type'] = a.nodeName ;    
                    act['commands'] = [];
                    
                    //carrega os comandos da action...
                    let cmds = a.getElementsByTagName('command');
                    

                    //cria o comando, pegando os atributos.
                    for (let c of cmds){
                        let attributes = {};

                        for (let i = 0; i < c.attributes.length; i++) {
                            const attr = c.attributes[i];
                            attributes[attr.name] = attr.nodeValue;
                        }
                        
                       ;
                        let command = eval("new "+attributes['type']+"()"); 
                        
                        //console.log(command);
                        act['commands'].push(command);
                    }
                    element.addAction(act['type'], act['commands']);
                    //console.log(act);       
                }
                
                
            }
        }
        
        return element;
    }
}