class PDLButton extends PDLElement{
    constructor(){
        super();
        
        this.availableEvents =[
            'onclick' 
        ];
        //used in editor.
        this.properties ={
            'text' : {'type':'text', 'value': ''}
        };

    }
    render(){
        let html = document.createElement('button');
        html.id = this.id;
        html.innerHTML = this.text;
        html.classList.add("btn-pdl");
        html.classList.add("base-pdl-element");
        this.addEvents(html);
        return html;
    }
}