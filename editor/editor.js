class Editor
{
    static EDITOR_ID = "editor_content";
    static SCREENS_PANEL = "screens_panel";

    constructor(xml=null){

        this.app = null;
        if(xml == null){
            this.newApp();
        }

    }

    loadApp(xml){

    }

    newApp(){
        let me = this;
        let req = new XMLHttpRequest();
        req.onreadystatechange = function(){
                if (this.readyState == 4 && this.status == 200) {
                    let loader = new PDLAppLoader(req.responseText);
                    me.app = loader.loadApp();                
                }
        };
        req.open("GET", "xml/empty_template.xml");

        req.send();
    }

    editScreen(screen){
        document.getElementById(EDITOR_ID).replaceChildren();

    }

    //creates a new screen to the app.
    addNewScreenToApp(){
        let scr = null;

        this.addScreenToPanel(scr);

    }

    //add element to selector panel
    addElementToSPanel(el){

    }

    //aadd an screen to selector panel
    addScreenToPanel(scr){

    }

    //add an element to the current editing screen
    addElementToCurrentScreen(el){

    }


    uiRetractScreenMenu(){
        console.log(document.getElementById(Editor.SCREENS_PANEL));
        document.getElementById(Editor.SCREENS_PANEL).style.display = "none";
        document.getElementById("button-retract-screens").style.display = "none";
        document.getElementById("button-expand-screens").style.display = "inline-block";
    }
    uiExpandScreenMenu(){
        document.getElementById(Editor.SCREENS_PANEL).style.display = "block";
        document.getElementById("button-retract-screens").style.display = "inline-block";
        document.getElementById("button-expand-screens").style.display = "none";

        
    }
}