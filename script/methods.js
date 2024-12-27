class Convert{
    constructor(xml){
        this.xml = xml;
    }

    xmlToObj(){
        xml = xml.replace(/\n/g, "");
        xml = xml.replace(/\t/g, "");
        let parser = new DOMParser();
        xml = parser.parseFromString(xml,"text/xml");
        let parent = xml.documentElement;
        let parentName = xml.documentElement.nodeName;
        let obj = {};
        obj[parentName] = this.nodeToObject(parent);
        return obj;
    }

    nodeToObject(node){
        let obj = {};
        if(node.nodeType===1){
            if(node.attributes.length>0){
                obj["@"] = {};
                for(let index=0; index<node.attributes.length; index++){
                    const attribute = node.attributes.item(index);
                    obj["@"][attribute.nodeName] = attribute.nodeValue;
                }
            }
            for(let index=0; index<node.childNodes.length; index++){
                const currentNode = node.childNodes[index];
                if(currentNode.nodeName==="#text"){
                    if(currentNode.nodeValue.trim()) return this.nodeToObject(currentNode);
                    continue;
                }
                if(currentNode.nodeType===1){
                    const nodeName = currentNode.nodeName;
                    if(obj[nodeName]===undefined){
                        obj[nodeName] = this.nodeToObject(currentNode);
                    }
                    else{
                        if(!Array.isArray(obj[nodeName])){
                            obj[nodeName] = [obj[nodeName]];
                        }
                        obj[nodeName].push(this.nodeToObject(currentNode));
                    }
                }
                else if(currentNode.nodeType===3){
                    return this.nodeToObject(currentNode);
                }
            }
            return obj;
        }
        else if(node.nodeType===3){
            return node.nodeValue;
        }
    }
}