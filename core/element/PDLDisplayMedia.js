class PDLDisplayMedia extends PDLElement{
    
    constructor(){
        super();
        this.screen = false; 
        this.media  = null;
    }

    render(){
        let html = document.createElement('div');
        //html.id = 
        let _media = this.screen.app.getMedia(this.media);
        console.log(_media);
        if(_media.type == PDLMedia.MEDIA_TYPE.IMAGE){
            let img = document.createElement('img');
            img.src = _media.src;
            html.appendChild(img);
        }

        html.classList.add("media-pdl");

        return html;
    }
}