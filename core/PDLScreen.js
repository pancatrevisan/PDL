class PDLScreen{
    
    constructor(){
        this.elements = {};
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
        this.elements[el.id] = el;
        //this.elements.push(el);
        el.setScreen(this);
        
    }

    render(){
        //gen HTML
        var html = document.createElement("div");
        for(const key in this.elements){
            let e = this.elements[key];
            html.appendChild(e.render());
        }
        document.getElementById(PDLApp.APP_DISPLAY_ID).appendChild(html);
    }

    renderToEditor(){
        var html = document.createElement("div");
        for(const key in this.elements){
            let e = this.elements[key];
            let render = e.render();
            render.classList.add('pdl-element');
            //render.disabled = true;
            html.appendChild(render);
        }
        return html;
    }

    

    
}