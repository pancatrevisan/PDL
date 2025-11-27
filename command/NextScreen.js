class NextScreen extends Command{
    constructor(data, screen = null, app = null, appRunner = null){
        
        super(data, screen, app, appRunner);
        console.log(data);
    }
    update(dt){

        //TODO: this.app = 
        this.app.changeScreen(this.nextScreenName);
        this.completed = true;
        //this.app
    }
}