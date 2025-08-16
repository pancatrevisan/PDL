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
    }

    addScreen(screen){
        
        this.screens[screen.name] = screen;
    }
    
    render(){
        if(this.currentScreen == null)
            return;
        this.currentScreen.render();
    }

    update(){
        
    }

    step(app){
        if(!this.status  == PDLApp.APP_RUN_STATUS.RUNNING){
           return; 
        }
        app.update();
        //app.render();
    }
    changeScreen(screen){
        this.currentScreen = this.screens[screen];
        this.render();
    }
    start(){
        this.status = PDLApp.APP_RUN_STATUS.RUNNING;        
        this.currentScreen = this.startScreen;
        this.changeScreen(this.currentScreen);

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