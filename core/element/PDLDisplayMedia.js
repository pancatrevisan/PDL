class PDLDisplayMedia extends PDLElement{
    
    constructor(){
        super();
        this.screen = false; 
        this.media  = null;
        
        this.availableEvents =[
            
        ];
        //used in editor.
        this.properties =[
            {'name':'media', 'type':'media', 'value': ''}
        ];
    }

    render(){
        let html = document.createElement('div');
        let _media = this.screen.app.getMedia(this.media);
        html.id = this.id;
        if(_media.type == PDLMedia.MEDIA_TYPE.IMAGE){
            let img = document.createElement('img');
            img.src = _media.src;
            html.appendChild(img);
        }
        this.addEvents(html);
        html.classList.add("media-pdl");
        html.classList.add("base-pdl-element");
        html.classList.add("element-data-view");

        return html;
    }
}