class PDLScreen{
    
    constructor(){
        this.elements = [];
        this.onLoaded = null;
        this.name = "";
        let display = document.createElement("div");
        display.id =  PDLApp.APP_DISPLAY_ID;

        document.body.appendChild(display);

    }
    addElement(el){
        this.elements.push(el);
    }

    render(){
        //gen HTML
        var html = document.createElement("div");
        for(let e of this.elements){
            html.appendChild(e.render());
        }
        document.getElementById(PDLApp.APP_DISPLAY_ID).appendChild(html);
    }

    

    
}