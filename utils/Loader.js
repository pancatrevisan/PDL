class Loader{
    constructor(prefix=""){
        this.loadScripts(prefix);

    }

    loadScripts(prefix=""){
        let    fileList = ['command/CommandCenter.js','core/PDLData.js', 'core/PDLScreen.js','core/PDLMedia.js', 'core/PDLApp.js', 'core/element/PDLElement.js',
           'core/element/PDLButton.js', 'core/element/PDLDisplayMedia.js','core/element/DisplayData.js','command/Command.js', 'command/NextScreen.js',
            'core/PDLAppLoader.js'];

        for(let i = 0; i < fileList.length; i++){
            let file = prefix+fileList[i];
            let scr = document.createElement('script');
            scr.src = file;
            document.head.appendChild(scr);
        }
    }
}