class PDLApp{
    static APP_RUN_STATUS = {RUNNING: "RUNNING", PAUSED: "PAUSED", NOT_STARTED:"NOT_STARTED"};
    constructor(){
        this.name = "";
        
        //screens wich will be displayed...
        this.screens = {};

        this.startScreen = "";
        this.timer = null;
        this.status = PDLApp.APP_RUN_STATUS.NOT_STARTED;
    }

    addScreen(screen){
        this.screens[screen.name] = screen;
    }
    
    render(){
        console.log("render");
    }

    update(){
        console.log("update");
    }

    step(app){
        if(!this.status  == PDLApp.APP_RUN_STATUS.RUNNING){
           return; 
        }
        app.update();
        app.render();
    }
    start(){
        this.status = PDLApp.APP_RUN_STATUS.RUNNING;
       // this.timer = setInterval(this.step, 1000/3, this);
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