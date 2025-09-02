class PDLButton extends PDLElement{
    constructor(){
        super();
    }
    render(){
        let html = document.createElement('button');
        //html.id = 
        html.innerHTML = "Botão";
        html.classList.add("btn-pdl");
        this.addEvents(html);
        console.log(html);
        return html;
    }
}