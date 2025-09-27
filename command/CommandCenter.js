class CommandCenter{
    constructor(app){
        this.app = app;
        this.commands = [];
        this.currentCommand = null;
    }

    pushCommandBatch(batch){
        //from the last to first, as it is stored as a stack
        for(let i = batch.length-1; i >=0; i++){
            this.pushCommand(batch[i]);
        }
    }
    
    pushCommand(cmd){
        this.commands.push(cmd);
    }

    _popCommand(){
        if (this.commands.length > 0){
            return this.commands.shift();
        }

        return null;
    }

    emptyCommandStack(){
        this.commands = [];
    }

    getCurrentCommand(){
        return this.currentCommand;
    }

    update(dt){
        if(this.commands.length <= 0 && this.currentCommand == null){
            return;
        }
        if(this.currentCommand == null){
            this.currentCommand = this._popCommand();
            //return;
        }
        console.log("commandCenter update");
        console.log(this.currentCommand);
        this.currentCommand.update(dt);

        if(this.currentCommand.completed){
            this.currentCommand = this._popCommand();
            if(this.currentCommand == null)
                return;
            this.currentCommand.startRunning();
        }

    }
}