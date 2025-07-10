class PDLApp{
    static APP_STATUS = {RUNNING: "RUNNING", PAUSED : "PAUSED", FINISHED: "FINISHED"};
    constructor(){
        this.name = "";
        
        //data entered o each screen.
        this.screenData ={};

        //data shared across app
        this.globalData ={};

        //screens wich will be displayed...
        this.screens = {};

        this.currentScreen = null;
        this.commandCenter = null;
        this.startScreen = "";
        this.status = APP_STATUS.PAUSED;
        
        this.currentScreen =this.screens[this.startScreen];
    }
    getComandCenter(){
        return this.commandCenter;
    }

    start(){
        this.status = APP_STATUS.RUNNING;
    }

    finish(){
        this.status = APP_STATUS.FINISHED;
    }
    pause(){
        this.status = APP_STATUS.PAUSED;
    }
    update(dt){
        if (this.status == PDLApp.APP_STATUS.PAUSED){
            return;
        }

        if(this.currentScreen == null){
            return;
        }
        this.currentScreen.update(dt);
    }
  
    setScreen(screenName){
        
        if(screenName in this.screens){
            this.currentScreen = this.screens[screenName];
        }

        

    }
}