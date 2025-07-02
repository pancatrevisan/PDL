class PDLAppLoader{
    constructor(textData){
        let parser= new DOMParser();
        let xmlDoc = parser.parseFromString(textData,"text/xml");
    }
}