class PDLButton extends PDLElement{
    constructor(){
        super();
        
        this.availableEvents =[
            {'name':'click', 'value': '', 'param':''}
        ];
        //used in editor.
        this.properties =[
            {'name':'text', 'type':'text', 'value': ''}
        ];

    }
    render(){
        
        let html = document.createElement('button');
        html.id = this.id;
        html.innerHTML = this.text;
        html.style.top = this.y+"px";
        html.style.left = this.x+"px";

        html.classList.add("btn-pdl");
        html.classList.add("base-pdl-element");
        this.addEvents(html);
        console.log(this);
        return html;
    }
}