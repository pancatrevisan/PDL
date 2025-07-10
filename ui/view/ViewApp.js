class ViewApp{
    constructor(PDLApp){
        this.app = PDLApp;
    }

    setViewScreen(){
        this.commandCenter.emptyStack();

        //run commands on load screen?
        if(this.currentScreen.onLoaded){
            this.commandCenter.pushCommandBatch(CommandBuilder.buildCommandBatch());
        }
    }
    render(){

    }
}