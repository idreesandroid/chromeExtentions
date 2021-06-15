chrome.runtime.sendMessage({
    todo: "showPageAction"
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse){
    if(request.todo == "changeColor"){
        var addColor = request.clickedColor;
        var fontColor = request.fontColor;
        $('#video-title.ytd-rich-grid-media').css({'background-color': addColor, 'color' : fontColor});
    }
});

