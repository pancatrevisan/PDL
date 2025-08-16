class DisplayData extends PDLElement{
    constructor(){
        super();
        this.screen = false; 
    }

    render(){
        let html = document.createElement('input');
        //html.id = 
        html.value = this.screen.app.getData(this.data).value;
        html.classList.add("input-pdl");

        return html;
    }
}