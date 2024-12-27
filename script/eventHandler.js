uploadBtn.addEventListener('click', function(){input.click();});

input.addEventListener('change', function(e){
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function(e){
        var fileContent = e.target.result;
        xml = fileContent;
        xmlInnerContainer.innerText = fileContent;
    }
});

convertoJson.addEventListener('click', function(){
    let convertToxml = new Convert(xml);
    let obj = convertToxml.xmlToObj();
    let json = JSON.stringify(obj, null, 2);
    localStorage.setItem('jsonData', json);
    jsonInnerContainer.innerText = json;
});

rewriteBtn.addEventListener('click', function(){
    if(textArea.value == null || textArea.value == '') return
    xml = textArea.value;
    xmlInnerContainer.innerText = textArea.value;
    textArea.value = '';
});

editBtn.addEventListener('click', function(){
    if(xmlInnerContainer.innerText == '') return
    textArea.innerHTML = xmlInnerContainer.innerText;
});

clearBtn.addEventListener('click', function(){
    xmlInnerContainer.innerText = '';
    jsonInnerContainer.innerHTML = '';
});

downloadBtn.addEventListener('click', function(){
    var json = getJson();
    var blob = new Blob([json], {type: "application/json;charset=utf-8"});
    var link = document.createElement('a');
    link.download = 'jsonfile.json';
    link.href = window.URL.createObjectURL(blob);
    document.body.appendChild(link);
    link.click();
    document.removeChild(link);
});

popNewTab.addEventListener('click', function(){
    if(localStorage.getItem('jsonData')==undefined) return
    var url = '../index/json.html';
    var newTab = window.open(url, '_blank');
    newTab.focus();
});

window.onbeforeunload = function(){localStorage.removeItem('jsonData');}