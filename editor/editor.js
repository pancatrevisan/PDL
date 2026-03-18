class Editor
{
    static EDITOR_ID = "PDL_EDITOR";

    constructor(xml=null){

        this.app = null;
        if(xml == null){
            this.newApp();
        }

    }

    loadApp(xml){

    }

    newApp(){
        let me = this;
        let req = new XMLHttpRequest();
        req.onreadystatechange = function(){
                if (this.readyState == 4 && this.status == 200) {
                let loader = new PDLAppLoader(req.responseText);
                me.app = loader.loadApp();
                console.log("recv req...");                console.log(me.app);
                
                }
            
        };
        req.open("GET", "xml/empty_template.xml");
        console.log("send req...");
        req.send();
    }

    editScreen(screen){
        document.getElementById(EDITOR_ID).replaceChildren();

    }



}