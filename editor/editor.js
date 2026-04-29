class Editor
{
    static EDITOR_ID = "editor_content";
    static SCREENS_PANEL = "screens_panel";

    constructor(xml=null){

        this.app = null;
        this.currentScreen = null;
        this.selectedElement = null;

      //I don't know another solution for this. Editor.this in java Exists...  
        let me = this;
        document.getElementById(Editor.EDITOR_ID).onmousemove = function(){me.editor_onmousemove()};
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
                    me.updateEditor();                
                }
        };
        //req.open("GET", "xml/empty_template.xml");
        req.open("GET", "xml/example.xml");
        req.send();
    }

    editScreen(screenName){
        console.log("Edit Scr: "+screenName);
        
        if (this.app == null)
            return;

        let scr = this.app.screens[screenName];
        
        if( scr == null)
            return;
        
        this.currentScreen = scr;

        let html = scr.renderToEditor();
        let me = this;
        let els = html.getElementsByClassName('pdl-element');

        for(let e of els){ 
            e.editor = me;   
            e.onclick = function(){ 
                //Editor.this.pdlElement_onclick(e);
                me.pdlElement_onclick(e);
            }
        }
        
        document.getElementById(Editor.EDITOR_ID).innerHTML = "";
        document.getElementById(Editor.EDITOR_ID).appendChild(html);
    }

    editor_onmousemove(){
        
        if(this.selectedElement == null){
            return;
        }
        
        let offX = event.offsetX;
        let offY = event.offsetY;
        console.log("offs: ["+offX+","+offY+"]");
        
        //check if the event is for the div. 
        if (event.target != document.getElementById(Editor.EDITOR_ID)){
            return;
        }        
        //move the element. 
        
        this.selectedElement.style.left = offX + "px";
        this.selectedElement.style.top = offY + "px";

        let _w = this.selectedElement.getBoundingClientRect().width + offX;
        let _h = this.selectedElement.getBoundingClientRect().height + offY ;
        //console.log("EditorW: " + document.getElementById(Editor.EDITOR_ID).getBoundingClientRect().width + " EditorH: " + document.getElementById(Editor.EDITOR_ID).getBoundingClientRect().height + " _w: " + _w + " _h: " + _h);
        
        if(_w < document.getElementById(Editor.EDITOR_ID).getBoundingClientRect().width && _h < document.getElementById(Editor.EDITOR_ID).getBoundingClientRect().height)
        {
            return;
        }
        
        
        document.getElementById(Editor.EDITOR_ID).style.minWidth = _w +"px";
        document.getElementById(Editor.EDITOR_ID).style.minHeight = _h + "px";
        
        
    }

    pdlElement_editProps(e){

    }

    pdlElement_onclick(e){
        console.log("Click. ");
        e.editor.selectedElement = e;
        //this.selectedElement = e;
        //console.log(this);
    }


    updateEditor(){
        console.log("update screen");
        let add_button = document.getElementById('add-screen');
        document.getElementById('screens_panel').innerHTML = "";
        document.getElementById('screens_panel').appendChild(add_button);

        if (this.app == null){
            return;
        }
        console.log(this.app.screens);

        for( let [key, value] of Object.entries(this.app.screens)){
            this.addScreenToPanel(this.app.screens[key]);
        }
           

        
        
        

    }

    //creates a new screen to the app.
    addNewScreenToApp(){
        if(this.app == null){
            console.log("App is null");
            return;
        }
        //console.log("Add new Screen");
        let screen = new PDLScreen();
        let scr_n = 1;
        
        
        while(("SCR " + scr_n) in this.app.screens){
            scr_n++;
        }
        screen.name = "SCR " + scr_n;
        
        this.app.addScreen(screen);
        //this.addScreenToPanel(screen);
        this.updateEditor();

    }

    //add element to selector panel
    addElementToSPanel(el){

    }

    //aadd an screen to selector panel
    addScreenToPanel(scr){
        let me = this;

        let div = document.createElement('button');
        div.classList.add('button-screen');
        let id = this.app.name + '_' + scr.name;
        div.onclick = function(){};
        div.innerHTML = scr.name;
        div.setAttribute('data-scrName',scr.name);
        div.onclick=function(){
            me.editScreen(scr.name);
        };
        console.log(div);
        let btn_insert = document.getElementById('add-screen');
        btn_insert.parentElement.insertBefore(div,btn_insert);

    }

    //add an element to the current editing screen
    addElementToCurrentScreen(el){

        if(this.currentScreen == null){
            console.log("Select one screen");
            return;
        }
            
        console.log(el);
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