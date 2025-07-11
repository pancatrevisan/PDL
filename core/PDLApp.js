class PDLApp{
    
    constructor(){
        this.name = "";
        
        //data entered o each screen.
        this.screenData ={};

        //data shared across app
        this.globalData ={};

        //screens wich will be displayed...
        this.screens = {};

        this.startScreen = "";
        this.status = APP_STATUS.PAUSED;
        
        this.currentScreen =this.screens[this.startScreen];
    }
    

}