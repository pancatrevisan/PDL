class Command{
    constructor(data, screen = null, app = null, appRunner = null){
        this.screen = screen;
        this.app = app;
        this.appRunner = appRunner;
        this.running    = false;
        this.completed  = false;
    }
    startRunning(){

    }
    update(dt){

    }
}