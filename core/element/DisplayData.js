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

        let html;
        if(this.screen.app.getData(this.data).value.length > 20){
            html = document.createElement('div');
            html.classList.add("text-pdl");
            html.innerHTML= this.screen.app.getData(this.data).value;
        } else{
            html = document.createElement('input');
            html.classList.add("input-pdl");
            html.value = this.screen.app.getData(this.data).value;
        }
        html.style.top = this.y+"px";
        html.style.left = this.x+"px";
        html.id = this.id;
        
        

        return html;
    }
}