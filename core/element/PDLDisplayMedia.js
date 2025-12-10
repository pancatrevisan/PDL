class PDLDisplayMedia extends PDLElement{
    
    constructor(){
        super();
        this.screen = false; 
        this.media  = null;
    }

    render(){
        let html = document.createElement('div');
        //html.id = 
        html.value = this.screen.app.getData(this.data).value;
        html.classList.add("media-pdl");

        return html;
    }
}