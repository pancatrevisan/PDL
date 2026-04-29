class PDLButton extends PDLElement{
    constructor(){
        super();
    }
    render(){
        let html = document.createElement('button');
        html.innerHTML = this.text;
        html.classList.add("btn-pdl");
        html.classList.add("base-pdl-element");
        this.addEvents(html);
        return html;
    }
}