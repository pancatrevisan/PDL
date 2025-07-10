class commandCenter{
    constructor(){
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
        if(this.currentCommand == null){
            return;
        }

        this.currentCommand.update(dt);

        if(this.currentCommand.completed){
            this.currentCommand = this._popCommand();
            this.currentCommand.startRunning();
        }

    }
}