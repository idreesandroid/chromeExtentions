var contextMenu = {
	"id" : "spendMoneyItem",
	"title" : "Spend money",
	"contexts" : ["selection"]
};

chrome.contextMenus.create(contextMenu);


function isInt(value){
	return !isNaN(value) && parseInt(Number(value)) == value && !isNaN(parseInt(value, 10));
}

chrome.contextMenus.onClicked.addListener(function(clickData){
	if(clickData.menuItemId == "spendMoneyItem" && clickData.selectionText){
		if(isInt(clickData.selectionText)){
			chrome.storage.sync.get(['limit','total'], function(budget){
				var newTotal = 0;

				if(budget.total){
					newTotal += parseInt(budget.total);
				}

				newTotal += parseInt(clickData.selectionText);
				 chrome.storage.sync.set({'total':newTotal}, function(){
				 		if(newTotal >= budget.limit){
					 		var notifOption = {
								type : 'basic',
								iconUrl : 'bm48.png',
								title : 'Limit Reached!',
								message : "Oh. oh! Looks like you've reached your limit"
							}
							chrome.notifications.create('limitNotif',notifOption);
							chrome.notifications.clear('limitNotif'); 	
				 		}
				 });
			});
		}
	}
});

chrome.storage.onChanged.addListener(function(change, storageName){
	chrome.browserAction.setBadgeText({"text":change.total.newValue.toString()})
});