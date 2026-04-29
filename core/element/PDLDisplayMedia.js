class PDLDisplayMedia extends PDLElement{
    
    constructor(){
        super();
        this.screen = false; 
        this.media  = null;
    }

    render(){
        let html = document.createElement('div');
        let _media = this.screen.app.getMedia(this.media);
        
        if(_media.type == PDLMedia.MEDIA_TYPE.IMAGE){
            let img = document.createElement('img');
            img.src = _media.src;
            html.appendChild(img);
        }
        this.addEvents(html);
        html.classList.add("media-pdl");
        html.classList.add("base-pdl-element");

        return html;
    }
}