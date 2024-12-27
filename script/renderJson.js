window.onload = function(){
    var jsonDiv = document.querySelector('.json');
    var jsonData = localStorage.getItem('jsonData');
    if(jsonData){
        jsonDiv.innerText = jsonData;
    }
}