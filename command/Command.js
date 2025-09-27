class Command{
    constructor(){
        
        this.screen = null;
        this.app = null;
        //this.appRunner = appRunner;
        this.running    = false;
        this.completed  = false;
    }
    setData(data){
        for (let v in data){
            this[v] = data[v];
        }
    }
    startRunning(){

    }
    update(dt){
        throw("Command: OverWrite");
    }
}