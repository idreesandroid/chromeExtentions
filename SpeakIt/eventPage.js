var menuItem = {
    "id" : "speakIt",
    "title" : "speakIt",
    "contexts" : ["selection"]
}

chrome.contextMenus.create(menuItem);


chrome.contextMenus.onClicked.addListener(function(clickData){
    if(clickData.menuItemId == 'speakIt' && clickData.selectionText){
        chrome.tts.speak(clickData.selectionText, {'rate': 0.7})
    }
})