class PDLAppLoader{

    //textData: XML content. 
    constructor(textData){
        let parser= new DOMParser();
        this.xmlDoc = parser.parseFromString(textData,"text/xml");
    }


    loadApp(){
        let app = new PDLApp();

        let firstScreenName = this.xmlDoc.getElementsByTagName("startScreen")[0].childNodes[0].nodeValue;
        
        let data = this.loadData(this.xmlDoc.getElementsByTagName('PDLData'));
        
        let media = this.loadMedia(this.xmlDoc.getElementsByTagName('PDLMedia'));

        app.setMedia(media);


        app.setData(data);

        

        app.startScreen = firstScreenName; 
        let xmlScreens = this.xmlDoc.getElementsByTagName('screen');

        for(let scr of xmlScreens){
            let screen = this.loadScreen(scr, app);
            app.addScreen(screen);
        }
        

        return app;
    }

    loadMedia(nodes){
        let all_media = {};
        for(let n of nodes){
            let media = new PDLMedia();
             for (let i = 0; i < n.attributes.length; i++) {
                const attr = n.attributes[i];
                media[attr.name] = attr.nodeValue;
            }
            all_media[media.name] = media;
        }
        return all_media;
    }

    loadData(nodes){
        let all_data = {};
        for( let n of nodes){
            let data = new PDLData();
            
            for (let i = 0; i < n.attributes.length; i++) {
                const attr = n.attributes[i];
                data[attr.name] = attr.nodeValue;
            }
            all_data[data.name] = data;
        }

        return all_data;
    }

    loadScreen(xml, app ){
        //screen name.
        let name = xml.getAttribute('name');

        let screen = new PDLScreen();
        screen.name = name;
        //load screen's elements
        let els_ = xml.getElementsByTagName('element');

        for (let e of els_){
            let el = this.loadElement(e, app, screen);
            console.log(el);
            screen.addElement(el);

        }
        return screen;
    }
    loadElement(el, app, screen){

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
                        //let command = eval("new "+attributes['type']+"()"); 
                        
                        let str = attributes['type'];
                        let command = (Function('return new ' + str))();
                        attributes['app'] = app; 
                        attributes['screen'] = screen;
                        command.setData(attributes);
                        
                        
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