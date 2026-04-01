class PDLScreen{
    
    constructor(){
        this.elements = [];
        this.onLoaded = null;
        this.name = "";

        this.buildDisplayTag();
        this.app = null;
    }

    setApp(app){
        this.app = app;
    }
    buildDisplayTag(){
        let display = document.createElement("div");
        display.id =  PDLApp.APP_DISPLAY_ID;

        document.body.appendChild(display);
    }
    addElement(el){
        this.elements.push(el);
        el.setScreen(this);
        
    }

    render(){
        //gen HTML
        var html = document.createElement("div");
        for(let e of this.elements){
            html.appendChild(e.render());
        }
        document.getElementById(PDLApp.APP_DISPLAY_ID).appendChild(html);
    }

    renderToText(){
        var html = document.createElement("div");
        for(let e of this.elements){
            html.appendChild(e.render());
        }
        return html;
    }

    

    
}