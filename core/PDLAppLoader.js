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
            this.loadScreen(scr);
        }
        

        return app;
    }

    loadScreen(xml){
        let name = xml.getAttribute('name');

        let screen = new PDLScreen();
        screen.name = name;

        let els_ = xml.getElementsByTagName('element');

        for (let e of els_){
            console.log(e);
            this.loadElement(e);
        }
    }
    loadElement(el){

        let element = new PDLElement();

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
                        let command = {};

                        for (let i = 0; i < c.attributes.length; i++) {
                            const attr = c.attributes[i];
                            command[attr.name] = attr.nodeValue;
                        }
                        
                        
                        act['commands'].push(command);
                    }
                    console.log(act);       
                }
                
                
            }
        }

    }
}