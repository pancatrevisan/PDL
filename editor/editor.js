class Editor
{
    static EDITOR_ID = "editor_content";
    static BLOCK_PANEL_ID = "block_panel";
    static SCREENS_PANEL = "screens_panel";
    static EDITOR_PROPS_PANEL_ID = "props_panel";
    static PROPS_CONTEINER_ID = "elementProperties";
    

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
            e.ondragstart = function() { return false; };
            e.onmousedown = function(){ 
                //Editor.this.pdlElement_onclick(e);
                me.pdlElement_onclick(e);
            }
            e.onmouseup = function(){ 
                //Editor.this.pdlElement_onclick(e);
                me.pdlElement_onmouseup(e);
            }
            e.onclick = function(){

                me.pdlElement_editProps(e);
            };
            /*
            let _editButton = document.createElement('button');
            _editButton.innerHTML = "?";
            _editButton.setAttribute("el_id",e.id);
            e.appendChild(_editButton);*/
        }
        
        document.getElementById(Editor.EDITOR_ID).innerHTML = "";
        document.getElementById(Editor.EDITOR_ID).onmouseup = function(){
            me.pdlElement_onmouseup(null);
        }
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
        console.log("Edit props");
        let html = document.createElement('div');
        html.classList.add('elements_panel');

        let title = document.createElement('div');
        title.classList.add('elements-props-title')
        title.innerHTML = "Properties";


        html.appendChild(title);
        html.id= Editor.EDITOR_PROPS_PANEL_ID;
        let props = this.currentScreen.elements[e.id].properties;

        for (let i = 0; i< props.length; i++) {
            let prop = props[i];
            let prop_div = document.createElement("div");
            prop_div.classList.add("props-editor-item");
            let name    = prop['name'];
            let type    = prop['type'];
            let value   = prop['value']; 

            let label = document.createElement('label');
            label.innerHTML = name;
            let display ;
            if(type == "text" || type == "number"){
                display = document.createElement('input');
                display.value = value;

            }
            else if(type == ""){
                display = document.createElement('input');
                display.value = "undef";
            }

            prop_div.appendChild(label);
            prop_div.appendChild(display);
            html.appendChild(prop_div);
            document.getElementById(Editor.PROPS_CONTEINER_ID).append(html);
        }

        let cancel_button = document.createElement('button');
        cancel_button.innerHTML = "Cancel";
        cancel_button.onclick = function(){
            document.removeChild(document.getElementById(Editor.BLOCK_PANEL_ID));
            document.removeChild(document.getElementById(Editor.EDITOR_PROPS_PANEL_ID));
        };

        let confirm_button = document.createElement('button');
        confirm_button.innerHTML = "Confirm";
        confirm_button.onclick = function(){
              document.removeChild(document.getElementById(Editor.BLOCK_PANEL_ID));
            document.removeChild(document.getElementById(Editor.EDITOR_PROPS_PANEL_ID));
        };

        //html.appendChild(cancel_button);
        //html.appendChild(confirm_button);




    }

    pdlElement_onclick(e){
        console.log("Click. ");
        e.editor.selectedElement = e;
        //this.selectedElement = e;
        //console.log(this);
    }
    pdlElement_onmouseup(e){
        this.selectedElement = null;
    }


    updateEditor(){
        
        let add_button = document.getElementById('add-screen');
        document.getElementById('screens_panel').innerHTML = "";
        document.getElementById('screens_panel').appendChild(add_button);

        if (this.app == null){
            return;
        }
        

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
            return;
        }
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