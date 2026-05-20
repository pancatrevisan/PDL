class DisplayData extends PDLElement{
    constructor(){
        super();
        
        this.availableEvents =[
        ];
        //used in editor.
        this.properties =[
            {'name':'data', 'type':'app_data', 'value': ''}
        ];

        //this.screen = false; 
    }

    render(){
        let html = document.createElement('input');
        html.id = this.id;
        html.value = this.screen.app.getData(this.data).value;
        html.classList.add("input-pdl");

        return html;
    }
}