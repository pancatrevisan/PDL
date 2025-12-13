class PDLApp{
    static APP_RUN_STATUS = {RUNNING: "RUNNING", PAUSED: "PAUSED", NOT_STARTED:"NOT_STARTED"};
    static APP_DISPLAY_ID = "PDLApp";
    constructor(){
        this.name = "";        
        //screens wich will be displayed...
        this.screens = {};
        this.startScreen = "";
        this.timer = null;
        this.status = PDLApp.APP_RUN_STATUS.NOT_STARTED;
        this.currentScreen = null;
        this.commandCenter = new CommandCenter(this);
        this.media = null;
        this.data = null;
    }

    setMedia(media){
        this.media = media;
    }

    getMedia(name){
        return this.media[name];
    }

    getData(name){
        return this.data[name];
    }
    setData(data){
        this.data = data;
    }

    addScreen(screen){
        
        this.screens[screen.name] = screen;
        screen.setApp(this);
    }
    
    render(){
        if(this.currentScreen == null)
            return;
        this.currentScreen.render();
    }

    update(dt){
        this.commandCenter.update(dt);
        
    }

    step(app, dt){
        if(!this.status  == PDLApp.APP_RUN_STATUS.RUNNING){
           return; 
        }
        app.update(dt);
    }
    changeScreen(screen){
        this.currentScreen = this.screens[screen];
        //clear render
        document.getElementById(PDLApp.APP_DISPLAY_ID).innerHTML = "";
        this.render();
    }
    start(){
        this.status = PDLApp.APP_RUN_STATUS.RUNNING;        
        this.currentScreen = this.startScreen;
        this.changeScreen(this.currentScreen);
        let app = this;
        this.timer = setInterval(app.step, 1000/3, app, 1000/3);

    }

    pause(){
        this.status = PDLApp.APP_RUN_STATUS.PAUSED;
    }

    resume(){
        if(this.status  == PDLApp.APP_RUN_STATUS.NOT_STARTED){
            return;
        }
        this.status = PDLApp.APP_RUN_STATUS.RUNNING;
    }
}