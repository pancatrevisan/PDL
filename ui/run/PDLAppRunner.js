class PDLAppRunner{
    static APP_STATUS = {RUNNING: "RUNNING", PAUSED : "PAUSED", FINISHED: "FINISHED"};
    constructor(PDLApp){
        
        this.currentScreen = null;
        this.commandCenter = null;
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
        if (this.status == APP_STATUS.PAUSED || this.status == APP_STATUS.FINISHED){
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