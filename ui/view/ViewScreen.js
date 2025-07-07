class ViewScreen{
    //appScreen: screen descrita no app, independente de implementação de visualização
    constructor(ownerApp, appScreen){
        this.ownerApp = ownerApp;
        this.appScreen = appScreen; 

        this.elements ={};
        this.onload = null;

        if(this.onload != null){
            
        }
    }

    buildElements(){
        if (!this.ownerApp)
            return;
        
        
    }

    render(){

    }

    
    
}